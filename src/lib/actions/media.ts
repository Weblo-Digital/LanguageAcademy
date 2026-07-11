"use server";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/dal";
import { uploadToR2, deleteFromR2 } from "@/lib/storage/r2";
import { revalidatePath } from "next/cache";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOC_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function uploadMedia(prevState: any, formData: FormData) {
  const session = await requirePermission("media.upload");
  const file = formData.get("file") as File;
  const altText = formData.get("altText") as string;

  if (!file || file.size === 0) {
    return { success: false, error: "Veuillez sélectionner un fichier valide." };
  }

  // Validate file size
  const isImage = file.type.startsWith("image/");
  const maxAllowedSize = isImage ? MAX_IMAGE_SIZE : MAX_DOC_SIZE;
  
  if (file.size > maxAllowedSize) {
    const sizeMB = maxAllowedSize / (1024 * 1024);
    return {
      success: false,
      error: `Le fichier est trop volumineux. Taille max autorisée: ${sizeMB}MB.`,
    };
  }

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      success: false,
      error: "Type de fichier non autorisé (Seuls JPEG, PNG, WEBP, SVG et PDF/DOCX sont acceptés).",
    };
  }

  try {
    // Determine path based on file type
    const folder = isImage ? "images" : "documents";
    const { publicUrl, key } = await uploadToR2(file, folder);

    // Save metadata to database
    await db.mediaFile.create({
      data: {
        filename: file.name,
        r2Key: key,
        publicUrl,
        mimeType: file.type,
        sizeBytes: file.size,
        altText: altText || null,
        uploadedById: session?.user?.id || "",
      },
    });

    revalidatePath("/admin/media");
    return { success: true, message: "Fichier téléversé avec succès !" };
  } catch (error) {
    console.error("Media upload error:", error);
    return { success: false, error: "Erreur lors du téléversement vers le serveur R2." };
  }
}

export async function deleteMedia(id: number) {
  await requirePermission("media.delete");

  try {
    // Find file metadata in DB
    const media = await db.mediaFile.findUnique({
      where: { id },
    });

    if (!media) {
      return { success: false, error: "Fichier introuvable." };
    }

    // Delete from R2 storage
    await deleteFromR2(media.r2Key);

    // Delete database record
    await db.mediaFile.delete({
      where: { id },
    });

    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    console.error("Media deletion error:", error);
    return { success: false, error: "Impossible de supprimer le fichier." };
  }
}
