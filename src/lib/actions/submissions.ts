"use server";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/dal";
import { SubmissionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateSubmissionStatus(id: number, status: SubmissionStatus) {
  await requirePermission("submissions.edit" as any);

  try {
    const data: Record<string, any> = { status };
    if (status === SubmissionStatus.READ) {
      data.readAt = new Date();
    }

    await db.formSubmission.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/submissions");
    return { success: true };
  } catch (error) {
    console.error("Failed to update submission status:", error);
    return { success: false, error: "Impossible de mettre à jour le statut." };
  }
}

export async function updateSubmissionNotes(id: number, notes: string) {
  await requirePermission("submissions.edit" as any);

  try {
    await db.formSubmission.update({
      where: { id },
      data: { adminNotes: notes },
    });

    revalidatePath("/admin/submissions");
    return { success: true };
  } catch (error) {
    console.error("Failed to update submission notes:", error);
    return { success: false, error: "Impossible de sauvegarder les notes." };
  }
}

export async function deleteSubmission(id: number) {
  await requirePermission("submissions.delete" as any);

  try {
    await db.formSubmission.delete({
      where: { id },
    });

    revalidatePath("/admin/submissions");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete submission:", error);
    return { success: false, error: "Impossible de supprimer la soumission." };
  }
}
