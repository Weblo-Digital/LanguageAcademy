import { db } from "@/lib/db";
import type { Metadata } from "next";

export async function getPageMetadata(pagePath: string, defaults: Metadata): Promise<Metadata> {
  try {
    const override = await db.seoMetadata.findUnique({
      where: { pagePath },
    });

    if (!override) {
      return defaults;
    }

    const title = override.titleFr || defaults.title || undefined;
    const description = override.descriptionFr || defaults.description || undefined;

    return {
      ...defaults,
      title,
      description,
      openGraph: {
        ...defaults.openGraph,
        title: (typeof title === "string" ? title : undefined) || defaults.openGraph?.title || undefined,
        description: description || defaults.openGraph?.description || undefined,
        images: override.ogImageUrl ? [{ url: override.ogImageUrl }] : defaults.openGraph?.images || undefined,
      },
      robots: override.noindex
        ? { index: false, follow: false }
        : defaults.robots || undefined,
    };
  } catch (error) {
    console.error(`Error loading page SEO metadata for ${pagePath}:`, error);
    return defaults;
  }
}
