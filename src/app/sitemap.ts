import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nextpoint.ma";

  // Base routes
  const routes = ["", "/camps-ete", "/examens", "/institut", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Dynamic exam routes
    const exams = await db.exam.findMany({
      where: { isActive: true },
      select: { slug: true }
    });
    const examRoutes = exams.map((exam) => ({
      url: `${baseUrl}/examens/${exam.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Dynamic language routes
    const languages = await db.language.findMany({
      where: { isActive: true },
      select: { slug: true }
    });
    const languageRoutes = languages.map((lang) => ({
      url: `${baseUrl}/langues/${lang.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Dynamic program routes
    const programs = await db.program.findMany({
      where: { isActive: true },
      select: { slug: true }
    });
    const programRoutes = programs.map((prog) => ({
      url: `${baseUrl}/programmes/${prog.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...routes, ...examRoutes, ...languageRoutes, ...programRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap routes, falling back to base routes:", error);
    return routes;
  }
}
