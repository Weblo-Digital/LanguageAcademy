import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, 
  GraduationCap, 
  Users, 
  Award, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Mail,
  Phone,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageCard } from "@/components/shared/LanguageCard";
import { AgeProgramTabs } from "@/components/client/AgeProgramTabs";
import { LevelTestWidget } from "@/components/client/LevelTestWidget";
import { TestModalTrigger } from "@/components/client/TestModalTrigger";
import { Translated } from "@/components/client/Translated";
import { homeTranslations } from "@/lib/translations/home";
import { galleryColumn1, galleryColumn2, galleryColumn3 } from "@/lib/data/homepage";

import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const defaults = {
    title: "Next Point Academy | Cours de langues premium à Casablanca",
    description: "Programmes d'excellence en langues étrangères et préparation aux examens internationaux. Anglais, Français, Espagnol, Arabe. Habilité par le CECRL.",
    openGraph: {
      title: "Next Point Academy | Cours de langues premium",
      description: "Programmes d'excellence en langues étrangères et préparation aux examens internationaux.",
      images: ["/images/hero-student.jpg"],
      locale: "fr_MA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Next Point Academy | Cours de langues premium",
      description: "Programmes d'excellence en langues étrangères et préparation aux examens internationaux.",
      images: ["/images/hero-student.jpg"],
    },
    alternates: {
      canonical: "https://nextpoint.ma",
    },
  };
  return getPageMetadata("/", defaults);
}

export default function HomePage() {
  const fr = homeTranslations.fr;
  const en = homeTranslations.en;

  return (
    <div className="bg-white min-h-screen text-slate-700 font-sans selection:bg-brand-lime selection:text-brand-navy">
      
      {/* 1. Value-Driven Hero Section */}
      <section className="relative w-full bg-brand-navy h-screen min-h-[650px] flex flex-col justify-center overflow-hidden border-b border-slate-800 pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Kuvituskuva-englanti-helao-1536x1024.webp"
            alt="Classroom background"
            fill
            priority
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/75 via-45% to-transparent" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 relative z-10 text-left flex flex-col items-start">
          
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-2 text-xs font-bold text-white mb-8 shadow-3xs">
            <ShieldCheck className="size-4 text-brand-lime" />
            <span><Translated fr={fr.heroBadge} en={en.heroBadge} /></span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6 max-w-4xl">
            <Translated fr={fr.heroTitle1} en={en.heroTitle1} /> <br />
            <span className="text-brand-lime"><Translated fr={fr.heroTitle2} en={en.heroTitle2} /></span> <br />
            <Translated fr={fr.heroTitle3} en={en.heroTitle3} />
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-semibold max-w-2xl leading-relaxed mb-10">
            <Translated fr={fr.heroSubhead} en={en.heroSubhead} />
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 mb-0 relative z-30 w-full sm:w-auto">
            <TestModalTrigger>
              <Button
                className="w-full sm:w-auto h-12 bg-brand-lime text-brand-navy hover:bg-brand-lime-dark border-none font-extrabold rounded-full pl-6 pr-2 flex items-center justify-between gap-3 shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span className="text-xs tracking-wide"><Translated fr={fr.heroPrimaryCTA} en={en.heroPrimaryCTA} /></span>
                <div className="size-8 rounded-full bg-brand-navy text-brand-lime flex items-center justify-center shrink-0">
                  <ArrowUpRight className="size-4" />
                </div>
              </Button>
            </TestModalTrigger>
            <Link href="#programs" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full h-12 bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30 font-extrabold rounded-full pl-6 pr-2 flex items-center justify-between gap-3 transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <span className="text-xs tracking-wide"><Translated fr={fr.heroSecondaryCTA} en={en.heroSecondaryCTA} /></span>
                <div className="size-8 rounded-full bg-white text-brand-navy flex items-center justify-center shrink-0">
                  <ArrowUpRight className="size-4" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Interactive Level Test Widget */}
      <LevelTestWidget />

      {/* 3. Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-current" aria-hidden="true" />
                ))}
                <span className="sr-only">Note: 5 étoiles</span>
              </div>
              <h3 className="text-3xl font-extrabold text-brand-navy tracking-tight leading-tight">
                <Translated fr={fr.socialProofStars} en={en.socialProofStars} />
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                <Translated fr={fr.socialProofGoogle} en={en.socialProofGoogle} />
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="bg-brand-warm-white border border-slate-100 rounded-xl p-3 text-center min-w-[100px]">
                  <span className="text-xl font-black text-brand-navy">4.9</span>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                    <Translated fr={fr.socialProofScore} en={en.socialProofScore} />
                  </p>
                </div>
                <div className="bg-brand-warm-white border border-slate-100 rounded-xl p-3 text-center min-w-[100px]">
                  <span className="text-xl font-black text-brand-navy">98%</span>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                    <Translated fr={fr.socialProofSat} en={en.socialProofSat} />
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-brand-warm-white p-6 rounded-2xl border border-slate-100 space-y-4 relative text-left">
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  <Translated fr={fr.testimonialSofia} en={en.testimonialSofia} />
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-200 relative overflow-hidden">
                    <Image src="/images/global/about1.jpg" alt="Student Sofia" fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-navy">Sofia Benjelloun</h5>
                    <p className="text-[10px] text-slate-400 font-medium">
                      <Translated fr={fr.testimonialSofiaRole} en={en.testimonialSofiaRole} />
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-warm-white p-6 rounded-2xl border border-slate-100 space-y-4 relative text-left">
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  <Translated fr={fr.testimonialKarim} en={en.testimonialKarim} />
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-200 relative overflow-hidden">
                    <Image src="/images/global/cta-thumb.webp" alt="Client Karim" fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-navy">Karim Alami</h5>
                    <p className="text-[10px] text-slate-400 font-medium">
                      <Translated fr={fr.testimonialKarimRole} en={en.testimonialKarimRole} />
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Why Choose Section */}
      <section className="py-20 bg-brand-warm-white border-t border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3.5 py-2 rounded-full border border-[#A7F3D0]/30 inline-block">
              <Translated fr={fr.whyBadge} en={en.whyBadge} />
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-4">
              <Translated fr={fr.whyTitle} en={en.whyTitle} />
            </h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              <Translated fr={fr.whySub} en={en.whySub} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="size-6 text-[#057A55]" />,
                title: <Translated fr={fr.whyCard1Title} en={en.whyCard1Title} />,
                desc: <Translated fr={fr.whyCard1Desc} en={en.whyCard1Desc} />
              },
              {
                icon: <GraduationCap className="size-6 text-[#057A55]" />,
                title: <Translated fr={fr.whyCard2Title} en={en.whyCard2Title} />,
                desc: <Translated fr={fr.whyCard2Desc} en={en.whyCard2Desc} />
              },
              {
                icon: <Award className="size-6 text-[#057A55]" />,
                title: <Translated fr={fr.whyCard3Title} en={en.whyCard3Title} />,
                desc: <Translated fr={fr.whyCard3Desc} en={en.whyCard3Desc} />
              },
              {
                icon: <Clock className="size-6 text-[#057A55]" />,
                title: <Translated fr={fr.whyCard4Title} en={en.whyCard4Title} />,
                desc: <Translated fr={fr.whyCard4Desc} en={en.whyCard4Desc} />
              },
              {
                icon: <MapPin className="size-6 text-[#057A55]" />,
                title: <Translated fr={fr.whyCard5Title} en={en.whyCard5Title} />,
                desc: <Translated fr={fr.whyCard5Desc} en={en.whyCard5Desc} />
              },
              {
                icon: <ShieldCheck className="size-6 text-[#057A55]" />,
                title: <Translated fr={fr.whyCard6Title} en={en.whyCard6Title} />,
                desc: <Translated fr={fr.whyCard6Desc} en={en.whyCard6Desc} />
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-3xs transition-all duration-300 hover:shadow-md hover:border-[#057A55]/20 hover:-translate-y-1 text-left">
                <div className="size-12 rounded-2xl bg-[#E6F4EA] flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-navy tracking-tight">{card.title}</h3>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Auto-Scrolling Gallery Section */}
      <section className="py-24 bg-brand-warm-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3.5 py-2 rounded-full border border-[#A7F3D0]/30 inline-block">
              <Translated fr={fr.communityBadge} en={en.communityBadge} />
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-brand-navy leading-tight tracking-tight">
              <Translated fr={fr.communityTitle1} en={en.communityTitle1} /> <br />
              <Translated fr={fr.communityTitle2} en={en.communityTitle2} />
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              <Translated fr={fr.communityDesc} en={en.communityDesc} />
            </p>
            <div className="pt-2">
              <TestModalTrigger>
                <Button className="bg-brand-lime text-brand-navy hover:bg-brand-lime-dark font-bold rounded-xl px-8 py-6 text-xs shadow-sm flex items-center gap-2 group/btn cursor-pointer border-none">
                  <Translated fr={fr.communityCTA} en={en.communityCTA} />
                  <ArrowRight className="size-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
              </TestModalTrigger>
            </div>
          </div>

          <div className="lg:col-span-7 relative h-[480px] overflow-hidden grid grid-cols-3 gap-4">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-brand-warm-white to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-brand-warm-white to-transparent z-20 pointer-events-none" />

            {/* Column 1 */}
            <div className="flex flex-col gap-4 animate-scroll-up">
              {galleryColumn1.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200/50 shadow-3xs">
                  <Image src={src} alt="Student activity" fill sizes="(max-width: 600px) 30vw, 15vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 animate-scroll-down">
              {galleryColumn2.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200/50 shadow-3xs">
                  <Image src={src} alt="Student community" fill sizes="(max-width: 600px) 30vw, 15vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4 animate-scroll-up">
              {galleryColumn3.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200/50 shadow-3xs">
                  <Image src={src} alt="Student learning" fill sizes="(max-width: 600px) 30vw, 15vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Programs by Age (Interactive Tabs) */}
      <AgeProgramTabs />

      {/* 7. Languages Offered Section */}
      <section className="py-24 bg-brand-warm-white border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3.5 py-2 rounded-full border border-[#A7F3D0]/30 inline-block">
              <Translated fr={fr.languageBadge} en={en.languageBadge} />
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-4">
              <Translated fr={fr.languageTitle} en={en.languageTitle} />
            </h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              <Translated fr={fr.languageSub} en={en.languageSub} />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <LanguageCard
              image="/images/flags/uk.jpg"
              imageAlt="English"
              title="English"
              description={fr.langEnglishDesc}
              href="/langues/anglais"
              courseBadge={languageTranslationsFR_EN("COURS DE LANGUE", "LANGUAGE COURSE")}
              levelsText={languageTranslationsFR_EN("Niveaux : A1 à C2", "Levels: A1 to C2")}
              exploreText={languageTranslationsFR_EN("En savoir plus", "Learn more")}
            />
            <LanguageCard
              image="/images/flags/france.jpg"
              imageAlt="Français"
              title="Français"
              description={fr.langFrenchDesc}
              href="/langues/francais"
              courseBadge={languageTranslationsFR_EN("COURS DE LANGUE", "LANGUAGE COURSE")}
              levelsText={languageTranslationsFR_EN("Niveaux : A1 à C2", "Levels: A1 to C2")}
              exploreText={languageTranslationsFR_EN("En savoir plus", "Learn more")}
            />
            <LanguageCard
              image="/images/flags/spain.jpg"
              imageAlt="Espagnol"
              title="Espagnol"
              description={fr.langSpanishDesc}
              href="/langues/espagnol"
              courseBadge={languageTranslationsFR_EN("COURS DE LANGUE", "LANGUAGE COURSE")}
              levelsText={languageTranslationsFR_EN("Niveaux : A1 à C2", "Levels: A1 to C2")}
              exploreText={languageTranslationsFR_EN("En savoir plus", "Learn more")}
            />
            <LanguageCard
              image="/images/flags/morocco.jpg"
              imageAlt="Arabe"
              title="Arabe"
              description={fr.langArabicDesc}
              href="/langues/arabe"
              courseBadge={languageTranslationsFR_EN("COURS DE LANGUE", "LANGUAGE COURSE")}
              levelsText={languageTranslationsFR_EN("Niveaux : A1 à C2", "Levels: A1 to C2")}
              exploreText={languageTranslationsFR_EN("En savoir plus", "Learn more")}
            />
          </div>
        </div>
      </section>

      {/* 8. Academic Programs Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 text-center lg:text-left">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3 py-1.5 rounded-full border border-[#A7F3D0]/30">
                <Translated fr={fr.academicBadge} en={en.academicBadge} />
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-4 relative w-fit mx-auto lg:mx-0 pb-2">
                <Translated fr={fr.academicTitle} en={en.academicTitle} />
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-brand-lime" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M 0,5 C 20,2 80,8 100,5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </svg>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: fr.academicSubtitle1, subtitle: fr.academicDesc1, image: "/images/global/about-img.png" },
              { title: fr.academicSubtitle2, subtitle: fr.academicDesc2, image: "/images/global/banner1.jpg" },
              { title: fr.academicSubtitle3, subtitle: fr.academicDesc3, image: "/images/global/cta-thumb.webp" },
              { title: fr.academicSubtitle4, subtitle: fr.academicDesc4, image: "/images/global/about1.jpg" }
            ].map((program, idx) => (
              <div key={idx} className="group relative block rounded-3xl overflow-visible h-[360px] cursor-pointer">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-border/70 z-0">
                  <Image src={program.image} alt={program.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/45 to-transparent z-10 transition-opacity duration-300 group-hover:from-brand-navy/95 group-hover:via-brand-navy/50" />
                </div>
                <div className="absolute bottom-8 left-6 right-6 z-10 text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight">{program.title}</h3>
                  <p className="text-xs text-white/80 font-medium mt-1">{program.subtitle}</p>
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 size-10 rounded-full bg-brand-lime border-4 border-white flex items-center justify-center text-brand-navy shadow-sm transition-transform group-hover:scale-115 group-hover:rotate-45 z-20">
                  <ArrowUpRight className="size-4.5" strokeWidth={3} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Summer Smart Camp Promo Section */}
      <section className="py-20 bg-brand-warm-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[2.5rem] text-white relative overflow-hidden shadow-lg border border-slate-800 min-h-[480px] flex items-center">
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/global/banner1.jpg" 
                alt="Summer Smart Camp" 
                fill 
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy via-brand-navy/85 to-transparent z-10" />
            </div>

            <div className="absolute inset-0 opacity-5 select-none pointer-events-none z-20">
              <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-30 text-left p-8 sm:p-12 md:p-16 w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-lime text-brand-navy px-3.5 py-1.5 rounded-full">
                    Summer Smart Camp
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Camps d&apos;Été Linguistiques
                </h2>

                <p className="text-sm text-slate-200 leading-relaxed max-w-xl">
                  Offrez à vos enfants une expérience immersive inoubliable ! Le Summer Smart Camp combine apprentissage intensif de l&apos;anglais ou du français, ateliers artistiques, théâtre, sport et développement personnel dans un cadre sécurisé et bienveillant.
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brand-lime" /> Immersion 100% active et ludique
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brand-lime" /> Animateurs natifs et certifiés
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brand-lime" /> Ateliers de Storytelling &amp; Théâtre
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brand-lime" /> Groupes réduits (max 8 enfants)
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
                <div className="bg-brand-navy/40 backdrop-blur-xs border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 max-w-sm w-full">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-white">Inscriptions de Saison</h4>
                    <p className="text-xs text-slate-300">Les réservations sont limitées pour garantir un encadrement optimal de chaque participant.</p>
                  </div>

                  <Link href="/camps-ete" className="block w-full">
                    <Button 
                      className="w-full bg-brand-lime text-brand-navy hover:bg-brand-lime-dark border-none font-bold rounded-xl py-6 text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      Découvrir le programme &amp; S&apos;inscrire &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Locations/Contact Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3.5 py-2 rounded-full border border-[#A7F3D0]/30 inline-block">
              {languageTranslationsFR_EN("Contact & Campus", "Contact & Campuses")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-4">
              {languageTranslationsFR_EN("Nos campus au Maroc", "Our Campuses in Morocco")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Contact Information */}
            <div className="bg-brand-warm-white p-8 sm:p-10 rounded-3xl border border-slate-100 text-left flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-brand-emerald/10 text-[#057A55] px-2.5 py-1 rounded">
                  {languageTranslationsFR_EN("Coordonnées", "Get In Touch")}
                </span>
                <h3 className="text-xl font-bold text-brand-navy mt-4">
                  {languageTranslationsFR_EN("Next Point Academy Maroc", "Next Point Academy Morocco")}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {languageTranslationsFR_EN(
                    "Besoin d'informations ou de réserver un test ? Contactez notre secrétariat directement.", 
                    "Need information or want to book a placement test? Speak directly to our administration."
                  )}
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 font-semibold">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-[#057A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-navy">
                      {languageTranslationsFR_EN("Notre Adresse", "Our Address")}
                    </p>
                    <p className="text-slate-500 mt-0.5">rue ibnou katir, résidence les perles de casablanca n1</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-[#057A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-navy">
                      {languageTranslationsFR_EN("Téléphone / WhatsApp", "Phone / WhatsApp")}
                    </p>
                    <p className="text-slate-500 mt-0.5">
                      <a href="tel:+212663068618" className="hover:underline text-slate-500">+212 6 63 06 86 18</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-[#057A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-navy">Email</p>
                    <p className="text-slate-500 mt-0.5">
                      <a href="mailto:contact@nextpoint.ma" className="hover:underline text-slate-500">contact@nextpoint.ma</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-[#057A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-brand-navy">
                      {languageTranslationsFR_EN("Horaires d'ouverture", "Opening Hours")}
                    </p>
                    <p className="text-slate-500 mt-0.5">
                      {languageTranslationsFR_EN("Lundi au Samedi : 10:00 - 21:00", "Monday to Saturday: 10:00 AM - 9:00 PM")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Map Location */}
            <div className="bg-brand-warm-white p-2 rounded-3xl border border-slate-100 h-[400px] sm:h-auto min-h-[350px] relative overflow-hidden shadow-xs">
              <iframe 
                title="Localisation de Next Point Academy sur Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9575971439247!2d-7.63606772422501!3d33.58043687333798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d297ce1d9539%3A0xe54e3d36b85cf7eb!2sMaarif%2C%20Casablanca!5e0!3m2!1sen!2sma!4v1689230000000!5m2!1sen!2sma" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="w-full h-full rounded-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Blog Section */}
      <section id="blog" className="py-20 bg-brand-warm-white border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#057A55]"><Translated fr={fr.blogBadge} en={en.blogBadge} /></span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-4">
                <Translated fr={fr.blogTitle} en={en.blogTitle} />
              </h2>
            </div>
            <Link href="#blog">
              <Button className="bg-brand-lime text-brand-navy hover:bg-brand-lime-dark font-bold rounded-full px-6 py-5 text-xs border-none cursor-pointer">
                <Translated fr={fr.blogButton} en={en.blogButton} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: <Translated fr={fr.blogPost1Title} en={en.blogPost1Title} />,
                image: "/images/blog/ielts-prep.jpg",
                tag: <Translated fr={fr.blogPost1Tag} en={en.blogPost1Tag} />,
                date: languageTranslationsFR_EN("10 Janvier 2026", "January 10, 2026")
              },
              {
                title: <Translated fr={fr.blogPost2Title} en={en.blogPost2Title} />,
                image: "/images/blog/kids-learning.jpg",
                tag: <Translated fr={fr.blogPost2Tag} en={en.blogPost2Tag} />,
                date: languageTranslationsFR_EN("12 Février 2026", "February 12, 2026")
              },
              {
                title: <Translated fr={fr.blogPost3Title} en={en.blogPost3Title} />,
                image: "/images/blog/business-morocco.jpg",
                tag: <Translated fr={fr.blogPost3Tag} en={en.blogPost3Tag} />,
                date: languageTranslationsFR_EN("1 Mars 2026", "March 01, 2026")
              }
            ].map((post, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:border-[#057A55]/20 transition-all duration-300 text-left flex flex-col justify-between">
                <div className="relative h-[200px] w-full">
                  <Image src={post.image} alt="Blog post cover" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute top-4 left-4 bg-brand-navy text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded">
                    {post.tag}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <span className="text-[10px] font-bold text-slate-400">{post.date}</span>
                  <h4 className="text-sm font-bold text-brand-navy leading-snug tracking-tight">
                    {post.title}
                  </h4>
                  <Link href="#blog" className="text-xs font-bold text-[#057A55] hover:underline inline-flex items-center gap-1.5">
                    <Translated fr={fr.blogReadMore} en={en.blogReadMore} /> <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// Simple helper component to translate text inside Server Components (SSR-safe, returns Translated client element)
function languageTranslationsFR_EN(frText: string, enText: string) {
  return <Translated fr={frText} en={enText} />;
}
