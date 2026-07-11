"use client";

import { useState, useTransition } from "react";
import { updateProgram } from "@/lib/actions/content";
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
  subhead: string;
  description: string;
  guideTitle: string | null;
}

interface Program {
  id: number;
  slug: string;
  duration: string;
  groupSize: string;
  level: string;
  modules: any; // Json (string[])
  strategy: any; // Json (string[])
  isActive: boolean;
  translations: Translation[];
}

interface EditProgramFormProps {
  program: Program;
}

export function EditProgramForm({ program }: EditProgramFormProps) {
  const [isActive, setIsActive] = useState(program.isActive);
  const [duration, setDuration] = useState(program.duration);
  const [groupSize, setGroupSize] = useState(program.groupSize);
  const [level, setLevel] = useState(program.level);
  
  // Lists
  const [modules, setModules] = useState<string[]>(program.modules as string[] || []);
  const [strategy, setStrategy] = useState<string[]>(program.strategy as string[] || []);

  // French Translations
  const frTrans = program.translations.find(t => t.locale === "fr") || { name: "", subhead: "", description: "", guideTitle: "" };
  const [frName, setFrName] = useState(frTrans.name);
  const [frSubhead, setFrSubhead] = useState(frTrans.subhead);
  const [frDescription, setFrDescription] = useState(frTrans.description);
  const [frGuide, setFrGuide] = useState(frTrans.guideTitle || "");

  // English Translations
  const enTrans = program.translations.find(t => t.locale === "en") || { name: "", subhead: "", description: "", guideTitle: "" };
  const [enName, setEnName] = useState(enTrans.name);
  const [enSubhead, setEnSubhead] = useState(enTrans.subhead);
  const [enDescription, setEnDescription] = useState(enTrans.description);
  const [enGuide, setEnGuide] = useState(enTrans.guideTitle || "");

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateProgram(program.id, {
        duration,
        groupSize,
        level,
        modules,
        strategy,
        isActive,
        fr: { name: frName, subhead: frSubhead, description: frDescription, guideTitle: frGuide },
        en: { name: enName, subhead: enSubhead, description: enDescription, guideTitle: enGuide },
      });

      if (res.success) {
        alert("Programme mis à jour avec succès !");
        window.location.href = "/admin/content";
      } else {
        alert(res.error || "Erreur de mise à jour");
      }
    });
  };

  // Helper to manage dynamic module array
  const addModule = () => setModules(prev => [...prev, ""]);
  const updateModule = (idx: number, val: string) => {
    setModules(prev => prev.map((m, i) => i === idx ? val : m));
  };
  const removeModule = (idx: number) => {
    setModules(prev => prev.filter((_, i) => i !== idx));
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
              Modifier le Programme
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Slug unique : <code>{program.slug}</code>
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
                Nom du programme
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
              <Label htmlFor="fr-subhead" className="text-[10px] font-extrabold uppercase text-slate-400">
                Sous-titre / Accroche
              </Label>
              <Input
                id="fr-subhead"
                type="text"
                value={frSubhead}
                onChange={(e) => setFrSubhead(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fr-desc" className="text-[10px] font-extrabold uppercase text-slate-400">
                Description détaillée
              </Label>
              <textarea
                id="fr-desc"
                value={frDescription}
                onChange={(e) => setFrDescription(e.target.value)}
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
                Nom du programme (EN)
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
              <Label htmlFor="en-subhead" className="text-[10px] font-extrabold uppercase text-slate-400">
                Sous-titre / Accroche (EN)
              </Label>
              <Input
                id="en-subhead"
                type="text"
                value={enSubhead}
                onChange={(e) => setEnSubhead(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="en-desc" className="text-[10px] font-extrabold uppercase text-slate-400">
                Description détaillée (EN)
              </Label>
              <textarea
                id="en-desc"
                value={enDescription}
                onChange={(e) => setEnDescription(e.target.value)}
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
              Paramètres globaux
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="duration" className="text-[10px] font-extrabold uppercase text-slate-400">
                  Durée de formation
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
                <Label htmlFor="groupSize" className="text-[10px] font-extrabold uppercase text-slate-400">
                  Taille des groupes
                </Label>
                <Input
                  id="groupSize"
                  type="text"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="level" className="text-[10px] font-extrabold uppercase text-slate-400">
                  Niveaux ciblés
                </Label>
                <Input
                  id="level"
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
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
                Rendre ce programme actif et visible sur le site public
              </Label>
            </div>
          </Card>

          {/* Syllabus Modules List */}
          <Card className="p-6 space-y-4 bg-white border border-slate-100 shadow-sm rounded-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
                Modules du Syllabus
              </h3>
              <Button
                onClick={addModule}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[10px] py-1.5 px-3 h-fit border-none flex items-center gap-1 cursor-pointer"
              >
                <Plus className="size-3.5" /> Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {modules.map((mod, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={mod}
                    onChange={(e) => updateModule(idx, e.target.value)}
                    placeholder="Ex: Éveil aux sons et phonétique"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald flex-1"
                  />
                  <button
                    onClick={() => removeModule(idx)}
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer border-none"
                  >
                    <Trash2 className="size-4.5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Success Strategy List */}
          <Card className="p-6 space-y-4 bg-white border border-slate-100 shadow-sm rounded-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
                Stratégie de réussite
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
                    placeholder="Ex: Immersion totale passive et bienveillante"
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
