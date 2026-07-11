import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth/dal";
import Link from "next/link";
import { 
  GraduationCap, 
  FileCheck, 
  Clock, 
  Users, 
  PenTool, 
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const session = await verifySession();

  // Fetch all programs and exams with translations
  const programs = await db.program.findMany({
    orderBy: { sortOrder: "asc" },
    include: { translations: true }
  });

  const exams = await db.exam.findMany({
    orderBy: { sortOrder: "asc" },
    include: { translations: true }
  });

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto text-left">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl font-bold text-brand-navy font-heading">
          Gestion du Contenu (CMS)
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">
          Modifiez les informations des programmes académiques, formations et examens
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Academic Programs Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-brand-navy uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="size-5 text-brand-emerald" /> Programmes Académiques ({programs.length})
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
            {programs.map((program) => {
              const translation = program.translations.find(t => t.locale === "fr") || program.translations[0];
              return (
                <div key={program.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-black text-brand-navy truncate">
                        {translation?.name}
                      </p>
                      {program.isActive ? (
                        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="size-3.5 text-slate-300 shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" /> {program.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="size-3" /> {program.groupSize}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/programmes/${program.slug}`}
                      target="_blank"
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg transition-colors"
                      title="Visualiser"
                    >
                      <Eye className="size-4" />
                    </Link>
                    
                    <Link
                      href={`/admin/content/programs/${program.id}/edit`}
                      className="p-2 bg-slate-50 hover:bg-brand-emerald/10 text-slate-500 hover:text-brand-emerald rounded-lg transition-colors flex items-center justify-center"
                      title="Modifier"
                    >
                      <PenTool className="size-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Exams & Certifications Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-brand-navy uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="size-5 text-brand-lime" /> Examens & Certifications ({exams.length})
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
            {exams.map((exam) => {
              const translation = exam.translations.find(t => t.locale === "fr") || exam.translations[0];
              return (
                <div key={exam.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-black text-brand-navy truncate">
                        {translation?.name}
                      </p>
                      {exam.isActive ? (
                        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="size-3.5 text-slate-300 shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" /> {exam.duration}
                      </span>
                      <span>Format: {exam.format}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/examens/${exam.slug}`}
                      target="_blank"
                      className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 rounded-lg transition-colors"
                      title="Visualiser"
                    >
                      <Eye className="size-4" />
                    </Link>
                    
                    <Link
                      href={`/admin/content/exams/${exam.id}/edit`}
                      className="p-2 bg-slate-50 hover:bg-brand-emerald/10 text-slate-500 hover:text-brand-emerald rounded-lg transition-colors flex items-center justify-center"
                      title="Modifier"
                    >
                      <PenTool className="size-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
