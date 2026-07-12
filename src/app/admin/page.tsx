import { db } from "@/lib/db";
import { SubmissionStatus } from "@prisma/client";
import { verifySession } from "@/lib/auth/dal";
import Link from "next/link";
import { 
  Users, 
  FileText, 
  GraduationCap, 
  FileCheck,
  ChevronRight,
  TrendingUp,
  Inbox
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await verifySession();

  // Query counts for statistics
  const submissionsCount = await db.formSubmission.count();
  const programsCount = await db.program.count({ where: { isActive: true } });
  const examsCount = await db.exam.count({ where: { isActive: true } });
  const usersCount = await db.user.count({ where: { isActive: true } });

  // Get recent 5 submissions
  const recentSubmissions = await db.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5
  });

  const stats = [
    {
      label: "Total Soumissions",
      value: submissionsCount,
      icon: Inbox,
      color: "text-brand-emerald bg-brand-emerald/10",
      link: "/admin/submissions"
    },
    {
      label: "Programmes Actifs",
      value: programsCount,
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50",
      link: "/admin/content"
    },
    {
      label: "Certifications Actives",
      value: examsCount,
      icon: FileCheck,
      color: "text-brand-lime bg-brand-lime/10",
      link: "/admin/content"
    },
    {
      label: "Équipe NPA Active",
      value: usersCount,
      icon: Users,
      color: "text-purple-600 bg-purple-50",
      link: "/admin/users"
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto text-left">
      
      {/* Welcome Hero */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-brand-navy font-heading">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Surveillance en temps réel de votre académie et gestion du contenu
          </p>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link 
            key={i} 
            href={stat.link}
            className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-3xs hover:shadow-xs transition-all duration-300 group block"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-extrabold text-brand-navy leading-none">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} transition-colors group-hover:scale-105 duration-200`}>
                <stat.icon className="size-5 shrink-0" />
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-brand-emerald font-bold mt-4 border-t border-slate-50 pt-3">
              <TrendingUp className="size-3" /> Gérer dans la console <ChevronRight className="size-3" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Submissions Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
              Dernières Demandes Reçues
            </h3>
            <Link 
              href="/admin/submissions"
              className="text-[10px] font-black text-brand-emerald uppercase tracking-wider hover:underline flex items-center gap-0.5"
            >
              Voir tout <ChevronRight className="size-3" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs overflow-hidden divide-y divide-slate-100">
            {recentSubmissions.map((sub: any) => {
              const data = sub.data as any;
              return (
                <div key={sub.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 min-w-0 flex-1 text-left">
                    <p className="text-xs font-black text-brand-navy truncate">
                      {data.name || data.email || "Prospect Anonyme"}
                    </p>
                    <div className="flex items-center gap-2.5 text-[10px] text-slate-400 font-bold">
                      <span className="text-brand-emerald bg-brand-emerald/5 px-2 py-0.5 rounded-full uppercase tracking-wider text-[8px]">
                        {sub.formType}
                      </span>
                      <span>
                        {new Date(sub.createdAt).toLocaleDateString("fr-FR")} à {new Date(sub.createdAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>

                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-widest border ${
                    sub.status === SubmissionStatus.UNREAD
                      ? "bg-amber-50 text-amber-700 border-amber-100"
                      : sub.status === SubmissionStatus.REPLIED
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : "bg-emerald-50 text-emerald-700 border-emerald-100"
                  }`}>
                    {sub.status === SubmissionStatus.UNREAD ? "Nouveau" : sub.status === SubmissionStatus.REPLIED ? "Répondu" : sub.status === SubmissionStatus.READ ? "Lu" : "Archivé"}
                  </span>
                </div>
              );
            })}
            
            {recentSubmissions.length === 0 && (
              <div className="p-8 text-center text-slate-400 font-medium text-xs">
                Aucune demande reçue pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* Rapid Actions Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
            Raccourcis Système
          </h3>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-3xs space-y-3">
            <Link 
              href="/admin/settings" 
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-colors"
            >
              <span>Accéder à la maintenance</span>
              <ChevronRight className="size-4 text-slate-400" />
            </Link>
            
            <Link 
              href="/admin/seo" 
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-colors"
            >
              <span>Optimisation SEO & Balises</span>
              <ChevronRight className="size-4 text-slate-400" />
            </Link>

            <Link 
              href="/admin/media" 
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-colors"
            >
              <span>Médiathèque R2 Storage</span>
              <ChevronRight className="size-4 text-slate-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
