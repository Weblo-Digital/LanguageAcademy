import { db } from "@/lib/db";
import { requirePermission, verifySession } from "@/lib/auth/dal";
import { UsersManager } from "@/components/admin/UsersManager";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  // Only SUPER_ADMIN users can access administrative role mappings
  await requirePermission("users.list");
  
  const session = await verifySession();

  // Query all users from the MySQL database
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <UsersManager
      users={JSON.parse(JSON.stringify(users))}
      currentUserId={session?.user?.id || ""}
    />
  );
}
