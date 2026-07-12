"use server";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/dal";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createAdminUser(prevState: any, formData: FormData) {
  await requirePermission("users.create" as any);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !password || !role) {
    return { success: false, error: "Veuillez remplir tous les champs." };
  }

  try {
    // Check if email already exists
    const exists = await db.user.findUnique({ where: { email } });
    if (exists) {
      return { success: false, error: "Un utilisateur avec cet email existe déjà." };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: role as any,
        isActive: true,
      },
    });

    revalidatePath("/admin/users");
    return { success: true, message: "Utilisateur créé avec succès !" };
  } catch (error) {
    console.error("Failed to create admin user:", error);
    return { success: false, error: "Erreur lors de la création de l'utilisateur." };
  }
}

export async function toggleUserStatus(id: string, isActive: boolean) {
  await requirePermission("users.edit" as any);

  try {
    await db.user.update({
      where: { id },
      data: { isActive },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle user status:", error);
    return { success: false, error: "Impossible de modifier le statut." };
  }
}

export async function deleteUser(id: string) {
  await requirePermission("users.delete" as any);

  try {
    // Check that we aren't deleting the last super admin
    const superAdminsCount = await db.user.count({
      where: { role: "SUPER_ADMIN", isActive: true },
    });

    const targetUser = await db.user.findUnique({ where: { id } });
    
    if (targetUser?.role === "SUPER_ADMIN" && superAdminsCount <= 1) {
      return { success: false, error: "Impossible de supprimer le dernier Super Administrateur actif." };
    }

    await db.user.delete({
      where: { id },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Impossible de supprimer l'utilisateur." };
  }
}
