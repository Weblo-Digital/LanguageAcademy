"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLevelTest } from "@/context/LevelTestContext";
import { useLanguage } from "@/context/LanguageContext";
import { ageProgramsTranslations, homeTranslations } from "@/lib/translations";

export function AgeProgramTabs() {
  const { openTestModal } = useLevelTest();
  const { language } = useLanguage();
  const t = homeTranslations[language];
  const ageProgramsData = ageProgramsTranslations[language];
  const [selectedAge, setSelectedAge] = useState<keyof typeof ageProgramsData>("kids");

  return (
    <section className="py-24 bg-white border-b border-slate-100" id="programs">
      <div className="max-w-7xl w-full mx-auto px-6 lg:px-12">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B88100]">
            {t.programsBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-4">
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
              className={`px-5 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedAge === key 
                  ? "bg-brand-navy text-white shadow-sm" 
                  : "bg-slate-50 text-brand-navy hover:bg-slate-100"
              }`}
            >
              {ageProgramsData[key].title.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Display category details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-brand-warm-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-100">
          {/* Left Copy */}
          <div className="lg:col-span-5 text-left space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-navy bg-slate-200/50 px-3 py-1 rounded">
              {ageProgramsData[selectedAge].highlight}
            </span>
            <h3 className="text-2xl font-black text-brand-navy tracking-tight leading-tight">
              {ageProgramsData[selectedAge].title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {ageProgramsData[selectedAge].desc}
            </p>
            <div className="pt-4">
              <Button 
                onClick={() => openTestModal()} 
                className="bg-brand-lime text-brand-navy hover:bg-brand-lime-dark text-xs font-bold px-6 py-5 rounded-xl shadow-sm cursor-pointer border-none"
              >
                {t.programsCTA}
              </Button>
            </div>
          </div>

          {/* Right Course Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {ageProgramsData[selectedAge].courses.map((course, idx) => (
              <div 
                key={idx} 
                onClick={() => openTestModal()}
                className="group bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between hover:bg-brand-lime hover:border-brand-lime hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div>
                  <h4 className="text-sm font-bold text-brand-navy tracking-tight transition-colors">
                    {course.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 group-hover:text-brand-navy/80 transition-colors">
                    {course.details}
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openTestModal();
                    }}
                    className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-brand-navy transition-all cursor-pointer"
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
  );
}
