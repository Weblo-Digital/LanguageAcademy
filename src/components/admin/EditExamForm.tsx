"use client";

import { useState, useTransition } from "react";
import { updateExam } from "@/lib/actions/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Translation {
  locale: string;
  name: string;
  fullName: string;
  intro: string;
  guideTitle: string | null;
}

interface ExamSection {
  title: string;
  desc: string;
}

interface Exam {
  id: number;
  slug: string;
  duration: string;
  validity: string;
  format: string;
  sections: any; // Json (ExamSection[])
  strategy: any; // Json (string[])
  isActive: boolean;
  translations: Translation[];
}

interface EditExamFormProps {
  exam: Exam;
}

export function EditExamForm({ exam }: EditExamFormProps) {
  const [isActive, setIsActive] = useState(exam.isActive);
  const [duration, setDuration] = useState(exam.duration);
  const [validity, setValidity] = useState(exam.validity);
  const [format, setFormat] = useState(exam.format);
  
  // Lists
  const [sections, setSections] = useState<ExamSection[]>(exam.sections as ExamSection[] || []);
  const [strategy, setStrategy] = useState<string[]>(exam.strategy as string[] || []);

  // French Translations
  const frTrans = exam.translations.find((t: any) => t.locale === "fr") || { name: "", fullName: "", intro: "", guideTitle: "" };
  const [frName, setFrName] = useState(frTrans.name);
  const [frFullName, setFrFullName] = useState(frTrans.fullName);
  const [frIntro, setFrIntro] = useState(frTrans.intro);
  const [frGuide, setFrGuide] = useState(frTrans.guideTitle || "");

  // English Translations
  const enTrans = exam.translations.find((t: any) => t.locale === "en") || { name: "", fullName: "", intro: "", guideTitle: "" };
  const [enName, setEnName] = useState(enTrans.name);
  const [enFullName, setEnFullName] = useState(enTrans.fullName);
  const [enIntro, setEnIntro] = useState(enTrans.intro);
  const [enGuide, setEnGuide] = useState(enTrans.guideTitle || "");

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateExam(exam.id, {
        duration,
        validity,
        format,
        sections,
        strategy,
        isActive,
        fr: { name: frName, fullName: frFullName, intro: frIntro, guideTitle: frGuide },
        en: { name: enName, fullName: enFullName, intro: enIntro, guideTitle: enGuide },
      });

      if (res.success) {
        alert("Certification mise à jour avec succès !");
        window.location.href = "/admin/content";
      } else {
        alert(res.error || "Erreur de mise à jour");
      }
    });
  };

  // Helper to manage dynamic sections array
  const addSection = () => setSections(prev => [...prev, { title: "", desc: "" }]);
  const updateSectionTitle = (idx: number, title: string) => {
    setSections(prev => prev.map((s, i) => i === idx ? { ...s, title } : s));
  };
  const updateSectionDesc = (idx: number, desc: string) => {
    setSections(prev => prev.map((s, i) => i === idx ? { ...s, desc } : s));
  };
  const removeSection = (idx: number) => {
    setSections(prev => prev.filter((_, i) => i !== idx));
  };

  // Helper to manage dynamic strategy array
  const addStrategy = () => setStrategy(prev => [...prev, ""]);
  const updateStrategy = (idx: number, val: string) => {
    setStrategy(prev => prev.map((s, i) => i === idx ? val : s));
  };
  const removeStrategy = (idx: number) => {
    setStrategy(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto text-left">
      
      {/* Header Bar */}
      <div className="flex justify-between items-center gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/content"
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-brand-navy font-heading">
              Modifier la Certification
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Slug unique : <code>{exam.slug}</code>
            </p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={isPending}
          className="bg-brand-emerald text-white hover:bg-brand-emerald-dark font-bold rounded-xl px-5 py-3 h-fit text-xs border-none flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Save className="size-4" /> {isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <Tabs defaultValue="fr" className="w-full">
        <TabsList className="bg-slate-100 p-1 rounded-xl mb-6">
          <TabsTrigger value="fr" className="rounded-lg text-xs font-bold px-4 py-2 cursor-pointer">
            Français (FR)
          </TabsTrigger>
          <TabsTrigger value="en" className="rounded-lg text-xs font-bold px-4 py-2 cursor-pointer">
            English (EN)
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg text-xs font-bold px-4 py-2 cursor-pointer">
            Paramètres & Listes
          </TabsTrigger>
        </TabsList>

        {/* French Translations Tab */}
        <TabsContent value="fr" className="space-y-5 outline-none">
          <Card className="p-6 space-y-4 bg-white border border-slate-100 shadow-sm rounded-2xl">
            <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
              Contenu en Français
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="fr-name" className="text-[10px] font-extrabold uppercase text-slate-400">
                Nom abrégé (ex: IELTS)
              </Label>
              <Input
                id="fr-name"
                type="text"
                value={frName}
                onChange={(e) => setFrName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fr-fullname" className="text-[10px] font-extrabold uppercase text-slate-400">
                Nom complet de l'examen
              </Label>
              <Input
                id="fr-fullname"
                type="text"
                value={frFullName}
                onChange={(e) => setFrFullName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fr-intro" className="text-[10px] font-extrabold uppercase text-slate-400">
                Introduction explicative
              </Label>
              <textarea
                id="fr-intro"
                value={frIntro}
                onChange={(e) => setFrIntro(e.target.value)}
                rows={6}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fr-guide" className="text-[10px] font-extrabold uppercase text-slate-400">
                Titre du guide téléchargeable
              </Label>
              <Input
                id="fr-guide"
                type="text"
                value={frGuide}
                onChange={(e) => setFrGuide(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>
          </Card>
        </TabsContent>

        {/* English Translations Tab */}
        <TabsContent value="en" className="space-y-5 outline-none">
          <Card className="p-6 space-y-4 bg-white border border-slate-100 shadow-sm rounded-2xl">
            <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
              Contenu en Anglais
            </h3>

            <div className="space-y-1.5">
              <Label htmlFor="en-name" className="text-[10px] font-extrabold uppercase text-slate-400">
                Nom abrégé (EN)
              </Label>
              <Input
                id="en-name"
                type="text"
                value={enName}
                onChange={(e) => setEnName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="en-fullname" className="text-[10px] font-extrabold uppercase text-slate-400">
                Nom complet (EN)
              </Label>
              <Input
                id="en-fullname"
                type="text"
                value={enFullName}
                onChange={(e) => setEnFullName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="en-intro" className="text-[10px] font-extrabold uppercase text-slate-400">
                Introduction (EN)
              </Label>
              <textarea
                id="en-intro"
                value={enIntro}
                onChange={(e) => setEnIntro(e.target.value)}
                rows={6}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald resize-y"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="en-guide" className="text-[10px] font-extrabold uppercase text-slate-400">
                Titre du guide (EN)
              </Label>
              <Input
                id="en-guide"
                type="text"
                value={enGuide}
                onChange={(e) => setEnGuide(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>
          </Card>
        </TabsContent>

        {/* Settings and Lists Tab */}
        <TabsContent value="settings" className="space-y-6 outline-none">
          
          {/* Metadata parameters */}
          <Card className="p-6 space-y-4 bg-white border border-slate-100 shadow-sm rounded-2xl">
            <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
              Paramètres généraux
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="duration" className="text-[10px] font-extrabold uppercase text-slate-400">
                  Durée de l'épreuve
                </Label>
                <Input
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="validity" className="text-[10px] font-extrabold uppercase text-slate-400">
                  Validité du diplôme
                </Label>
                <Input
                  id="validity"
                  type="text"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="format" className="text-[10px] font-extrabold uppercase text-slate-400">
                  Format de l'examen
                </Label>
                <Input
                  id="format"
                  type="text"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="size-4 border-slate-300 rounded text-brand-emerald focus:ring-brand-emerald cursor-pointer"
              />
              <Label htmlFor="isActive" className="text-xs font-bold text-brand-navy cursor-pointer">
                Rendre cet examen actif et visible sur le site public
              </Label>
            </div>
          </Card>

          {/* Exam Sections List */}
          <Card className="p-6 space-y-4 bg-white border border-slate-100 shadow-sm rounded-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
                Épreuves & Sections de l'Examen
              </h3>
              <Button
                onClick={addSection}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px] py-1.5 px-3 h-fit border-none flex items-center gap-1 cursor-pointer"
              >
                <Plus className="size-3.5" /> Ajouter
              </Button>
            </div>

            <div className="space-y-4">
              {sections.map((sect, idx) => (
                <div key={idx} className="flex gap-2 items-start border-b border-slate-100 pb-3 last:border-none last:pb-0">
                  <div className="flex-1 space-y-2">
                    <Input
                      type="text"
                      value={sect.title}
                      onChange={(e) => updateSectionTitle(idx, e.target.value)}
                      placeholder="Titre de la section (ex: Listening - 30 min)"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                    />
                    <textarea
                      value={sect.desc}
                      onChange={(e) => updateSectionDesc(idx, e.target.value)}
                      placeholder="Description de l'épreuve..."
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald resize-y"
                    />
                  </div>
                  <button
                    onClick={() => removeSection(idx)}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer border-none shrink-0"
                  >
                    <Trash2 className="size-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Prep Strategy List */}
          <Card className="p-6 space-y-4 bg-white border border-slate-100 shadow-sm rounded-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
                Stratégie de réussite de préparation
              </h3>
              <Button
                onClick={addStrategy}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px] py-1.5 px-3 h-fit border-none flex items-center gap-1 cursor-pointer"
              >
                <Plus className="size-3.5" /> Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {strategy.map((strat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={strat}
                    onChange={(e) => updateStrategy(idx, e.target.value)}
                    placeholder="Ex: Coaching ciblé sur la structure des dissertations"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald flex-1"
                  />
                  <button
                    onClick={() => removeStrategy(idx)}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer border-none"
                  >
                    <Trash2 className="size-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

        </TabsContent>
      </Tabs>
    </div>
  );
}
