import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";

interface ExamInfo {
  name: string;
  fullName: string;
  items: string[];
}

const englishExams: ExamInfo[] = [
  {
    name: "IELTS",
    fullName: "International English Language Testing System",
    items: [
      "Simulations d'examens complets en temps réel",
      "Stratégies pragmatiques pour chaque section (Speaking, Writing...)",
      "Coaching personnalisé avec retours détaillés d'enseignants natifs",
      "Garantie d'atteinte de votre score cible (ou prolongation gratuite)",
    ],
  },
  {
    name: "TOEFL iBT",
    fullName: "Test of English as a Foreign Language",
    items: [
      "Maîtrise complète du format d'examen informatisé",
      "Entraînement intensif en Reading & Listening avec banques d'examens",
      "Techniques de Speaking et structure de rédaction pour le Writing",
      "Tests blancs chronométrés et correction individualisée des essais",
    ],
  },
];

const frenchExams: ExamInfo[] = [
  {
    name: "DELF",
    fullName: "Diplôme d'Études en Langue Française",
    items: [
      "Préparation ciblée pour les niveaux A1 à B2 du CECRL",
      "Épreuves blanches collectives et retours détaillés",
      "Méthodologie rigoureuse pour l'épreuve de production écrite",
      "Ateliers oraux réguliers en conditions réelles d'examen",
    ],
  },
  {
    name: "DALF",
    fullName: "Diplôme Approfondi de Langue Française",
    items: [
      "Niveaux de haute maîtrise C1 et C2",
      "Travail sur la synthèse documentaire et l'argumentation structurée",
      "Entraînement à l'exposé oral et au débat face à un jury",
      "Perfectionnement de la grammaire complexe et correction des essais",
    ],
  },
  {
    name: "TCF Canada / Québec",
    fullName: "Test de Connaissance du Français",
    items: [
      "Formations optimisées pour les projets d'immigration",
      "Compréhension orale et écrite sur plateforme d'entraînement",
      "Ateliers d'expression orale structurée chronométrés",
      "Résultats rapides avec un accompagnement sur-mesure",
    ],
  },
];

const spanishExams: ExamInfo[] = [
  {
    name: "DELE",
    fullName: "Diploma de Español como Lengua Extranjera",
    items: [
      "Préparation officielle pour tous les niveaux A1 à C2",
      "Immersion linguistique active en groupe de travail réduit",
      "Pratique orale intensive axée sur les thématiques d'examen",
      "Simulations officielles régulières avec correction détaillée",
    ],
  },
];

const slugMap: Record<string, string> = {
  "IELTS": "ielts",
  "TOEFL iBT": "toefl",
  "DELF": "delf",
  "DALF": "dalf",
  "TCF Canada / Québec": "tcf",
  "DELE": "dele"
};

import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const defaults = {
    title: "Préparation aux Examens Internationaux | Next Point Academy",
    description: "Préparation IELTS, TOEFL, Cambridge, DELF, DALF, DELE, TEF. Taux de réussite exceptionnel et coaching personnalisé.",
  };
  return getPageMetadata("/examens", defaults);
}

function ExamCard({ exam }: { exam: ExamInfo }) {
  const slug = slugMap[exam.name] || "";
  return (
    <Card className="rounded-3xl border border-border/70 bg-white p-6 shadow-3xs hover:border-brand-emerald/20 hover:shadow-xs transition-all duration-300 flex flex-col justify-between">
      <div>
        <CardHeader className="p-0 pb-5 border-b border-border/50 text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-emerald">Certification Officielle</span>
          <CardTitle className="text-xl font-bold tracking-tight text-foreground mt-2">
            {exam.name}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{exam.fullName}</p>
        </CardHeader>
        <CardContent className="p-0 pt-6 text-left">
          <ul className="space-y-4">
            {exam.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="size-4.5 text-brand-emerald mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
        <Link href={`/examens/${slug}`} className="w-full">
          <Button variant="outline" className="w-full rounded-xl text-xs font-bold py-5 text-brand-navy border-slate-200 hover:bg-slate-50 cursor-pointer">
            Découvrir la préparation &rarr;
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default function ExamensPage() {
  return (
    <div className="pb-24">
      <PageHero
        title="Certifications & Examens Internationaux"
        subtitle="Maximisez votre score grâce à des programmes intensifs conçus pour déjouer les pièges des épreuves officielles."
        badgeText="Préparation Officielle"
        breadcrumbs={[{ label: "Accueil", href: "/" }]}
      />

      {/* Exam Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24 space-y-20 animate-fade-in-up">
        {/* English */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-navy bg-brand-navy/5 px-3 py-1.5 rounded-full border border-brand-navy/10">EN</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Certifications en Anglais
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {englishExams.map((exam) => (
              <ExamCard key={exam.name} exam={exam} />
            ))}
          </div>
        </div>

        {/* French */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-navy bg-brand-navy/5 px-3 py-1.5 rounded-full border border-brand-navy/10">FR</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Certifications en Français
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {frenchExams.map((exam) => (
              <ExamCard key={exam.name} exam={exam} />
            ))}
          </div>
        </div>

        {/* Spanish */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-navy bg-brand-navy/5 px-3 py-1.5 rounded-full border border-brand-navy/10">ES</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Certifications en Espagnol
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spanishExams.map((exam) => (
              <ExamCard key={exam.name} exam={exam} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Prêt à valider votre score cible ?"
        description="Inscrivez-vous pour passer un examen blanc gratuit ou contactez notre équipe pour concevoir votre programme de préparation personnalisé."
        buttonText="Passer mon test gratuit"
        variant="navy"
      />
    </div>
  );
}
