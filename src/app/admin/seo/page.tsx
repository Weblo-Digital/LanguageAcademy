import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { SeoManager } from "@/components/admin/SeoManager";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  await verifySession();

  // Query all SEO overrides stored in the database
  const seoRecords = await db.seoMetadata.findMany();

  return <SeoManager initialSeo={JSON.parse(JSON.stringify(seoRecords))} />;
}
