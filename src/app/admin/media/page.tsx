import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { MediaManager } from "@/components/admin/MediaManager";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const session = await verifySession();
  const userRole = (session.user as any).role || "EDITOR";

  // Fetch all uploaded files metadata from database
  const files = await db.mediaFile.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <MediaManager
      initialFiles={JSON.parse(JSON.stringify(files))}
      userRole={userRole}
    />
  );
}
