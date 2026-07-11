import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // NextAuth v5 session retrieval is asynchronous.
  // We can let the login page bypass sidebar rendering, but protect all other pages.
  // We check if there is an active session for non-login admin subpaths.
  const user = session?.user;

  // Let the login page render independently without sidebar wrapper
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {user && (
        <Sidebar
          user={{
            name: user.name,
            email: user.email,
            role: (user as any).role || "EDITOR",
          }}
        />
      )}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
