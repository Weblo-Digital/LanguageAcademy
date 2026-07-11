import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/dal";
import { SettingsManager } from "@/components/admin/SettingsManager";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  // Only SUPER_ADMIN users can access system settings configuration
  await requirePermission("settings.view" as any);

  // Fetch all site settings from the MySQL database
  const settings = await db.siteSetting.findMany();

  return <SettingsManager initialSettings={JSON.parse(JSON.stringify(settings))} />;
}
