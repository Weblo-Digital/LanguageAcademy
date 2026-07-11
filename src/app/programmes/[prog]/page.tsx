import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Layers, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";
import { LeadCaptureCard } from "@/components/shared/LeadCaptureCard";
import { DownloadButton } from "@/components/client/DownloadButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ prog: string }> }): Promise<Metadata> {
  const { prog } = await params;
  const program = await db.program.findUnique({
    where: { slug: prog?.toLowerCase() },
    include: { translations: true }
  });
  
  if (!program) return { title: "Programme non trouvé | Next Point Academy" };
  const translation = program.translations.find(t => t.locale === "fr") || program.translations[0];
  
  return {
    title: `${translation?.name || "Programme"} | Next Point Academy`,
    description: translation?.subhead,
  };
}

export default async function Page({ params }: { params: Promise<{ prog: string }> }) {
  const { prog: progKey } = await params;
  const program = await db.program.findUnique({
    where: { slug: progKey?.toLowerCase(), isActive: true },
    include: { translations: true }
  });

  if (!program) {
    notFound();
  }

  const translation = program.translations.find(t => t.locale === "fr") || program.translations[0];
  const modules = (program.modules as unknown as string[]) || [];
  const strategy = (program.strategy as unknown as string[]) || [];

  const breadcrumbs = [
    { label: "Accueil", href: "/" }
  ];

  return (
    <div className="pb-24">
      <PageHero
        title={translation?.name || ""}
        subtitle={translation?.subhead || ""}
        badgeText="Programme Académique"
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content Details Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Details & Syllabus */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Description */}
            <div className="text-left space-y-4">
              <h3 className="text-xl font-black text-brand-navy tracking-tight">Présentation du Programme</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {translation?.description}
              </p>
            </div>

            {/* Metadata Table details */}
            <div className="bg-brand-warm-white rounded-3xl p-8 border border-slate-100/80 text-left space-y-6">
              <h3 className="text-lg font-black text-brand-navy tracking-tight border-b border-slate-200 pb-3 flex items-center gap-2">
                <Calendar className="size-5 text-[#057A55]" /> Spécifications de la Session
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-left">
                <div className="space-y-1">
                  <p className="font-extrabold uppercase text-slate-400 tracking-wider">Durée &amp; Intensité</p>
                  <p className="font-bold text-brand-navy text-sm">{program.duration}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-extrabold uppercase text-slate-400 tracking-wider">Taille du Groupe</p>
                  <p className="font-bold text-brand-navy text-sm">{program.groupSize}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-extrabold uppercase text-slate-400 tracking-wider">Niveau Admis</p>
                  <p className="font-bold text-brand-navy text-sm leading-relaxed">{program.level}</p>
                </div>
              </div>
            </div>

            {/* Syllabus breakdown */}
            <div className="text-left space-y-6">
              <h3 className="text-xl font-black text-brand-navy tracking-tight flex items-center gap-2">
                <Layers className="size-5 text-[#057A55]" /> {"Programme d'Études / Syllabus"}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {modules.map((module, i) => (
                  <div key={i} className="border border-slate-100 p-6 rounded-2xl flex items-center gap-4 bg-white shadow-3xs">
                    <span className="size-8 rounded-full bg-brand-navy/5 flex items-center justify-center text-xs font-bold text-brand-navy shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-bold">{module}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy / Approach */}
            <div className="text-left space-y-6">
              <h3 className="text-xl font-black text-brand-navy tracking-tight">Notre Approche Pédagogique</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strategy.map((item, i) => (
                  <li key={i} className="flex gap-3 bg-white p-5 border border-slate-100 rounded-2xl shadow-3xs text-left">
                    <div className="size-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="size-3.5 fill-current" />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-semibold">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Download Guide Lead Capture Card */}
          <div className="lg:col-span-5">
            <LeadCaptureCard
              title="Télécharger la Brochure"
              description="Remplissez vos coordonnées pour recevoir immédiatement par email la brochure complète de ce programme avec les tarifs, les dates de sessions et les profils de formateurs."
              submitLabel="Obtenir la brochure (PDF)"
              fields={[
                { name: "name", label: "Nom complet", type: "text", placeholder: "Ex: Youssef El Alami", required: true },
                { name: "email", label: "Adresse email", type: "email", placeholder: "Ex: youssef@gmail.com", required: true }
              ]}
              successContent={
                <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-6 text-center space-y-4">
                  <DownloadButton label="Télécharger la Brochure (PDF)" />
                </div>
              }
            />
          </div>

        </div>
      </section>

      {/* Final CTA Banner Card */}
      <CTABanner
        title="Prêt à commencer l'aventure linguistique ?"
        description="Bénéficiez d'une orientation gratuite avec nos conseillers pédagogiques pour choisir le format parfait adapté à vos objectifs."
        buttonText="Réserver mon orientation gratuite"
        variant="navy"
      />
    </div>
  );
}
