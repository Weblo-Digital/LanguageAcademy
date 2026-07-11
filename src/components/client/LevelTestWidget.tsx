"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLevelTest } from "@/context/LevelTestContext";
import { useLanguage } from "@/context/LanguageContext";
import { homeTranslations } from "@/lib/translations";

export function LevelTestWidget() {
  const { openTestModal } = useLevelTest();
  const { language } = useLanguage();
  const t = homeTranslations[language];

  const [widgetLang, setWidgetLang] = useState("");
  const [widgetLevel, setWidgetLevel] = useState("");

  const handleWidgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openTestModal(widgetLang);
  };

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
        <div className="bg-brand-navy text-white p-8 lg:p-16 rounded-[2.5rem] relative overflow-hidden shadow-lg">
          
          <div className="absolute inset-0 opacity-5 select-none pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Column Text */}
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-lime bg-white/5 border border-white/10 px-3 py-1 rounded">
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
            <div className="lg:col-span-7 bg-white text-brand-navy p-6 lg:p-8 rounded-3xl shadow-sm w-full">
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
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-brand-navy font-bold outline-none cursor-pointer focus:border-brand-emerald"
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
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-brand-navy font-bold outline-none cursor-pointer focus:border-brand-emerald"
                    >
                      <option value="" disabled>{t.testPlaceholderLevel}</option>
                      <option value="beg">{t.testLevelBeginner}</option>
                      <option value="int">{t.testLevelIntermediate}</option>
                      <option value="adv">{t.testLevelAdvanced}</option>
                    </select>
                  </div>

                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-brand-lime text-brand-navy hover:bg-brand-lime-dark font-bold rounded-xl py-6 text-xs transition-colors duration-200 cursor-pointer shadow-md border-none"
                >
                  {t.testButton}
                </Button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
