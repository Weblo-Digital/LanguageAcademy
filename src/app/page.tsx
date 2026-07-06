"use client";

import { useState } from "react";
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
  Phone,
  Mail,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLevelTest } from "@/context/LevelTestContext";
import { useLanguage } from "@/context/LanguageContext";
import { homeTranslations, ageProgramsTranslations } from "@/lib/translations";

export default function HomePage() {
  const { openTestModal } = useLevelTest();
  const { language } = useLanguage();
  
  const t = homeTranslations[language];
  const ageProgramsData = ageProgramsTranslations[language];
  const [selectedAge, setSelectedAge] = useState<keyof typeof ageProgramsData>("kids");

  // State for the interactive test widget
  const [widgetLang, setWidgetLang] = useState("");
  const [widgetLevel, setWidgetLevel] = useState("");

  const handleWidgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openTestModal();
  };

  return (
    <div className="bg-white min-h-screen text-slate-700 font-sans selection:bg-[#BEF264] selection:text-[#0F1E43]">
      
      {/* 1. Value-Driven Hero Section */}
      <section className="relative w-full bg-[#0F1E43] pt-36 pb-20 overflow-hidden border-b border-slate-800">
        {/* Hero Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Kuvituskuva-englanti-helao-1536x1024.webp"
            alt="Classroom background"
            fill
            priority
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E43] via-[#0F1E43]/80 to-[#0F1E43]/30" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 relative z-10 text-center">
          
          {/* Tagline / Trust Indicator */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-2 text-xs font-bold text-white mb-8 shadow-3xs">
            <ShieldCheck className="size-4 text-[#BEF264]" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6 max-w-4xl mx-auto">
            {t.heroTitle1} <br />
            <span className="text-[#BEF264]">{t.heroTitle2}</span> <br />
            {t.heroTitle3}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-semibold max-w-2xl mx-auto leading-relaxed mb-10">
            {t.heroSubhead}
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 max-w-md mx-auto relative z-30">
            <Button
              onClick={openTestModal}
              className="w-full sm:w-auto bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] border-none font-bold rounded-xl px-8 py-6 text-xs shadow-md transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
            >
              {t.heroPrimaryCTA}
            </Button>
            <Link href="#programs" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30 font-bold rounded-xl px-8 py-6 text-xs transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                {t.heroSecondaryCTA}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5.5 Interactive Level Test Widget (Mini diagnostic form) - Moved after Hero */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          <div className="bg-[#0F1E43] text-white p-8 lg:p-16 rounded-[2.5rem] relative overflow-hidden shadow-lg">
            
            <div className="absolute inset-0 opacity-5 select-none pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Column Text */}
              <div className="lg:col-span-5 text-left space-y-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#BEF264] bg-white/5 border border-white/10 px-3 py-1 rounded">
                  {t.testBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {t.testTitle}
                </h2>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t.testSub}
                </p>
              </div>

              {/* Right Column Interactive Widget */}
              <div className="lg:col-span-7 bg-white text-[#0F1E43] p-6 lg:p-8 rounded-3xl shadow-sm w-full">
                <form onSubmit={handleWidgetSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Select Language */}
                    <div className="flex flex-col text-left space-y-1.5">
                      <label htmlFor="widget-lang" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Language / Langue</label>
                      <select 
                        id="widget-lang" 
                        value={widgetLang}
                        onChange={(e) => setWidgetLang(e.target.value)}
                        required
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#0F1E43] font-bold outline-none cursor-pointer focus:border-[#057A55]"
                      >
                        <option value="" disabled>{t.testPlaceholderLang}</option>
                        <option value="en">{t.testLangEnglish}</option>
                        <option value="fr">{t.testLangFrench}</option>
                        <option value="es">{t.testLangSpanish}</option>
                        <option value="ar">{t.testLangArabic}</option>
                      </select>
                    </div>

                    {/* Select Level */}
                    <div className="flex flex-col text-left space-y-1.5">
                      <label htmlFor="widget-level" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Level / Niveau</label>
                      <select 
                        id="widget-level"
                        value={widgetLevel}
                        onChange={(e) => setWidgetLevel(e.target.value)}
                        required
                        className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-[#0F1E43] font-bold outline-none cursor-pointer focus:border-[#057A55]"
                      >
                        <option value="" disabled>{t.testPlaceholderLevel}</option>
                        <option value="beg">{t.testLevelBeginner}</option>
                        <option value="int">{t.testLevelIntermediate}</option>
                        <option value="adv">{t.testLevelAdvanced}</option>
                        <option value="unsure">{t.testLevelNotSure}</option>
                      </select>
                    </div>

                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] font-bold rounded-xl py-6 text-xs transition-colors duration-200 cursor-pointer shadow-md"
                  >
                    {t.testButton}
                  </Button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2.5 Social Proof Review Summary Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Google reviews summary */}
            <div className="lg:col-span-5 text-left space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <h3 className="text-3xl font-extrabold text-[#0F1E43] tracking-tight leading-tight">
                {t.socialProofStars}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {t.socialProofGoogle}
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="bg-[#FAF8F5] border border-slate-100 rounded-xl p-3 text-center min-w-[100px]">
                  <span className="text-xl font-black text-[#0F1E43]">4.9</span>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">{t.socialProofScore}</p>
                </div>
                <div className="bg-[#FAF8F5] border border-slate-100 rounded-xl p-3 text-center min-w-[100px]">
                  <span className="text-xl font-black text-[#0F1E43]">98%</span>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">{t.socialProofSat}</p>
                </div>
              </div>
            </div>

            {/* Right: Social proof cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-slate-100 space-y-4 relative">
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  {t.testimonialSofia}
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-200 relative overflow-hidden">
                    <Image src="/images/global/about1.jpg" alt="Student Sofia" fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0F1E43]">Sofia Benjelloun</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{t.testimonialSofiaRole}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-slate-100 space-y-4 relative">
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  {t.testimonialKarim}
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-slate-200 relative overflow-hidden">
                    <Image src="/images/global/cta-thumb.webp" alt="Client Karim" fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#0F1E43]">Karim Alami</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{t.testimonialKarimRole}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Choose Next Point Academy */}
      <section className="py-20 bg-[#FAF8F5] border-t border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3.5 py-2 rounded-full border border-[#A7F3D0]/30 inline-block">
              {t.whyBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E43] tracking-tight mt-4">
              {t.whyTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              {t.whySub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="size-6 text-[#057A55]" />,
                title: t.whyCard1Title,
                desc: t.whyCard1Desc
              },
              {
                icon: <GraduationCap className="size-6 text-[#057A55]" />,
                title: t.whyCard2Title,
                desc: t.whyCard2Desc
              },
              {
                icon: <Award className="size-6 text-[#057A55]" />,
                title: t.whyCard3Title,
                desc: t.whyCard3Desc
              },
              {
                icon: <Clock className="size-6 text-[#057A55]" />,
                title: t.whyCard4Title,
                desc: t.whyCard4Desc
              },
              {
                icon: <MapPin className="size-6 text-[#057A55]" />,
                title: t.whyCard5Title,
                desc: t.whyCard5Desc
              },
              {
                icon: <ShieldCheck className="size-6 text-[#057A55]" />,
                title: t.whyCard6Title,
                desc: t.whyCard6Desc
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-3xs transition-all duration-300 hover:shadow-md hover:border-[#057A55]/20 hover:-translate-y-1">
                <div className="size-12 rounded-2xl bg-[#E6F4EA] flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0F1E43] tracking-tight">{card.title}</h3>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3.5. Staggered Auto-Scrolling Gallery Section */}
      <section className="py-24 bg-[#FAF8F5] border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text & CTAs */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3.5 py-2 rounded-full border border-[#A7F3D0]/30 inline-block">
              {t.communityBadge}
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0F1E43] leading-tight tracking-tight">
              {t.communityTitle1} <br />
              {t.communityTitle2}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              {t.communityDesc}
            </p>
            <div className="pt-2">
              <Button onClick={openTestModal} className="bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] font-bold rounded-xl px-8 py-6 text-xs shadow-sm flex items-center gap-2 group/btn cursor-pointer">
                {t.communityCTA}
                <ArrowRight className="size-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right: Scrolling Images Grid */}
          <div className="lg:col-span-7 relative h-[480px] overflow-hidden grid grid-cols-3 gap-4">
            
            {/* Top Fade Gradient */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#FAF8F5] to-transparent z-20 pointer-events-none" />
            
            {/* Bottom Fade Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#FAF8F5] to-transparent z-20 pointer-events-none" />

            {/* Column 1 (Scrolls Up) */}
            <div className="flex flex-col gap-4 animate-scroll-up">
              {[
                "/images/global/about1.jpg",
                "/images/global/banner1.jpg",
                "/images/global/cta-thumb.webp",
                "/images/global/about1.jpg",
                "/images/global/banner1.jpg",
                "/images/global/cta-thumb.webp"
              ].map((src, i) => (
                <div key={i} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200/50 shadow-3xs">
                  <Image src={src} alt="Student activity" fill sizes="(max-width: 600px) 30vw, 15vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* Column 2 (Scrolls Down) */}
            <div className="flex flex-col gap-4 animate-scroll-down">
              {[
                "/images/global/about-img.png",
                "/images/summer-camp.jpg",
                "/images/hero-student.jpg",
                "/images/global/about-img.png",
                "/images/summer-camp.jpg",
                "/images/hero-student.jpg"
              ].map((src, i) => (
                <div key={i} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200/50 shadow-3xs">
                  <Image src={src} alt="Student community" fill sizes="(max-width: 600px) 30vw, 15vw" className="object-cover" />
                </div>
              ))}
            </div>

            {/* Column 3 (Scrolls Up) */}
            <div className="flex flex-col gap-4 animate-scroll-up">
              {[
                "/images/individual-lessons.jpg",
                "/images/student-ok.jpg",
                "/images/global/about1.jpg",
                "/images/individual-lessons.jpg",
                "/images/student-ok.jpg",
                "/images/global/about1.jpg"
              ].map((src, i) => (
                <div key={i} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200/50 shadow-3xs">
                  <Image src={src} alt="Student learning" fill sizes="(max-width: 600px) 30vw, 15vw" className="object-cover" />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Programs by Age (Primary Homepage Navigation) */}
      <section id="programs" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55]">{t.programsBadge}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E43] tracking-tight mt-4">
              {t.programsTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              {t.programsSub}
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-100 pb-6">
            {(Object.keys(ageProgramsData) as Array<keyof typeof ageProgramsData>).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedAge(key)}
                className={`px-5 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${selectedAge === key ? "bg-[#0F1E43] text-white shadow-sm" : "bg-slate-50 text-[#0F1E43] hover:bg-slate-100"}`}
              >
                {ageProgramsData[key].title.split(" (")[0]}
              </button>
            ))}
          </div>

          {/* Display category details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FAF8F5] p-8 lg:p-12 rounded-[2.5rem] border border-slate-100">
            {/* Left Copy */}
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F1E43] bg-slate-200/50 px-3 py-1 rounded">
                {ageProgramsData[selectedAge].highlight}
              </span>
              <h3 className="text-2xl font-black text-[#0F1E43] tracking-tight leading-tight">
                {ageProgramsData[selectedAge].title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {ageProgramsData[selectedAge].desc}
              </p>
              <div className="pt-4">
                <Button onClick={openTestModal} className="bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] text-xs font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer">
                  {t.programsCTA}
                </Button>
              </div>
            </div>

            {/* Right Course Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {ageProgramsData[selectedAge].courses.map((course, idx) => (
                <div 
                  key={idx} 
                  onClick={openTestModal}
                  className="group bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between hover:bg-[#BEF264] hover:border-[#BEF264] hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#0F1E43] tracking-tight transition-colors">{course.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 group-hover:text-[#0F1E43]/80 transition-colors">{course.details}</p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openTestModal();
                      }}
                      className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-[#0F1E43] transition-all cursor-pointer"
                    >
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Clean Languages Offered Section (Restricted to English, French, Spanish, Arabic) */}
      <section className="py-24 bg-[#FAF8F5] border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3.5 py-2 rounded-full border border-[#A7F3D0]/30 inline-block">
              {t.languageBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E43] tracking-tight mt-4">
              {t.languageTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              {t.languageSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* English */}
            <div className="relative rounded-3xl border border-slate-100 overflow-hidden min-h-[320px] transition-all duration-300 hover:shadow-md group flex flex-col justify-between p-8 bg-white">
              {/* Sliding Flag on Hover */}
              <div className="absolute inset-0 z-0 transform -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none">
                <Image 
                  src="/images/flags/uk.jpg" 
                  alt="English flag background" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-15 grayscale"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <span className="text-3xl filter drop-shadow-xs">🇬🇧</span>
                  <h3 className="text-lg font-bold text-[#0F1E43] mt-4">English</h3>
                  <span className="text-[10px] text-slate-500 font-extrabold block mt-1">{t.levelsOffered}</span>
                  <p className="text-xs text-slate-600 mt-3.5 leading-relaxed font-semibold">{t.langEnglishDesc}</p>
                </div>
                <Link href="/langues/anglais" className="text-xs font-bold text-[#057A55] hover:underline inline-flex items-center gap-1 mt-6">
                  {t.langExplore} <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>

            {/* French */}
            <div className="relative rounded-3xl border border-slate-100 overflow-hidden min-h-[320px] transition-all duration-300 hover:shadow-md group flex flex-col justify-between p-8 bg-white">
              {/* Sliding Flag on Hover */}
              <div className="absolute inset-0 z-0 transform -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none">
                <Image 
                  src="/images/flags/france.jpg" 
                  alt="French flag background" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-15 grayscale"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <span className="text-3xl filter drop-shadow-xs">🇫🇷</span>
                  <h3 className="text-lg font-bold text-[#0F1E43] mt-4">Français</h3>
                  <span className="text-[10px] text-slate-500 font-extrabold block mt-1">{t.levelsOffered}</span>
                  <p className="text-xs text-slate-600 mt-3.5 leading-relaxed font-semibold">{t.langFrenchDesc}</p>
                </div>
                <Link href="/langues/francais" className="text-xs font-bold text-[#057A55] hover:underline inline-flex items-center gap-1 mt-6">
                  {t.langExplore} <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>

            {/* Spanish */}
            <div className="relative rounded-3xl border border-slate-100 overflow-hidden min-h-[320px] transition-all duration-300 hover:shadow-md group flex flex-col justify-between p-8 bg-white">
              {/* Sliding Flag on Hover */}
              <div className="absolute inset-0 z-0 transform -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none">
                <Image 
                  src="/images/flags/spain.jpg" 
                  alt="Spanish flag background" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-15 grayscale"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <span className="text-3xl filter drop-shadow-xs">🇪🇸</span>
                  <h3 className="text-lg font-bold text-[#0F1E43] mt-4">Espagnol</h3>
                  <span className="text-[10px] text-slate-500 font-extrabold block mt-1">{t.levelsOffered}</span>
                  <p className="text-xs text-slate-600 mt-3.5 leading-relaxed font-semibold">{t.langSpanishDesc}</p>
                </div>
                <Link href="/langues/espagnol" className="text-xs font-bold text-[#057A55] hover:underline inline-flex items-center gap-1 mt-6">
                  {t.langExplore} <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>

            {/* Arabic */}
            <div className="relative rounded-3xl border border-slate-100 overflow-hidden min-h-[320px] transition-all duration-300 hover:shadow-md group flex flex-col justify-between p-8 bg-white">
              {/* Sliding Flag on Hover */}
              <div className="absolute inset-0 z-0 transform -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none">
                <Image 
                  src="/images/flags/morocco.jpg" 
                  alt="Moroccan flag background" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-15 grayscale"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-full w-full">
                <div>
                  <span className="text-3xl filter drop-shadow-xs">🇲🇦</span>
                  <h3 className="text-lg font-bold text-[#0F1E43] mt-4">Arabe</h3>
                  <span className="text-[10px] text-slate-500 font-extrabold block mt-1">{t.levelsOffered}</span>
                  <p className="text-xs text-slate-600 mt-3.5 leading-relaxed font-semibold">{t.langArabicDesc}</p>
                </div>
                <Link href="/langues/arabe" className="text-xs font-bold text-[#057A55] hover:underline inline-flex items-center gap-1 mt-6">
                  {t.langExplore} <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 6. Academic Programs Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6 text-center lg:text-left">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3 py-1.5 rounded-full border border-[#A7F3D0]/30">
                {t.academicBadge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E43] tracking-tight mt-4 relative w-fit mx-auto lg:mx-0 pb-2">
                {t.academicTitle}
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#BEF264]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M 0,5 C 20,2 80,8 100,5" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </svg>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t.academicSubtitle1, subtitle: t.academicDesc1, image: "/images/global/about-img.png" },
              { title: t.academicSubtitle2, subtitle: t.academicDesc2, image: "/images/global/banner1.jpg" },
              { title: t.academicSubtitle3, subtitle: t.academicDesc3, image: "/images/global/cta-thumb.webp" },
              { title: t.academicSubtitle4, subtitle: t.academicDesc4, image: "/images/global/about1.jpg" }
            ].map((program, idx) => (
              <div key={idx} className="group relative block rounded-3xl overflow-visible h-[360px] cursor-pointer">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-border/70 z-0">
                  <Image src={program.image} alt={program.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E43]/90 via-[#0F1E43]/45 to-transparent z-10 transition-opacity duration-300 group-hover:from-[#0F1E43]/95 group-hover:via-[#0F1E43]/50" />
                </div>
                <div className="absolute bottom-8 left-6 right-6 z-10 text-left">
                  <h3 className="text-xl font-bold text-white tracking-tight">{program.title}</h3>
                  <p className="text-xs text-white/80 font-medium mt-1">{program.subtitle}</p>
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 size-10 rounded-full bg-[#BEF264] border-4 border-white flex items-center justify-center text-[#0F1E43] shadow-sm transition-transform group-hover:scale-115 group-hover:rotate-45 z-20">
                  <ArrowUpRight className="size-4.5" strokeWidth={3} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 7. Summer Smart Camp Special Promo Banner Section */}
      <section className="py-20 bg-[#FAF8F5] border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[2.5rem] text-white relative overflow-hidden shadow-lg border border-slate-800 min-h-[480px] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/images/global/banner1.jpg" 
                alt="Summer Smart Camp" 
                fill 
                sizes="100vw"
                className="object-cover"
              />
              {/* Overlay: covers bottom left and transparent in the top right (0% opacity) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F1E43] via-[#0F1E43]/85 to-transparent z-10" />
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 opacity-5 select-none pointer-events-none z-20">
              <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-30 text-left p-8 sm:p-12 md:p-16 w-full">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#BEF264] text-[#0F1E43] px-3.5 py-1.5 rounded-full">
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
                    <CheckCircle2 className="size-4 text-[#BEF264]" /> Immersion 100% active et ludique
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#BEF264]" /> Animateurs natifs et certifiés
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#BEF264]" /> Ateliers de Storytelling &amp; Théâtre
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-[#BEF264]" /> Groupes réduits (max 8 enfants)
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
                <div className="bg-[#0F1E43]/40 backdrop-blur-xs border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 max-w-sm w-full">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-white">Inscriptions de Saison</h4>
                    <p className="text-xs text-slate-300">Les réservations sont limitées pour garantir un encadrement optimal de chaque participant.</p>
                  </div>

                  <Link href="/camps-ete" className="block w-full">
                    <Button 
                      className="w-full bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] border-none font-bold rounded-xl py-6 text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
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


      {/* 8. Locations/Contact Section */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#057A55] bg-[#E6F4EA] px-3.5 py-2 rounded-full border border-[#A7F3D0]/30 inline-block">
              {language === "fr" ? "Contact & Campus" : "Contact & Campuses"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E43] tracking-tight mt-4">
              {language === "fr" ? "Nos campus au Maroc" : "Our Campuses in Morocco"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Contact Information */}
            <div className="bg-[#FAF8F5] p-8 sm:p-10 rounded-3xl border border-slate-100 text-left flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#057A55]/10 text-[#057A55] px-2.5 py-1 rounded">
                  {language === "fr" ? "Coordonnées" : "Get In Touch"}
                </span>
                <h3 className="text-xl font-bold text-[#0F1E43] mt-4">{language === "fr" ? "Next Point Academy Maroc" : "Next Point Academy Morocco"}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {language === "fr" 
                    ? "Besoin d'informations ou de réserver un test ? Contactez notre secrétariat directement." 
                    : "Need information or want to book a placement test? Speak directly to our administration."}
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 font-semibold">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-[#057A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0F1E43]">{language === "fr" ? "Campus Principal (Maarif)" : "Main Campus (Maarif)"}</p>
                    <p className="text-slate-500 mt-0.5">Rue Jafar El Barmaki, Maarif, Casablanca</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-[#057A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0F1E43]">{language === "fr" ? "Téléphone" : "Phone"}</p>
                    <p className="text-slate-500 mt-0.5">+212 522 99 88 77 (Maarif) / +212 522 11 22 33 (Sidi Maarouf)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-[#057A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0F1E43]">Email</p>
                    <p className="text-slate-500 mt-0.5">contact@nextpointacademy.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 text-[#057A55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0F1E43]">{language === "fr" ? "Horaires d'ouverture" : "Opening Hours"}</p>
                    <p className="text-slate-500 mt-0.5">Lundi au Samedi : 08:30 - 21:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Map Location */}
            <div className="bg-[#FAF8F5] p-2 rounded-3xl border border-slate-100 h-[400px] sm:h-auto min-h-[350px] relative overflow-hidden shadow-xs">
              <iframe 
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

      {/* 9. Blog - 3 Featured Articles Only */}
      <section id="blog" className="py-20 bg-[#FAF8F5] border-b border-slate-100">
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#057A55]">{t.blogBadge}</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1E43] tracking-tight mt-4">
                {t.blogTitle}
              </h2>
            </div>
            <Link href="#blog">
              <Button className="bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] font-bold rounded-full px-6 py-5 text-xs border-none cursor-pointer">
                {t.blogButton}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t.blogPost1Title,
                image: "/images/blog/ielts-prep.jpg",
                tag: t.blogPost1Tag,
                date: language === "fr" ? "10 Janvier 2026" : "January 10, 2026"
              },
              {
                title: t.blogPost2Title,
                image: "/images/blog/kids-learning.jpg",
                tag: t.blogPost2Tag,
                date: language === "fr" ? "12 Février 2026" : "February 12, 2026"
              },
              {
                title: t.blogPost3Title,
                image: "/images/blog/business-morocco.jpg",
                tag: t.blogPost3Tag,
                date: language === "fr" ? "1 Mars 2026" : "March 01, 2026"
              }
            ].map((post, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:border-[#057A55]/20 transition-all duration-300 text-left flex flex-col justify-between">
                <div className="relative h-[200px] w-full">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute top-4 left-4 bg-[#0F1E43] text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded">
                    {post.tag}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <span className="text-[10px] font-bold text-slate-400">{post.date}</span>
                  <h4 className="text-sm font-bold text-[#0F1E43] leading-snug tracking-tight">
                    {post.title}
                  </h4>
                  <Link href="#blog" className="text-xs font-bold text-[#057A55] hover:underline inline-flex items-center gap-1.5">
                    {t.blogReadMore} <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA Conversion Section */}
      <section className="py-24 bg-[#0F1E43] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 select-none pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 relative z-10 text-center space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#BEF264] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            {t.finalCTABadge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {t.finalCTATitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mx-auto">
            {t.finalCTADesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4 relative z-30">
            <Button
              onClick={openTestModal}
              className="w-full sm:w-auto bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] border-none font-bold rounded-xl px-8 py-6 text-xs shadow-md cursor-pointer"
            >
              {t.finalCTAPrimary}
            </Button>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full bg-white/5 text-white border-white/20 hover:bg-white/10 font-bold rounded-xl px-8 py-6 text-xs cursor-pointer"
              >
                {t.finalCTASecondary}
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
