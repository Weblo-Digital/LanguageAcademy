"use server";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/dal";
import { revalidatePath } from "next/cache";

interface SeoMetadataInput {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  ogImageUrl: string;
  noindex: boolean;
}

export async function saveSeoMetadata(pagePath: string, input: SeoMetadataInput) {
  await requirePermission("seo.edit" as any);

  try {
    await db.seoMetadata.upsert({
      where: { pagePath },
      update: {
        titleFr: input.titleFr || null,
        titleEn: input.titleEn || null,
        descriptionFr: input.descriptionFr || null,
        descriptionEn: input.descriptionEn || null,
        ogImageUrl: input.ogImageUrl || null,
        noindex: input.noindex,
      },
      create: {
        pagePath,
        titleFr: input.titleFr || null,
        titleEn: input.titleEn || null,
        descriptionFr: input.descriptionFr || null,
        descriptionEn: input.descriptionEn || null,
        ogImageUrl: input.ogImageUrl || null,
        noindex: input.noindex,
      },
    });

    // Invalidate caches for both the specific page route and the admin dashboard path
    revalidatePath(pagePath);
    revalidatePath("/admin/seo");
    
    return { success: true };
  } catch (error) {
    console.error("SEO save error:", error);
    return { success: false, error: "Une erreur est survenue lors de l'enregistrement des données SEO." };
  }
}
