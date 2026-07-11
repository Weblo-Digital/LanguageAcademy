import type { Metadata } from "next";
import { Building2, Target, Heart } from "lucide-react";
import { Translated } from "@/components/client/Translated";
import { PageHero } from "@/components/shared/PageHero";
import { institutTranslations } from "@/lib/translations/institut";

import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const defaults = {
    title: "L'Institut | Next Point Academy",
    description: "Découvrez notre histoire, nos accréditations et notre mission d'excellence en enseignement linguistique active.",
  };
  return getPageMetadata("/institut", defaults);
}

export default function InstitutPage() {
  const fr = institutTranslations.fr;
  const en = institutTranslations.en;

  const sections = [
    {
      icon: Building2,
      title: <Translated fr={fr.missionTitle} en={en.missionTitle} />,
      description: <Translated fr={fr.missionDesc} en={en.missionDesc} />,
    },
    {
      icon: Target,
      title: <Translated fr={fr.approachTitle} en={en.approachTitle} />,
      description: <Translated fr={fr.approachDesc} en={en.approachDesc} />,
    },
    {
      icon: Heart,
      title: <Translated fr={fr.valuesTitle} en={en.valuesTitle} />,
      description: <Translated fr={fr.valuesDesc} en={en.valuesDesc} />,
    },
  ];

  const breadcrumbs = [
    { label: "Accueil", href: "/" }
  ];

  return (
    <div className="pb-24">
      <PageHero
        title={<Translated fr={fr.heroTitle} en={en.heroTitle} />}
        subtitle={<Translated fr={fr.heroDesc} en={en.heroDesc} />}
        badgeText={<Translated fr={fr.heroBadge} en={en.heroBadge} />}
        breadcrumbs={breadcrumbs}
      />

      {/* Grid of features */}
      <section className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, i) => (
            <div key={i} className="rounded-3xl border border-border/60 bg-white p-8 lg:p-10 shadow-3xs hover:border-amber-500/20 hover:shadow-2xs transition-all duration-300 text-left">
              <div className="size-12 rounded-2xl bg-brand-warm-white border border-border/50 flex items-center justify-center text-amber-600 mb-6">
                <section.icon className="size-5.5" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">{section.title}</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
