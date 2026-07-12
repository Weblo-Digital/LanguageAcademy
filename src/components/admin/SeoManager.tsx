"use client";

import { useState, useTransition } from "react";
import { saveSeoMetadata } from "@/lib/actions/seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Search, 
  Eye, 
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface SeoRecord {
  id?: number;
  pagePath: string;
  titleFr: string | null;
  titleEn: string | null;
  descriptionFr: string | null;
  descriptionEn: string | null;
  ogImageUrl: string | null;
  noindex: boolean;
}

interface SeoManagerProps {
  initialSeo: SeoRecord[];
}

export function SeoManager({ initialSeo }: SeoManagerProps) {
  const defaultPages = [
    { path: "/", label: "Page d'accueil" },
    { path: "/contact", label: "Page Contact" },
    { path: "/examens", label: "Page Certifications" },
    { path: "/institut", label: "Page L'Institut" },
    { path: "/camps-ete", label: "Page Camps d'été" },
  ];

  const [seoRecords, setSeoRecords] = useState<SeoRecord[]>(initialSeo);
  const [selectedPath, setSelectedPath] = useState(defaultPages[0].path);
  
  // Find current active record or create a mock empty local state for editing
  const activeRecord = seoRecords.find(r => r.pagePath === selectedPath) || {
    pagePath: selectedPath,
    titleFr: "",
    titleEn: "",
    descriptionFr: "",
    descriptionEn: "",
    ogImageUrl: "",
    noindex: false,
  };

  // Form Fields State
  const [titleFr, setTitleFr] = useState(activeRecord.titleFr || "");
  const [titleEn, setTitleEn] = useState(activeRecord.titleEn || "");
  const [descriptionFr, setDescriptionFr] = useState(activeRecord.descriptionFr || "");
  const [descriptionEn, setDescriptionEn] = useState(activeRecord.descriptionEn || "");
  const [ogImageUrl, setOgImageUrl] = useState(activeRecord.ogImageUrl || "");
  const [noindex, setNoindex] = useState(activeRecord.noindex);

  const [isPending, startTransition] = useTransition();

  const handlePageChange = (path: string) => {
    setSelectedPath(path);
    const rec = seoRecords.find(r => r.pagePath === path) || {
      pagePath: path,
      titleFr: "",
      titleEn: "",
      descriptionFr: "",
      descriptionEn: "",
      ogImageUrl: "",
      noindex: false,
    };
    setTitleFr(rec.titleFr || "");
    setTitleEn(rec.titleEn || "");
    setDescriptionFr(rec.descriptionFr || "");
    setDescriptionEn(rec.descriptionEn || "");
    setOgImageUrl(rec.ogImageUrl || "");
    setNoindex(rec.noindex);
  };

  const handleSave = () => {
    startTransition(async () => {
      const res = await saveSeoMetadata(selectedPath, {
        titleFr,
        titleEn,
        descriptionFr,
        descriptionEn,
        ogImageUrl,
        noindex,
      });

      if (res.success) {
        // Update local state array
        setSeoRecords(prev => {
          const index = prev.findIndex(r => r.pagePath === selectedPath);
          const updatedRecord = {
            pagePath: selectedPath,
            titleFr,
            titleEn,
            descriptionFr,
            descriptionEn,
            ogImageUrl,
            noindex,
          };
          if (index !== -1) {
            return prev.map((r, i) => i === index ? updatedRecord : r);
          } else {
            return [...prev, updatedRecord];
          }
        });
        alert("Configuration SEO enregistrée !");
      } else {
        alert(res.error || "Erreur de sauvegarde");
      }
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto text-left">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl font-bold text-brand-navy font-heading">
          Configuration SEO & Indexation
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">
          Définissez les titres, descriptions et cartes de réseaux sociaux de chaque page principale
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Page selector list */}
        <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
          <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider px-3 mb-3">
            Pages Principales
          </h3>
          {defaultPages.map((page: any) => {
            const isActive = selectedPath === page.path;
            const hasOverridden = seoRecords.some(r => r.pagePath === page.path && (r.titleFr || r.descriptionFr));
            return (
              <button
                key={page.path}
                onClick={() => handlePageChange(page.path)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isActive 
                    ? "bg-slate-800 text-white" 
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <span>{page.label}</span>
                {hasOverridden && (
                  <CheckCircle className={`size-3.5 ${isActive ? "text-brand-lime" : "text-brand-emerald"}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: SEO Editor + Live Previews */}
        <div className="lg:col-span-8 space-y-6">
          
          <Tabs defaultValue="fr" className="w-full">
            <TabsList className="bg-slate-100 p-1 rounded-xl mb-4">
              <TabsTrigger value="fr" className="rounded-lg text-xs font-bold px-4 py-2 cursor-pointer">
                Contenu Français (FR)
              </TabsTrigger>
              <TabsTrigger value="en" className="rounded-lg text-xs font-bold px-4 py-2 cursor-pointer">
                Contenu Anglais (EN)
              </TabsTrigger>
              <TabsTrigger value="social" className="rounded-lg text-xs font-bold px-4 py-2 cursor-pointer">
                Réseaux Sociaux & Robots
              </TabsTrigger>
            </TabsList>

            {/* French Editor */}
            <TabsContent value="fr" className="space-y-4 outline-none">
              <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="title-fr" className="text-[10px] font-extrabold uppercase text-slate-400">
                    Balise Title (FR)
                  </Label>
                  <Input
                    id="title-fr"
                    type="text"
                    value={titleFr}
                    onChange={(e) => setTitleFr(e.target.value)}
                    placeholder="Ex: Accueil | Next Point Academy"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                  />
                  <p className="text-[9px] text-slate-400 font-bold">
                    Recommandé : 50 à 60 caractères. (Actuel: {titleFr.length})
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="desc-fr" className="text-[10px] font-extrabold uppercase text-slate-400">
                    Meta Description (FR)
                  </Label>
                  <textarea
                    id="desc-fr"
                    value={descriptionFr}
                    onChange={(e) => setDescriptionFr(e.target.value)}
                    placeholder="Saisissez la description courte pour Google..."
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald resize-y"
                  />
                  <p className="text-[9px] text-slate-400 font-bold">
                    Recommandé : 120 à 160 caractères. (Actuel: {descriptionFr.length})
                  </p>
                </div>
              </Card>

              {/* Google Search Result Preview */}
              <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-3">
                <h4 className="text-[10px] font-extrabold uppercase text-slate-400 flex items-center gap-1.5">
                  <Search className="size-3.5" /> Prévisualisation Google SERP (Français)
                </h4>
                
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>https://nextpoint.ma</span>
                    {selectedPath !== "/" && <span>{selectedPath}</span>}
                  </div>
                  <h4 className="text-blue-800 hover:underline text-sm font-semibold cursor-pointer truncate">
                    {titleFr || "Saisissez un titre..."}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-2">
                    {descriptionFr || "Saisissez une meta description pour voir le rendu dans les résultats Google..."}
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* English Editor */}
            <TabsContent value="en" className="space-y-4 outline-none">
              <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="title-en" className="text-[10px] font-extrabold uppercase text-slate-400">
                    Balise Title (EN)
                  </Label>
                  <Input
                    id="title-en"
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="Ex: Home | Next Point Academy"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                  />
                  <p className="text-[9px] text-slate-400 font-bold">
                    Recommandé : 50 à 60 caractères. (Actuel: {titleEn.length})
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="desc-en" className="text-[10px] font-extrabold uppercase text-slate-400">
                    Meta Description (EN)
                  </Label>
                  <textarea
                    id="desc-en"
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="Saisissez la description en anglais..."
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald resize-y"
                  />
                  <p className="text-[9px] text-slate-400 font-bold">
                    Recommandé : 120 à 160 caractères. (Actuel: {descriptionEn.length})
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Social Settings Editor */}
            <TabsContent value="social" className="space-y-4 outline-none">
              <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="og-image" className="text-[10px] font-extrabold uppercase text-slate-400">
                    URL de l'image Open Graph (Partage Réseaux)
                  </Label>
                  <Input
                    id="og-image"
                    type="text"
                    value={ogImageUrl}
                    onChange={(e) => setOgImageUrl(e.target.value)}
                    placeholder="Ex: https://nextpoint.ma/images/og-share.jpg"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                  />
                  <p className="text-[9px] text-slate-400 font-bold">
                    Copiez une URL depuis votre médiathèque R2. Résolution conseillée: 1200 x 630 pixels.
                  </p>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-slate-100 mt-4">
                  <input
                    id="noindex"
                    type="checkbox"
                    checked={noindex}
                    onChange={(e) => setNoindex(e.target.checked)}
                    className="size-4 border-slate-300 rounded text-brand-emerald focus:ring-brand-emerald cursor-pointer mt-0.5"
                  />
                  <div>
                    <Label htmlFor="noindex" className="text-xs font-bold text-brand-navy cursor-pointer flex items-center gap-1.5">
                      <AlertCircle className="size-4 text-red-500 shrink-0" /> Désactiver l'indexation (noindex, nofollow)
                    </Label>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5 leading-relaxed">
                      Cochez cette option si vous souhaitez empêcher les moteurs de recherche (Google, Bing) d'indexer cette page.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Save Button */}
          <div className="text-right">
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="bg-brand-emerald text-white hover:bg-brand-emerald-dark font-bold rounded-xl px-6 py-3 h-fit text-xs border-none flex items-center gap-1.5 shadow-sm cursor-pointer ml-auto"
            >
              {isPending ? "Enregistrement..." : "Enregistrer la Configuration SEO"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
