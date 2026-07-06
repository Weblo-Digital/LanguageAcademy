"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Globe, 
  User, 
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Briefcase,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLevelTest } from "@/context/LevelTestContext";
import { useLanguage } from "@/context/LanguageContext";
import { headerTranslations } from "@/lib/translations";

export function Header() {
  const { openTestModal } = useLevelTest();
  const { language, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const t = headerTranslations[language];

  // Close menus and detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setActiveMenu(null);
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDropdownLeave = () => {
    setActiveMenu(null);
  };

  // Mobile navigation collapsible states
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({
    languages: false,
    programs: false,
    exams: false,
    about: false,
  });

  const toggleMobileSection = (sec: string) => {
    setMobileSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4 pointer-events-none">
      <div className={`mx-auto flex h-16 max-w-[1280px] w-full items-center justify-between px-6 border rounded-full pointer-events-auto transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-lg border-slate-200/50 shadow-sm text-[#0F1E43]" 
          : "bg-white/10 backdrop-blur-md border-white/10 shadow-xs text-white"
      }`}>
        
        {/* Left Side: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="shrink-0 flex items-center">
            {/* Desktop Logo */}
            <Image 
              src="/images/brand/next_point_academy_words.svg" 
              alt="Next Point Academy" 
              width={140} 
              height={40} 
              className={`hidden md:block h-9 w-auto transition-all duration-300 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
            {/* Mobile Logo */}
            <Image 
              src="/images/brand/picto_next_point.svg" 
              alt="Next Point Academy" 
              width={36} 
              height={36} 
              className={`block md:hidden h-9 w-auto transition-all duration-300 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center justify-center gap-1 relative flex-1">
          
          {/* Languages Link */}
          <div 
            onMouseEnter={() => handleMouseEnter("languages")} 
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-all ${
              activeMenu === "languages" 
                ? (scrolled ? "bg-slate-100 text-[#0F1E43]" : "bg-white/20 text-white") 
                : (scrolled ? "text-[#0F1E43] hover:bg-slate-50/80" : "text-slate-100 hover:bg-white/10")
            }`}>
              {t.languages} <ChevronDown className={`size-3 transition-transform ${activeMenu === "languages" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Programs Link */}
          <div 
            onMouseEnter={() => handleMouseEnter("programs")} 
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-all ${
              activeMenu === "programs" 
                ? (scrolled ? "bg-slate-100 text-[#0F1E43]" : "bg-white/20 text-white") 
                : (scrolled ? "text-[#0F1E43] hover:bg-slate-50/80" : "text-slate-100 hover:bg-white/10")
            }`}>
              {t.programs} <ChevronDown className={`size-3 transition-transform ${activeMenu === "programs" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Exams Link */}
          <div 
            onMouseEnter={() => handleMouseEnter("exams")} 
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-all ${
              activeMenu === "exams" 
                ? (scrolled ? "bg-slate-100 text-[#0F1E43]" : "bg-white/20 text-white") 
                : (scrolled ? "text-[#0F1E43] hover:bg-slate-50/80" : "text-slate-100 hover:bg-white/10")
            }`}>
              {t.exams} <ChevronDown className={`size-3 transition-transform ${activeMenu === "exams" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* About Link */}
          <div 
            onMouseEnter={() => handleMouseEnter("about")} 
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <button className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-full transition-all ${
              activeMenu === "about" 
                ? (scrolled ? "bg-slate-100 text-[#0F1E43]" : "bg-white/20 text-white") 
                : (scrolled ? "text-[#0F1E43] hover:bg-slate-50/80" : "text-slate-100 hover:bg-white/10")
            }`}>
              {t.about} <ChevronDown className={`size-3 transition-transform ${activeMenu === "about" ? "rotate-180" : ""}`} />
            </button>
          </div>
        </nav>

        {/* Right Side: Portal links & Main Placement CTA */}
        <div className="hidden lg:flex items-center justify-end gap-6 flex-1">
          <div className={`flex items-center gap-4 text-xs font-semibold border-r pr-6 transition-colors duration-300 ${scrolled ? "text-[#0F1E43] border-slate-200" : "text-slate-200 border-white/20"}`}>

            {/* Interactive Lang Selector */}
            <button 
              onClick={toggleLanguage}
              className={`flex items-center gap-1 cursor-pointer p-1.5 rounded-xl transition-colors font-bold ${scrolled ? "text-[#0F1E43] hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
            >
              <Globe className="size-4" />
              <span>{t.langSelector}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link href="#portal">
              <Button variant="ghost" className={`text-xs font-bold flex items-center gap-1.5 px-4 h-11 rounded-xl transition-colors duration-300 ${scrolled ? "text-[#0F1E43] hover:bg-slate-100" : "text-white hover:bg-white/10 hover:text-white"}`}>
                <User className="size-4" />
                {t.portal}
              </Button>
            </Link>
            
            <Button
              onClick={openTestModal}
              className="bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] border-none font-bold rounded-xl px-6 h-11 text-xs shadow-sm transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
            >
              {t.freeTest}
            </Button>
          </div>
        </div>

        {/* Hamburger menu mobile */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Main CTA on Mobile */}
          <Button
            onClick={openTestModal}
            className="bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] border-none font-bold rounded-xl px-4 h-10 text-[11px] shadow-sm shrink-0"
          >
            {t.freeTest}
          </Button>
          <button 
            onClick={() => setMobileOpen(!mobileOpen)} 
            className={`p-2 rounded-xl transition-colors duration-300 ${scrolled ? "text-[#0F1E43] hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/*                       DESKTOP MEGA MENUS POPUPS                          */}
      {/* ========================================================================= */}
      {activeMenu && (
        <div 
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
          className="absolute top-[4.75rem] left-1/2 -translate-x-1/2 w-full max-w-[1280px] bg-white border border-slate-200/50 rounded-3xl shadow-xl z-50 pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-top-2 text-[#0F1E43]"
        >
          <div className="w-full px-10 py-8">
            
            {/* 1. Languages Mega Menu */}
            {activeMenu === "languages" && (
              <div className="grid grid-cols-4 gap-8">
                {/* Highlights Left Column */}
                <div className="bg-[#FAF8F5] rounded-3xl p-6 flex flex-col justify-between border border-slate-100">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest bg-[#0F1E43]/10 text-[#0F1E43] px-2.5 py-1 rounded">{t.langHub}</span>
                    <h4 className="text-base font-black text-[#0F1E43] mt-4">{t.langHubTitle}</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {t.langHubDesc}
                    </p>
                  </div>
                  <button onClick={openTestModal} className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#0F1E43] hover:text-[#0f1e43]/85 transition-colors cursor-pointer">
                    {t.evalLevel} &rarr;
                  </button>
                </div>

                {/* English, French, Spanish & Arabic Columns */}
                <div className="col-span-3 grid grid-cols-3 gap-6">
                  {/* English block */}
                  <div>
                    <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-3 pb-1 border-b border-slate-100 flex items-center gap-1.5">
                      <span className="inline-block size-1.5 rounded-full bg-blue-500" />
                      🇬🇧 {t.englishTitle}
                    </h5>
                    <ul className="space-y-2 text-xs text-slate-600 font-semibold">
                      <li><Link href="/langues/anglais" className="hover:text-[#0F1E43]/75">{t.generalEnglish}</Link></li>
                      <li><Link href="/langues/anglais" className="hover:text-[#0F1E43]/75">{t.businessEnglish}</Link></li>
                      <li><Link href="/langues/anglais" className="hover:text-[#0F1E43]/75">{t.academicEnglish}</Link></li>
                      <li><Link href="/langues/anglais" className="hover:text-[#0F1E43]/75">{t.conversationalEnglish}</Link></li>
                      <li><Link href="/langues/anglais" className="hover:text-[#0F1E43]/75">{t.kidsTeensEnglish}</Link></li>
                      <li><Link href="/examens" className="hover:text-[#0F1E43]/75">{t.ieltsToefl}</Link></li>
                    </ul>
                  </div>

                  {/* French block */}
                  <div>
                    <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-3 pb-1 border-b border-slate-100 flex items-center gap-1.5">
                      <span className="inline-block size-1.5 rounded-full bg-red-500" />
                      🇫🇷 {t.frenchTitle}
                    </h5>
                    <ul className="space-y-2 text-xs text-slate-600 font-semibold">
                      <li><Link href="/langues/francais" className="hover:text-[#0F1E43]/75">{t.generalFrench}</Link></li>
                      <li><Link href="/langues/francais" className="hover:text-[#0F1E43]/75">{t.businessFrench}</Link></li>
                      <li><Link href="/langues/francais" className="hover:text-[#0F1E43]/75">{t.academicFrench}</Link></li>
                      <li><Link href="/langues/francais" className="hover:text-[#0F1E43]/75">{t.kidsTeensFrench}</Link></li>
                      <li><Link href="/examens" className="hover:text-[#0F1E43]/75">{t.delfDalf}</Link></li>
                    </ul>
                  </div>

                  {/* Spanish and Arabic block */}
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-2 pb-1 border-b border-slate-100 flex items-center gap-1.5">
                        <span className="inline-block size-1.5 rounded-full bg-yellow-500" />
                        🇪🇸 {t.spanishTitle}
                      </h5>
                      <ul className="space-y-2 text-xs text-slate-600 font-semibold">
                        <li><Link href="/langues/espagnol" className="hover:text-[#0F1E43]/75">DELE Preparation</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-2 pb-1 border-b border-slate-100 flex items-center gap-1.5">
                        <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                        🇲🇦 {t.arabicTitle}
                      </h5>
                      <ul className="space-y-2 text-xs text-slate-600 font-semibold">
                        <li><Link href="/langues/arabe" className="hover:text-[#0F1E43]/75">Modern Standard Arabic (Fusha)</Link></li>
                        <li><Link href="/langues/arabe" className="hover:text-[#0F1E43]/75">Moroccan Darija</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Programs Mega Menu */}
            {activeMenu === "programs" && (
              <div className="grid grid-cols-4 gap-8">
                {/* Age brackets group */}
                <div>
                  <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="size-4 text-[#057A55]" />
                    {t.byAgeTitle}
                  </h5>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                    <li><Link href="/programmes/kids-academy" className="hover:text-[#0F1E43]/75">{t.kids}</Link></li>
                    <li><Link href="/programmes/juniors" className="hover:text-[#0F1E43]/75">{t.juniors}</Link></li>
                    <li><Link href="/programmes/teens" className="hover:text-[#0F1E43]/75">{t.teens}</Link></li>
                    <li><Link href="/programmes/adultes" className="hover:text-[#0F1E43]/75">{t.adults}</Link></li>
                  </ul>
                </div>

                {/* Formats group */}
                <div>
                  <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <BookOpen className="size-4 text-[#057A55]" />
                    {t.formatsTitle}
                  </h5>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                    <li><Link href="/programmes/cours-individuels" className="hover:text-[#0F1E43]/75">{t.privateLessons}</Link></li>
                    <li><Link href="/programmes/clubs-conversation" className="hover:text-[#0F1E43]/75">{t.convClubs}</Link></li>
                    <li><Link href="/camps-ete" className="hover:text-[#0F1E43]/75">{t.summerCamps}</Link></li>
                    <li><Link href="/programmes/holiday-programs" className="hover:text-[#0F1E43]/75">{t.holidayProgs}</Link></li>
                  </ul>
                </div>

                {/* Professional tracks */}
                <div>
                  <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Briefcase className="size-4 text-[#057A55]" />
                    {t.proTitle}
                  </h5>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                    <li><Link href="/programmes/business-languages" className="hover:text-[#0F1E43]/75">{t.businessLangs}</Link></li>
                    <li><Link href="/programmes/presentations-ecrits" className="hover:text-[#0F1E43]/75">{t.presentationSkills}</Link></li>
                    <li><Link href="/programmes/entretien-embauche" className="hover:text-[#0F1E43]/75">{t.interviewPrep}</Link></li>
                    <li><Link href="/programmes/formation-continue" className="hover:text-[#0F1E43]/75">{t.cpfTraining}</Link></li>
                  </ul>
                </div>

                {/* Feature banner card */}
                <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#057A55] bg-emerald-50 px-2 py-0.5 rounded">{t.summerBannerBadge}</span>
                    <h6 className="text-sm font-bold text-[#0F1E43] mt-2">{t.summerBannerTitle}</h6>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {t.summerBannerDesc}
                    </p>
                  </div>
                  <Link href="/camps-ete" className="text-[11px] font-bold text-[#057A55] flex items-center gap-1.5 hover:underline mt-4">
                    {t.summerBannerCTA} <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* 3. Exams Mega Menu */}
            {activeMenu === "exams" && (
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Award className="size-4 text-[#057A55]" />
                    {t.englishTitle}
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-600 font-semibold">
                    <li><Link href="/examens/ielts" className="hover:text-[#0F1E43]/75">IELTS General &amp; Academic</Link></li>
                    <li><Link href="/examens/toefl" className="hover:text-[#0F1E43]/75">TOEFL iBT Complete</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Award className="size-4 text-[#057A55]" />
                    {t.frenchTitle}
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-600 font-semibold">
                    <li><Link href="/examens/delf" className="hover:text-[#0F1E43]/75">DELF (A1 à B2)</Link></li>
                    <li><Link href="/examens/dalf" className="hover:text-[#0F1E43]/75">DALF (C1 &amp; C2)</Link></li>
                    <li><Link href="/examens/tcf" className="hover:text-[#0F1E43]/75">TCF Canada &amp; Québec</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Award className="size-4 text-[#057A55]" />
                    {t.spanishTitle}
                  </h5>
                  <ul className="space-y-2 text-xs text-slate-600 font-semibold">
                    <li><Link href="/examens/dele" className="hover:text-[#0F1E43]/75">DELE (Espagnol)</Link></li>
                  </ul>
                </div>
                <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <h6 className="text-xs font-bold text-[#0F1E43] flex items-center gap-1"><Sparkles className="size-3.5 text-amber-500" /> {t.examsTitle}</h6>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {t.examsDesc}
                    </p>
                  </div>
                  <button onClick={openTestModal} className="w-full bg-[#BEF264] text-[#0F1E43] font-bold text-xs py-2.5 rounded-xl mt-4 hover:bg-[#A3E635] transition-colors cursor-pointer">
                    {t.simulateExam}
                  </button>
                </div>
              </div>
            )}

            {/* 4. About Mega Menu */}
            {activeMenu === "about" && (
              <div className="grid grid-cols-4 gap-8">
                <div>
                  <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-4">{t.aboutTitle}</h5>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                    <li><Link href="/institut" className="hover:text-[#0F1E43]/75">{t.storyMission}</Link></li>
                    <li><Link href="/institut" className="hover:text-[#0F1E43]/75">{t.activePedagogy}</Link></li>
                    <li><Link href="/institut" className="hover:text-[#0F1E43]/75">{t.accreditations}</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0F1E43] uppercase tracking-wider mb-4">{t.resourcesTitle}</h5>
                  <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                    <li><Link href="/#blog" className="hover:text-[#0F1E43]/75">{t.blogInsights}</Link></li>
                    <li><Link href="/#testimonials" className="hover:text-[#0F1E43]/75">{t.testimonials}</Link></li>
                    <li><Link href="/faq" className="hover:text-[#0F1E43]/75">{t.faq}</Link></li>
                  </ul>
                </div>
                <div className="col-span-2 bg-[#FAF8F5] rounded-3xl p-6 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <h6 className="text-sm font-bold text-[#0F1E43]">{t.recruitmentTitle}</h6>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {t.recruitmentDesc}
                    </p>
                  </div>
                  <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#057A55] hover:text-[#057A55]/80 transition-colors">
                    {t.recruitmentCTA} &rarr;
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/*                       MOBILE COLLAPSIBLE DRAWER                          */}
      {/* ========================================================================= */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[4.75rem] left-0 right-0 w-full bg-white border border-slate-200/50 rounded-3xl shadow-xl max-h-[calc(100vh-6rem)] overflow-y-auto z-40 pointer-events-auto animate-in fade-in slide-in-from-top-4 text-[#0F1E43]">
          <div className="p-6 space-y-6">
            
            {/* Language Switcher on mobile */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-[#0F1E43]">Language / Langue</span>
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-extrabold text-[#0F1E43]"
              >
                <Globe className="size-3.5" />
                <span>{t.langSelector}</span>
              </button>
            </div>

            {/* Nav Collapsibles */}
            <div className="space-y-4">
              
              {/* Section: Languages */}
              <div>
                <button 
                  onClick={() => toggleMobileSection("languages")}
                  className="w-full flex items-center justify-between py-2 text-sm font-bold text-[#0F1E43] border-b border-slate-100"
                >
                  <span>{t.languages}</span>
                  <ChevronDown className={`size-4 transition-transform ${mobileSections.languages ? "rotate-180" : ""}`} />
                </button>
                {mobileSections.languages && (
                  <ul className="pl-4 py-2 space-y-2.5 text-xs text-slate-500 font-semibold border-l-2 border-slate-100 mt-2">
                    <li><Link href="/langues/anglais" onClick={() => setMobileOpen(false)}>🇬🇧 {t.englishTitle}</Link></li>
                    <li><Link href="/langues/francais" onClick={() => setMobileOpen(false)}>🇫🇷 {t.frenchTitle}</Link></li>
                    <li><Link href="/langues/espagnol" onClick={() => setMobileOpen(false)}>🇪🇸 {t.spanishTitle}</Link></li>
                    <li><Link href="/langues/arabe" onClick={() => setMobileOpen(false)}>🇲🇦 {t.arabicTitle}</Link></li>
                  </ul>
                )}
              </div>

              {/* Section: Programs */}
              <div>
                <button 
                  onClick={() => toggleMobileSection("programs")}
                  className="w-full flex items-center justify-between py-2 text-sm font-bold text-[#0F1E43] border-b border-slate-100"
                >
                  <span>{t.programs}</span>
                  <ChevronDown className={`size-4 transition-transform ${mobileSections.programs ? "rotate-180" : ""}`} />
                </button>
                {mobileSections.programs && (
                  <ul className="pl-4 py-2 space-y-2.5 text-xs text-slate-500 font-semibold border-l-2 border-slate-100 mt-2">
                    <li><Link href="/programmes/kids-academy" onClick={() => setMobileOpen(false)}>{t.kids}</Link></li>
                    <li><Link href="/programmes/juniors" onClick={() => setMobileOpen(false)}>{t.juniors}</Link></li>
                    <li><Link href="/programmes/teens" onClick={() => setMobileOpen(false)}>{t.teens}</Link></li>
                    <li><Link href="/programmes/adultes" onClick={() => setMobileOpen(false)}>{t.adults}</Link></li>
                    <li><Link href="/camps-ete" onClick={() => setMobileOpen(false)}>{t.summerCamps}</Link></li>
                  </ul>
                )}
              </div>

              {/* Section: Exams */}
              <div>
                <button 
                  onClick={() => toggleMobileSection("exams")}
                  className="w-full flex items-center justify-between py-2 text-sm font-bold text-[#0F1E43] border-b border-slate-100"
                >
                  <span>{t.exams}</span>
                  <ChevronDown className={`size-4 transition-transform ${mobileSections.exams ? "rotate-180" : ""}`} />
                </button>
                {mobileSections.exams && (
                  <ul className="pl-4 py-2 space-y-2.5 text-xs text-slate-500 font-semibold border-l-2 border-slate-100 mt-2">
                    <li><Link href="/examens/ielts" onClick={() => setMobileOpen(false)}>IELTS ({t.englishTitle})</Link></li>
                    <li><Link href="/examens/toefl" onClick={() => setMobileOpen(false)}>TOEFL ({t.englishTitle})</Link></li>
                    <li><Link href="/examens/delf" onClick={() => setMobileOpen(false)}>DELF ({t.frenchTitle})</Link></li>
                    <li><Link href="/examens/dalf" onClick={() => setMobileOpen(false)}>DALF ({t.frenchTitle})</Link></li>
                    <li><Link href="/examens/tcf" onClick={() => setMobileOpen(false)}>TCF ({t.frenchTitle})</Link></li>
                    <li><Link href="/examens/dele" onClick={() => setMobileOpen(false)}>DELE ({t.spanishTitle})</Link></li>
                  </ul>
                )}
              </div>

              {/* General single links */}
              <Link 
                href="/institut" 
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-bold text-[#0F1E43] border-b border-slate-100"
              >
                {t.about}
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-bold text-[#0F1E43] border-b border-slate-100"
              >
                {t.contact}
              </Link>
            </div>

            {/* CTAs mobile footer inside drawer */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <Link href="#portal" className="block w-full">
                <Button variant="outline" className="w-full text-xs font-bold border-slate-200 py-5 rounded-xl text-[#0F1E43]">
                  {t.portal}
                </Button>
              </Link>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
