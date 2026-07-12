"use server";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/dal";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface SettingsInput {
  maintenance_mode: boolean;
  maintenance_message_fr: string;
  maintenance_message_en: string;
  maintenance_allowed_ips: string[];
  coming_soon_mode: boolean;
  coming_soon_routes: string[];
  coming_soon_date: string;
  contact_phone: string;
  contact_address: string;
  contact_email: string;
  opening_hours: string;
  email_provider: string;
}

export async function saveSiteSettings(input: SettingsInput) {
  const session = await requirePermission("settings.edit" as any);

  try {
    // Perform updates in database transaction
    await db.$transaction(async (tx: any) => {
      const settingsMap = Object.entries(input);

      for (const [key, val] of settingsMap) {
        await tx.siteSetting.upsert({
          where: { key },
          update: { value: val },
          create: { key, value: val },
        });
      }

      // Write Audit Log entry
      await tx.auditLog.create({
        data: {
          userId: session?.user?.id || "",
          action: "UPDATE",
          resource: "SiteSetting",
          resourceId: "global",
          newValue: JSON.parse(JSON.stringify(input)),
        },
      });
    });

    // Write cookies for global Next.js proxy middleware gateway to inspect immediately
    const cookieStore = await cookies();
    cookieStore.set("__maintenance", input.maintenance_mode ? "true" : "false", {
      path: "/",
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: false, // Accessible by proxy
    });

    cookieStore.set(
      "__coming_soon_routes",
      input.coming_soon_mode ? JSON.stringify(input.coming_soon_routes) : "[]",
      {
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
        httpOnly: false,
      }
    );

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Failed to save site settings:", error);
    return { success: false, error: "Impossible d'enregistrer les paramètres du site." };
  }
}
