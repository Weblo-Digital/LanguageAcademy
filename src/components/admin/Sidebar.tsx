"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Search,
  Settings,
  Users,
  History,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { hasPermission, Permission } from "@/lib/auth/rbac";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role: string;
  };
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Tableau de Bord",
      href: "/admin",
      icon: LayoutDashboard,
      permission: "settings.view" as Permission,
    },
    {
      label: "Formulaires",
      href: "/admin/submissions",
      icon: FileText,
      permission: "submissions.list" as Permission,
    },
    {
      label: "Gestion du Contenu",
      href: "/admin/content",
      icon: FolderOpen,
      permission: "content.list" as Permission,
    },
    {
      label: "Médiathèque",
      href: "/admin/media",
      icon: ImageIcon,
      permission: "media.upload" as Permission,
    },
    {
      label: "Optimisation SEO",
      href: "/admin/seo",
      icon: Search,
      permission: "seo.view" as Permission,
    },
    {
      label: "Configuration",
      href: "/admin/settings",
      icon: Settings,
      permission: "settings.view" as Permission,
    },
    {
      label: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
      permission: "users.list" as Permission,
    },
    {
      label: "Journal d'Audit",
      href: "/admin/audit",
      icon: History,
      permission: "audit.view" as Permission,
    },
  ];

  // Filter items based on user permissions
  const filteredItems = navItems.filter((item) =>
    hasPermission(user.role as any, item.permission)
  );

  return (
    <aside className="w-64 bg-brand-navy border-r border-slate-800 text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="flex flex-col flex-1 overflow-y-auto">
        
        {/* Sidebar Header Brand */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <GraduationCap className="size-8 text-brand-lime" />
          <div>
            <h2 className="font-bold text-white text-sm font-heading tracking-wide">
              Next Point
            </h2>
            <p className="text-[10px] text-brand-lime font-extrabold uppercase tracking-widest">
              Portail Admin
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 group cursor-pointer",
                  isActive
                    ? "bg-slate-800 text-white border-l-4 border-brand-lime pl-3"
                    : "hover:bg-slate-800/40 hover:text-slate-100"
                )}
              >
                <item.icon
                  className={cn(
                    "size-4.5 shrink-0",
                    isActive ? "text-brand-lime" : "text-slate-400 group-hover:text-slate-300"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between gap-3 px-2 mb-4">
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{user.name || "Admin"}</p>
            <p className="text-[10px] text-slate-500 font-bold tracking-wider truncate uppercase">
              {user.role}
            </p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-950/30 hover:bg-red-950/50 text-red-400 hover:text-red-300 rounded-xl text-xs font-bold border border-red-900/30 transition-all cursor-pointer"
        >
          <LogOut className="size-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
