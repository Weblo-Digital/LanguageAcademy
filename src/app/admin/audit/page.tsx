import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/dal";
import { Clock, ShieldCheck, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminAuditLogsPage() {
  // Only SUPER_ADMIN users can view system audit logs
  await requirePermission("settings.view" as any);

  // Fetch all audit logs including the user who performed the action
  const logs = await db.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    take: 100, // Limit to recent 100 entries for efficiency
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto text-left">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl font-bold text-brand-navy font-heading flex items-center gap-2">
          <ShieldCheck className="size-6 text-brand-emerald" /> Journaux d'Audit & Sécurité
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">
          Historique en temps réel des actions d'administration et des modifications de paramètres
        </p>
      </div>

      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider">
                Action
              </th>
              <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider">
                Ressource ciblée
              </th>
              <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider">
                ID Ressource
              </th>
              <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider">
                Date & Heure
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-600">
            {logs.map((log: any) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 flex items-center gap-2">
                  <div className="size-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <User className="size-3.5" />
                  </div>
                  <div>
                    <p className="text-brand-navy font-bold">{log.user?.name || "Système"}</p>
                    <p className="text-[9px] text-slate-400 font-semibold">{log.user?.email || "cron@npa"}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black tracking-wider ${
                    log.action === "CREATE"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : log.action === "UPDATE"
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="p-4 text-brand-navy font-bold">
                  {log.resource}
                </td>
                <td className="p-4 font-mono text-[10px] text-slate-400">
                  {log.resourceId}
                </td>
                <td className="p-4 space-y-0.5 text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="size-3.5 text-slate-350" />
                    <span>{new Date(log.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold">
                    {new Date(log.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </p>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                  Aucun journal d'audit enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
