import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, FileText } from "lucide-react";
import { db } from "@/lib/db";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";
import { LeadCaptureCard } from "@/components/shared/LeadCaptureCard";
import { DownloadButton } from "@/components/client/DownloadButton";

interface ExamSection {
  title: string;
  desc: string;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ test: string }> }): Promise<Metadata> {
  const { test } = await params;
  const exam = await db.exam.findUnique({
    where: { slug: test?.toLowerCase() },
    include: { translations: true }
  });
  
  if (!exam) return { title: "Examen non trouvé | Next Point Academy" };
  const translation = exam.translations.find((t: any) => t.locale === "fr") || exam.translations[0];
  
  return {
    title: `Préparation ${translation?.name || "Certification"} | Next Point Academy`,
    description: translation?.intro,
  };
}

export default async function Page({ params }: { params: Promise<{ test: string }> }) {
  const { test: testKey } = await params;
  const exam = await db.exam.findUnique({
    where: { slug: testKey?.toLowerCase(), isActive: true },
    include: { translations: true }
  });

  if (!exam) {
    notFound();
  }

  const translation = exam.translations.find((t: any) => t.locale === "fr") || exam.translations[0];
  const sections = (exam.sections as unknown as ExamSection[]) || [];
  const strategy = (exam.strategy as unknown as string[]) || [];

  const breadcrumbs = [
    { label: "Toutes les certifications", href: "/examens" }
  ];

  return (
    <div className="pb-24">
      <PageHero
        title={`Préparation Officielle ${translation?.name || ""}`}
        subtitle={translation?.intro || ""}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Content Details Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Details & Strategy */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Metadata Table details */}
            <div className="bg-brand-warm-white rounded-3xl p-8 border border-slate-100/80 text-left space-y-6">
              <h3 className="text-lg font-black text-brand-navy tracking-tight border-b border-slate-200 pb-3 flex items-center gap-2">
                <FileText className="size-5 text-[#057A55]" /> {"Fiche Technique de l'Examen"}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-left">
                <div className="space-y-1">
                  <p className="font-extrabold uppercase text-slate-400 tracking-wider">Durée Totale</p>
                  <p className="font-bold text-brand-navy text-sm">{exam.duration}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-extrabold uppercase text-slate-400 tracking-wider">Validité du diplôme</p>
                  <p className="font-bold text-brand-navy text-sm">{exam.validity}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="font-extrabold uppercase text-slate-400 tracking-wider">Format &amp; Épreuves</p>
                  <p className="font-bold text-brand-navy text-sm leading-relaxed">{exam.format}</p>
                </div>
              </div>
            </div>

            {/* Structure Breakdown */}
            <div className="text-left space-y-6">
              <h3 className="text-xl font-black text-brand-navy tracking-tight">{"Structure de l'examen "}{translation?.name}</h3>
              <div className="grid grid-cols-1 gap-4">
                {sections.map((sec, i) => (
                  <div key={i} className="border border-slate-100 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-3xs">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-brand-navy">{sec.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{sec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Strategy */}
            <div className="text-left space-y-6">
              <h3 className="text-xl font-black text-brand-navy tracking-tight">Notre Stratégie de Préparation</h3>
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
              title="Télécharger le Guide Officiel"
              description="Remplissez vos coordonnées pour recevoir immédiatement par email notre guide de préparation exclusif avec des conseils d'experts natifs et des exemples de questions."
              submitLabel="Obtenir mon guide gratuit (PDF)"
              fields={[
                { name: "name", label: "Nom complet", type: "text", placeholder: "Ex: Youssef El Alami", required: true },
                { name: "email", label: "Adresse email", type: "email", placeholder: "Ex: youssef@gmail.com", required: true }
              ]}
              successContent={
                <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-6 text-center space-y-4">
                  <DownloadButton label="Télécharger le Guide (PDF)" />
                </div>
              }
            />
          </div>

        </div>
      </section>

      {/* Reusable CTABanner */}
      <CTABanner
        title="Prêt à valider votre score cible ?"
        description="Inscrivez-vous pour passer un examen blanc gratuit ou contactez notre équipe pour concevoir votre programme de préparation personnalisé."
        buttonText="Passer mon test gratuit"
        variant="navy"
      />
    </div>
  );
}
