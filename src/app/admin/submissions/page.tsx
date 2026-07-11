import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import { SubmissionsManager } from "@/components/admin/SubmissionsManager";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  // Verify session and role server-side
  const session = await verifySession();
  const userRole = (session.user as any).role || "EDITOR";

  // Fetch all form submissions from the MySQL database
  const submissions = await db.formSubmission.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <SubmissionsManager
      initialSubmissions={JSON.parse(JSON.stringify(submissions))}
      userRole={userRole}
    />
  );
}
