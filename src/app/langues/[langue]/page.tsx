import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";
import { TestModalTrigger } from "@/components/client/TestModalTrigger";

interface LevelData {
  code: string;
  label: string;
  title: string;
  color: string;
  desc: string;
  items: string[];
  btnText: string;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ langue: string }> }): Promise<Metadata> {
  const { langue } = await params;
  const language = await db.language.findUnique({
    where: { slug: langue?.toLowerCase() },
    include: { translations: true }
  });
  
  if (!language) return { title: "Langue non trouvée | Next Point Academy" };
  const translation = language.translations.find(t => t.locale === "fr") || language.translations[0];
  
  return {
    title: `Cours d'${translation?.name || "Langue"} | Next Point Academy`,
    description: translation?.description,
  };
}

export default async function Page({ params }: { params: Promise<{ langue: string }> }) {
  const { langue: langKey } = await params;
  const language = await db.language.findUnique({
    where: { slug: langKey?.toLowerCase(), isActive: true },
    include: { translations: true }
  });

  if (!language) {
    notFound();
  }

  const translation = language.translations.find(t => t.locale === "fr") || language.translations[0];
  const levels = (translation?.levels as unknown as LevelData[]) || [];

  const breadcrumbs = [
    { label: "Accueil", href: "/" }
  ];

  return (
    <div className="pb-24">
      <PageHero
        title={translation?.fullName || ""}
        subtitle={translation?.description || ""}
        badgeText={language.code}
        breadcrumbs={breadcrumbs}
      />

      {/* Levels Cards Grid Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24">
        <div className="mb-12 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">CECRL / CEFR Levels</span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground mt-2">Niveaux de formation disponibles</h2>
          <p className="text-sm text-muted-foreground mt-2">Du Lundi au Vendredi — 2h30 par session</p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {levels.map((level, i) => {
            const letter = level.code.charAt(0);
            const num = level.code.charAt(1);
            return (
              <Card key={i} className={`rounded-3xl border ${level.color} p-8 flex flex-col justify-between shadow-2xs hover:shadow-sm hover:scale-[1.01] transition-all duration-300`}>
                <CardContent className="p-0 text-left">
                  {/* Double Circle Icon Badge */}
                  <div className="flex items-center gap-1.5 mb-6">
                    <div className="size-8 rounded-full border border-slate-900/10 flex items-center justify-center font-bold text-xs bg-white/20">
                      {letter}
                    </div>
                    <div className="size-8 rounded-full border border-slate-900/10 flex items-center justify-center font-bold text-xs bg-white/20">
                      {num}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold tracking-tight mb-2">
                    {level.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800 bg-white/30 px-2.5 py-0.5 rounded-full">
                    {level.label}
                  </span>
                  
                  <p className="mt-4 text-xs font-medium text-slate-800 leading-relaxed">
                    {level.desc}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-900/10">
                    <ul className="space-y-2">
                      {level.items.map((item, idx) => (
                        <li key={idx} className="text-xs font-medium text-slate-800 flex items-start gap-2">
                          <span className="text-slate-900 mt-0.5">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <div className="mt-8 pt-5 border-t border-slate-900/10">
                  <TestModalTrigger className="w-full" initialLanguage={langKey}>
                    <Button 
                      className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-full font-bold text-xs py-5 cursor-pointer border-none"
                    >
                      {level.btnText}
                    </Button>
                  </TestModalTrigger>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Metrics Banner */}
        <div className="py-12 mt-20 border-y border-border/50 bg-brand-warm-white/50 rounded-3xl px-8 flex flex-col sm:flex-row items-center justify-around gap-8">
          {[
            { icon: Clock, label: "2.5 Heures / Session" },
            { icon: Award, label: "Certificat de Réussite" },
            { icon: Users, label: "Effectif Limité à 8" },
          ].map((metric, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-white border border-border/60 flex items-center justify-center text-brand-navy shadow-3xs">
                <metric.icon className="size-5" />
              </div>
              <span className="text-sm font-bold text-foreground">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Final CTA Banner Card */}
        <CTABanner
          title={`Prêt à commencer vos cours de ${translation?.name || ""} ?`}
          description="Rejoignez notre programme de formation active et développez la maîtrise nécessaire pour réaliser vos projets professionnels et académiques."
          buttonText="Réserver votre orientation gratuite"
          variant="navy"
        />
      </section>
    </div>
  );
}
