"use client";

import { useState, useTransition } from "react";
import { 
  updateSubmissionStatus, 
  updateSubmissionNotes, 
  deleteSubmission 
} from "@/lib/actions/submissions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Trash2, 
  Calendar, 
  FileText, 
  ExternalLink,
  MessageSquare,
  BadgeAlert,
  UserCheck
} from "lucide-react";
type FormType = "CONTACT" | "LEVEL_TEST" | "NEWSLETTER" | "LEAD_CAPTURE";
type SubmissionStatus = "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";

const FormType = {
  CONTACT: "CONTACT",
  LEVEL_TEST: "LEVEL_TEST",
  NEWSLETTER: "NEWSLETTER",
  LEAD_CAPTURE: "LEAD_CAPTURE",
} as const;

const SubmissionStatus = {
  UNREAD: "UNREAD",
  READ: "READ",
  REPLIED: "REPLIED",
  ARCHIVED: "ARCHIVED",
} as const;

interface Submission {
  id: number;
  formType: FormType;
  data: any; // Json
  sourcePage: string | null;
  ipAddress: string | null;
  status: SubmissionStatus;
  adminNotes: string | null;
  createdAt: Date;
  readAt: Date | null;
}

interface SubmissionsManagerProps {
  initialSubmissions: Submission[];
  userRole: string;
}

export function SubmissionsManager({ initialSubmissions, userRole }: SubmissionsManagerProps) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);
  const [notesText, setNotesText] = useState("");
  
  const [isPending, startTransition] = useTransition();

  // Map Submission Types to color badges
  const typeBadges: Record<FormType, string> = {
    CONTACT: "bg-blue-50 text-blue-700 border-blue-100",
    LEVEL_TEST: "bg-purple-50 text-purple-700 border-purple-100",
    NEWSLETTER: "bg-amber-50 text-amber-700 border-amber-100",
    LEAD_CAPTURE: "bg-teal-50 text-teal-700 border-teal-100",
  };

  const statusBadges: Record<SubmissionStatus, string> = {
    UNREAD: "bg-red-50 text-red-700 border-red-100 font-extrabold animate-pulse",
    READ: "bg-slate-100 text-slate-700 border-slate-200",
    REPLIED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    ARCHIVED: "bg-zinc-100 text-zinc-500 border-zinc-200",
  };

  const filtered = submissions.filter((sub) => {
    const matchesType = filterType === "ALL" || sub.formType === filterType;
    const matchesStatus = filterStatus === "ALL" || sub.status === filterStatus;
    
    // Search within data object values
    const dataString = JSON.stringify(sub.data).toLowerCase();
    const notesString = (sub.adminNotes || "").toLowerCase();
    const pageString = (sub.sourcePage || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      dataString.includes(query) || 
      notesString.includes(query) || 
      pageString.includes(query);

    return matchesType && matchesStatus && matchesSearch;
  });

  const selectSubmission = (sub: Submission) => {
    setSelectedSub(sub);
    setNotesText(sub.adminNotes || "");
    
    // Automatically mark as READ if it is currently UNREAD
    if (sub.status === SubmissionStatus.UNREAD) {
      handleStatusChange(sub.id, SubmissionStatus.READ);
    }
  };

  const handleStatusChange = (id: number, status: SubmissionStatus) => {
    startTransition(async () => {
      const res = await updateSubmissionStatus(id, status);
      if (res.success) {
        setSubmissions((prev) =>
          prev.map((sub: any) =>
            sub.id === id ? { ...sub, status, readAt: status === SubmissionStatus.READ ? new Date() : sub.readAt } : sub
          )
        );
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub((prev) => prev ? { ...prev, status } : null);
        }
      }
    });
  };

  const handleSaveNotes = (id: number) => {
    startTransition(async () => {
      const res = await updateSubmissionNotes(id, notesText);
      if (res.success) {
        setSubmissions((prev) =>
          prev.map((sub: any) =>
            sub.id === id ? { ...sub, adminNotes: notesText } : sub
          )
        );
        alert("Notes enregistrées !");
      }
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette soumission ? Cette action est irréversible.")) {
      return;
    }

    startTransition(async () => {
      const res = await deleteSubmission(id);
      if (res.success) {
        setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
        setSelectedSub(null);
      } else {
        alert(res.error || "Erreur de suppression.");
      }
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-brand-navy font-heading">
            Formulaires Soumis
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Consultez, gérez et répondez aux prospects de l'académie
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher nom, email, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-brand-navy outline-none focus:border-brand-emerald"
          />
        </div>

        <div className="lg:col-span-3 flex items-center gap-2">
          <Filter className="size-4 text-slate-400 shrink-0" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-brand-navy outline-none focus:border-brand-emerald cursor-pointer"
          >
            <option value="ALL">Tous les formulaires</option>
            <option value="CONTACT">Contact direct</option>
            <option value="LEVEL_TEST">Test de Niveau</option>
            <option value="LEAD_CAPTURE">Téléchargement Guide</option>
            <option value="NEWSLETTER">Newsletter</option>
          </select>
        </div>

        <div className="lg:col-span-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-brand-navy outline-none focus:border-brand-emerald cursor-pointer"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="UNREAD">Non lu</option>
            <option value="READ">Lu / En cours</option>
            <option value="REPLIED">Répondu</option>
            <option value="ARCHIVED">Archivé</option>
          </select>
        </div>
        
        <div className="lg:col-span-2 text-right text-[11px] text-slate-400 font-bold">
          {filtered.length} résultat(s)
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Table / List */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-bold">
                Aucune soumission trouvée
              </div>
            ) : (
              filtered.map((sub: any) => {
                const subDate = new Date(sub.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                });
                return (
                  <div
                    key={sub.id}
                    onClick={() => selectSubmission(sub)}
                    className={`p-4 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                      selectedSub?.id === sub.id ? "bg-slate-50 border-l-4 border-brand-emerald pl-3" : ""
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${typeBadges[sub.formType]}`}>
                          {sub.formType.replace("_", " ")}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${statusBadges[sub.status]}`}>
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-xs font-black text-brand-navy truncate">
                        {sub.data.name || sub.data.email || "Utilisateur Anonyme"}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">
                        {sub.data.email || ""} {sub.data.phone ? `• ${sub.data.phone}` : ""}
                      </p>
                    </div>

                    <div className="text-right shrink-0 space-y-1">
                      <div className="flex items-center gap-1 justify-end text-[10px] text-slate-400 font-bold">
                        <Calendar className="size-3" />
                        <span>{subDate}</span>
                      </div>
                      {sub.adminNotes && (
                        <div className="text-[9px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 font-bold inline-block">
                          Note
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Detail Viewer */}
        <div className="lg:col-span-5">
          {selectedSub ? (
            <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-6 text-left">
              <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">
                    Détail de la demande
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                    Soumis le {new Date(selectedSub.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>
                {userRole === "SUPER_ADMIN" && (
                  <button
                    onClick={() => handleDelete(selectedSub.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer border-none"
                    title="Supprimer la soumission"
                  >
                    <Trash2 className="size-4.5" />
                  </button>
                )}
              </div>

              {/* Status Controller */}
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Statut du dossier
                </label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleStatusChange(selectedSub.id, SubmissionStatus.READ)}
                    disabled={selectedSub.status === SubmissionStatus.READ}
                    className={`flex-1 text-[10px] font-bold rounded-lg py-2 h-fit border-none ${
                      selectedSub.status === SubmissionStatus.READ 
                        ? "bg-slate-200 text-slate-700 cursor-default" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Marquer Lu
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(selectedSub.id, SubmissionStatus.REPLIED)}
                    disabled={selectedSub.status === SubmissionStatus.REPLIED}
                    className={`flex-1 text-[10px] font-bold rounded-lg py-2 h-fit border-none ${
                      selectedSub.status === SubmissionStatus.REPLIED 
                        ? "bg-emerald-200 text-emerald-800 cursor-default" 
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    <UserCheck className="size-3.5 mr-1" /> Répondu
                  </Button>
                  <Button
                    onClick={() => handleStatusChange(selectedSub.id, SubmissionStatus.ARCHIVED)}
                    disabled={selectedSub.status === SubmissionStatus.ARCHIVED}
                    className={`flex-1 text-[10px] font-bold rounded-lg py-2 h-fit border-none ${
                      selectedSub.status === SubmissionStatus.ARCHIVED 
                        ? "bg-zinc-200 text-zinc-600 cursor-default" 
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    Archiver
                  </Button>
                </div>
              </div>

              {/* Submitted Payload Details */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {Object.entries(selectedSub.data).map(([key, val]: any) => (
                  <div key={key} className="space-y-1">
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider">
                      {key}
                    </span>
                    <p className="text-xs text-brand-navy font-bold whitespace-pre-line leading-relaxed">
                      {val || "N/A"}
                    </p>
                  </div>
                ))}
                {selectedSub.sourcePage && (
                  <div className="space-y-1 pt-2 border-t border-slate-200/60">
                    <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <ExternalLink className="size-3" /> Page Source
                    </span>
                    <p className="text-[10px] text-brand-navy font-bold">
                      {selectedSub.sourcePage}
                    </p>
                  </div>
                )}
              </div>

              {/* Admin Notes Section */}
              <div className="space-y-2 border-t border-slate-100 pt-4 text-left">
                <label htmlFor="admin-notes" className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="size-3.5" /> Notes Administrateur
                </label>
                <textarea
                  id="admin-notes"
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Ajouter des notes internes sur ce contact (ex: a été appelé le 12/03, intéressé par DELF)..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold outline-none cursor-text focus:border-brand-emerald resize-y"
                />
                <Button
                  onClick={() => handleSaveNotes(selectedSub.id)}
                  disabled={isPending}
                  className="w-full bg-brand-navy text-white hover:bg-brand-navy/90 text-[10px] font-bold rounded-lg py-2.5 h-fit border-none shadow-sm"
                >
                  {isPending ? "Sauvegarde..." : "Enregistrer les Notes"}
                </Button>
              </div>
            </Card>
          ) : (
            <div className="bg-slate-100/50 border border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-xs font-bold h-full flex flex-col items-center justify-center space-y-2">
              <BadgeAlert className="size-8 text-slate-300" />
              <p>Sélectionnez un formulaire à gauche pour en afficher les détails</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
