import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowUpRight, 
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formulas } from "@/lib/data/summer-camp";
import { TestModalTrigger } from "@/components/client/TestModalTrigger";

import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const defaults = {
    title: "Camps d'Été Linguistiques | Next Point Academy",
    description: "Summer Smart Camp pour enfants et adolescents. Immersion linguistique avec activités pédagogiques et ludiques pendant les vacances d'été.",
  };
  return getPageMetadata("/camps-ete", defaults);
}

export default function SummerCampsPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Page Hero */}
      <section className="relative w-full text-white bg-brand-navy pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden border-b border-white/5">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-5 select-none pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Copy details */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-lime bg-brand-lime/10 px-3 py-1.5 rounded-full border border-brand-lime/20 mb-6">
              Inscriptions Ouvertes — Été 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight mb-6">
              {"Camps d'Été"} <br />
              Linguistiques <br />
              <span className="text-brand-lime">Immersion Totale</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mb-10">
              {"Offrez à vos enfants ou boostez vos propres compétences avec nos formules intensives d'été. Des activités immersives encadrées par des formateurs natifs certifiés."}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <TestModalTrigger>
                <Button
                  className="bg-brand-lime text-brand-navy hover:bg-brand-lime-dark border-none font-bold rounded-full px-8 py-6 text-xs transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md cursor-pointer"
                >
                  Réserver une place
                  <div className="size-5 rounded-full bg-brand-navy text-brand-lime flex items-center justify-center transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    <ArrowUpRight className="size-3" strokeWidth={3} />
                  </div>
                </Button>
              </TestModalTrigger>
              <Link href="#formules">
                <Button variant="outline" className="rounded-full text-xs font-semibold px-8 py-6 border-white/20 hover:bg-white/10 hover:text-white cursor-pointer">
                  Découvrir les Formules
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Premium Image card */}
          <div className="lg:col-span-5 relative w-full h-[320px] lg:h-[400px] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl z-10 shrink-0">
            <Image 
              src="/images/summer-camp.jpg" 
              alt="Summer Camp teenagers studying outdoors"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Practical details section */}
      <section className="py-12 bg-brand-warm-white border-b border-border/50">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/30 flex items-center justify-center text-[#B88100] shrink-0 mt-0.5">
                <Calendar className="size-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">Dates &amp; Périodes</p>
                <p className="text-xs text-muted-foreground mt-1">Du 1er Juillet au 31 Août (Sessions hebdomadaires)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/30 flex items-center justify-center text-[#B88100] shrink-0 mt-0.5">
                <Clock className="size-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">Schedules</p>
                <p className="text-xs text-muted-foreground mt-1">Options Demi-Journée (15h) &amp; Journée Complète (25h)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/30 flex items-center justify-center text-[#B88100] shrink-0 mt-0.5">
                <Users className="size-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">Effectif Réduit</p>
                <p className="text-xs text-muted-foreground mt-1">Maximum 8 apprenants par groupe de niveau</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/30 flex items-center justify-center text-[#B88100] shrink-0 mt-0.5">
                <MapPin className="size-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-foreground uppercase tracking-wider">Campus</p>
                <p className="text-xs text-muted-foreground mt-1">Casablanca, Rabat, Marrakech, Tanger</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formules section */}
      <section id="formules" className="py-24 bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-navy bg-brand-navy/5 px-3 py-1.5 rounded-full border border-brand-navy/10">
              Nos Formules 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-4">
              Des Programmes sur-mesure pour chaque âge
            </h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {"Choisissez la formule adaptée à vos besoins. Tous nos programmes incluent l'évaluation du niveau initiale et les supports d'étude complets."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {formulas.map((form, idx) => (
              <div key={idx} className={`rounded-3xl ${form.color} p-8 flex flex-col justify-between border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 relative group`}>
                <div className="text-left">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/40 text-slate-900 px-3 py-1 rounded-full">
                      {form.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-900 bg-white/20 px-2.5 py-1 rounded-md">
                      {form.age}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {form.title}
                  </h3>
                  <p className="mt-3 text-xs text-slate-800 font-medium leading-relaxed">
                    {form.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-900 bg-white/10 p-3 rounded-xl border border-black/5">
                    <Clock className="size-4 shrink-0" />
                    <span>{form.schedule}</span>
                  </div>

                  <ul className="mt-8 space-y-3.5 border-t border-black/10 pt-6">
                    {form.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs font-semibold text-slate-900">
                        <div className="size-4.5 rounded-full bg-white/50 flex items-center justify-center text-slate-900 shrink-0 mt-0.5">
                          <Check className="size-3" strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <TestModalTrigger className="w-full">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs py-5 cursor-pointer border-none">
                      Réserver ce programme
                    </Button>
                  </TestModalTrigger>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-brand-warm-white border-t border-border/50">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Checklists */}
            <div className="lg:col-span-7 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-navy">La Méthode Next Point</span>
              <h3 className="text-3xl font-black tracking-tight text-foreground mt-4 leading-tight">
                Une immersion totale active pour des résultats concrets.
              </h3>
              <p className="text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">
                {"Notre approche pédagogique active permet d'éliminer la barrière de la timidité et de développer une fluidité naturelle. Pas de mémorisation passive : nous apprenons en faisant."}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Pratique Spontanée", desc: "80% du temps en classe est consacré à la parole active et aux débats." },
                  { title: "Formateurs Experts", desc: "Enseignants natifs qualifiés, experts en pédagogie communicative pour enfants et adultes." },
                  { title: "Suivi & Évaluation", desc: "Évaluation initiale rigoureuse et bilans réguliers pour mesurer les progrès." },
                  { title: "Culture & Échanges", desc: "Activités ludiques complémentaires pour explorer les aspects culturels des langues." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="size-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <Check className="size-3" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Estimator CTA card */}
            <div className="lg:col-span-5 bg-brand-navy text-white rounded-3xl p-8 shadow-xl text-left border border-white/5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-lime">Calculateur de Niveau</span>
              <h4 className="text-lg font-bold mt-3 text-white">{"Prêt à démarrer l'aventure ?"}</h4>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {"Le nombre de places par groupe d'âge est strictement limité à 8. Effectuez votre test d'orientation gratuit dès maintenant pour sécuriser votre créneau."}
              </p>
              <TestModalTrigger className="w-full">
                <Button className="mt-8 w-full bg-brand-lime text-brand-navy hover:bg-brand-lime-dark border-none font-bold rounded-full py-5 text-xs shadow-md cursor-pointer">
                  Commencer mon test gratuit &rarr;
                </Button>
              </TestModalTrigger>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
