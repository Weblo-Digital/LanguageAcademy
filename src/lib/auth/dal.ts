import { cache } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hasPermission, Permission } from "./rbac";

export const verifySession = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session;
});

export const requirePermission = cache(async (permission: Permission) => {
  const session = await verifySession();
  const userRole = (session.user as any).role;
  if (!userRole || !hasPermission(userRole, permission)) {
    throw new Error("Forbidden: Insufficient Permissions");
  }
  return session;
});
