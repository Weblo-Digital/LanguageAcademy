"use client";

import { useState, useTransition, useActionState } from "react";
import { uploadMedia, deleteMedia } from "@/lib/actions/media";
import { hasPermission } from "@/lib/auth/rbac";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  FileText,
  Copy,
  Trash2,
  ExternalLink,
  CheckCircle,
  Eye,
  File
} from "lucide-react";

interface MediaFile {
  id: number;
  filename: string;
  r2Key: string;
  publicUrl: string;
  mimeType: string;
  sizeBytes: number;
  altText: string | null;
  createdAt: Date;
}

interface MediaManagerProps {
  initialFiles: MediaFile[];
  userRole: string;
}

export function MediaManager({ initialFiles, userRole }: MediaManagerProps) {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [altText, setAltText] = useState("");
  const [uploadKey, setUploadKey] = useState(0); // For resetting input file after upload
  
  const [state, formAction, pending] = useActionState(async (prevState: any, formData: FormData) => {
    const res = await uploadMedia(prevState, formData);
    if (res.success) {
      // Re-fetch files or append local state - for now, alert and reset
      setAltText("");
      setUploadKey(prev => prev + 1);
      // Wait for refresh or reload
      window.location.reload(); 
    }
    return res;
  }, null);

  const [isPending, startTransition] = useTransition();

  const handleCopy = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce fichier ? Il sera effacé définitivement de Cloudflare R2.")) {
      return;
    }

    startTransition(async () => {
      const res = await deleteMedia(id);
      if (res.success) {
        setFiles(prev => prev.filter(f => f.id !== id));
      } else {
        alert(res.error || "Erreur de suppression");
      }
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto text-left">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-xl font-bold text-brand-navy font-heading">
          Médiathèque (R2 Storage)
        </h1>
        <p className="text-xs text-slate-500 font-semibold mt-0.5">
          Téléversez vos images et documents sur Cloudflare R2 et copiez leurs liens d'accès
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Upload Form */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
            Nouveau fichier
          </h3>

          <form action={formAction} className="space-y-4">
            <div className="border-2 border-dashed border-slate-200 hover:border-brand-emerald rounded-2xl p-6 text-center transition-colors relative cursor-pointer group">
              <input
                key={uploadKey}
                type="file"
                name="file"
                required
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="space-y-2 pointer-events-none">
                <UploadCloud className="size-8 mx-auto text-slate-400 group-hover:text-brand-emerald transition-colors" />
                <p className="text-xs font-bold text-slate-600">
                  Parcourir un fichier
                </p>
                <p className="text-[10px] text-slate-400 font-bold">
                  Taille max: Images 5Mo, PDF/Docx 10Mo
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="altText" className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                Texte alternatif (Alt Image)
              </Label>
              <Input
                id="altText"
                name="altText"
                type="text"
                placeholder="Ex: Tuteur natif en classe"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald"
              />
            </div>

            {state?.error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold px-3 py-2 rounded-xl border border-red-100">
                {state.error}
              </div>
            )}

            {state?.success && (
              <div className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-100">
                {state.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-brand-emerald text-white hover:bg-brand-emerald-dark font-bold rounded-xl py-6 text-xs transition-colors duration-200 cursor-pointer shadow-sm border-none"
            >
              {pending ? "Téléversement..." : "Téléverser sur R2"}
            </Button>
          </form>
        </div>

        {/* Right Side: Media Files Grid */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
            Fichiers hébergés ({files.length})
          </h3>

          {files.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center text-slate-400 text-xs font-bold">
              Aucun fichier disponible dans la médiathèque
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {files.map((file: any) => {
                const isImg = file.mimeType.startsWith("image/");
                return (
                  <Card key={file.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between group relative">
                    
                    {/* Media Preview Box */}
                    <div className="aspect-video bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
                      {isImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={file.publicUrl}
                          alt={file.altText || file.filename}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <FileText className="size-8 mx-auto text-slate-400" />
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-1 block">
                            {file.mimeType.split("/")[1] || "DOC"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Meta info & Action bar */}
                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                      <div className="min-w-0">
                        <p className="text-[11px] font-black text-brand-navy truncate" title={file.filename}>
                          {file.filename}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold mt-0.5">
                          {formatSize(file.sizeBytes)} • {new Date(file.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>

                      <div className="flex gap-1.5 pt-2 border-t border-slate-100">
                        <Button
                          onClick={() => handleCopy(file.id, file.publicUrl)}
                          className={`flex-1 text-[9px] font-bold rounded-lg py-1.5 px-2 h-fit border-none flex items-center justify-center gap-1 ${
                            copiedId === file.id
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {copiedId === file.id ? (
                            <>
                              <CheckCircle className="size-3" /> Copié
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" /> URL
                            </>
                          )}
                        </Button>

                        <a
                          href={file.publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center"
                          title="Ouvrir le lien"
                        >
                          <Eye className="size-3" />
                        </a>

                        {hasPermission(userRole as any, "media.delete") && (
                          <Button
                            onClick={() => handleDelete(file.id)}
                            disabled={isPending}
                            className="bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[9px] font-bold py-1.5 px-2.5 h-fit border-none flex items-center justify-center"
                            title="Supprimer définitivement"
                          >
                            <Trash2 className="size-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
