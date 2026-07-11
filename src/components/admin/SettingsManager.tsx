"use client";

import { useState, useTransition } from "react";
import { saveSiteSettings } from "@/lib/actions/settings";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  ShieldAlert, 
  MapPin, 
  Mail, 
  Save, 
  Flame 
} from "lucide-react";

interface Setting {
  key: string;
  value: any;
}

interface SettingsManagerProps {
  initialSettings: Setting[];
}

export function SettingsManager({ initialSettings }: SettingsManagerProps) {
  // Helper to retrieve value by key
  const getValue = (key: string, fallback: any) => {
    const item = initialSettings.find(s => s.key === key);
    return item !== undefined ? item.value : fallback;
  };

  // State bindings
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(getValue("maintenance_mode", false));
  const [maintenanceMsgFr, setMaintenanceMsgFr] = useState<string>(getValue("maintenance_message_fr", ""));
  const [maintenanceMsgEn, setMaintenanceMsgEn] = useState<string>(getValue("maintenance_message_en", ""));
  const [allowedIps, setAllowedIps] = useState<string>(
    (getValue("maintenance_allowed_ips", []) as string[]).join(", ")
  );

  const [comingSoonMode, setComingSoonMode] = useState<boolean>(getValue("coming_soon_mode", false));
  const [comingSoonRoutes, setComingSoonRoutes] = useState<string>(
    (getValue("coming_soon_routes", []) as string[]).join(", ")
  );
  const [comingSoonDate, setComingSoonDate] = useState<string>(getValue("coming_soon_date", ""));

  const [contactPhone, setContactPhone] = useState<string>(getValue("contact_phone", ""));
  const [contactAddress, setContactAddress] = useState<string>(getValue("contact_address", ""));
  const [contactEmail, setContactEmail] = useState<string>(getValue("contact_email", ""));
  const [openingHours, setOpeningHours] = useState<string>(getValue("opening_hours", ""));
  const [emailProvider, setEmailProvider] = useState<string>(getValue("email_provider", "both"));

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    // Parse comma-separated strings to arrays
    const parsedIps = allowedIps
      .split(",")
      .map(ip => ip.trim())
      .filter(ip => ip.length > 0);
      
    const parsedRoutes = comingSoonRoutes
      .split(",")
      .map(r => r.trim())
      .filter(r => r.length > 0);

    startTransition(async () => {
      const res = await saveSiteSettings({
        maintenance_mode: maintenanceMode,
        maintenance_message_fr: maintenanceMsgFr,
        maintenance_message_en: maintenanceMsgEn,
        maintenance_allowed_ips: parsedIps,
        coming_soon_mode: comingSoonMode,
        coming_soon_routes: parsedRoutes,
        coming_soon_date: comingSoonDate,
        contact_phone: contactPhone,
        contact_address: contactAddress,
        contact_email: contactEmail,
        opening_hours: openingHours,
        email_provider: emailProvider,
      });

      if (res.success) {
        alert("Paramètres système enregistrés avec succès !");
      } else {
        alert(res.error || "Erreur lors de l'enregistrement");
      }
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto text-left">
      
      {/* Header bar */}
      <div className="flex justify-between items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-brand-navy font-heading">
            Configuration Système
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Gérez la maintenance, les accès d'attente, les coordonnées globales et la messagerie
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={isPending}
          className="bg-brand-emerald text-white hover:bg-brand-emerald-dark font-bold rounded-xl px-5 py-3 h-fit text-xs border-none flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Save className="size-4" /> {isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      <div className="space-y-6">
        
        {/* Maintenance mode */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-4">
          <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="size-4.5 text-red-500" /> Mode Maintenance
          </h3>

          <div className="flex items-center gap-2 pb-2">
            <input
              id="maintenanceMode"
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="size-4 border-slate-300 rounded text-brand-emerald focus:ring-brand-emerald cursor-pointer"
            />
            <Label htmlFor="maintenanceMode" className="text-xs font-bold text-brand-navy cursor-pointer">
              Activer le mode maintenance (Redirige les visiteurs publics vers un écran d'attente)
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="m-fr" className="text-[10px] font-extrabold uppercase text-slate-400">
                Message en Français
              </Label>
              <textarea
                id="m-fr"
                value={maintenanceMsgFr}
                onChange={(e) => setMaintenanceMsgFr(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald resize-y"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="m-en" className="text-[10px] font-extrabold uppercase text-slate-400">
                Message en Anglais
              </Label>
              <textarea
                id="m-en"
                value={maintenanceMsgEn}
                onChange={(e) => setMaintenanceMsgEn(e.target.value)}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald resize-y"
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <Label htmlFor="ips" className="text-[10px] font-extrabold uppercase text-slate-400">
              IPs autorisées à contourner la maintenance (séparées par une virgule)
            </Label>
            <Input
              id="ips"
              type="text"
              value={allowedIps}
              onChange={(e) => setAllowedIps(e.target.value)}
              placeholder="Ex: 192.168.1.1, 82.22.12.14"
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
            />
          </div>
        </Card>

        {/* Coming soon page */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-4">
          <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="size-4.5 text-brand-lime" /> Mode Coming Soon
          </h3>

          <div className="flex items-center gap-2 pb-2">
            <input
              id="comingSoonMode"
              type="checkbox"
              checked={comingSoonMode}
              onChange={(e) => setComingSoonMode(e.target.checked)}
              className="size-4 border-slate-300 rounded text-brand-emerald focus:ring-brand-emerald cursor-pointer"
            />
            <Label htmlFor="comingSoonMode" className="text-xs font-bold text-brand-navy cursor-pointer">
              Activer Coming Soon pour des routes spécifiques (Redirige vers un compte à rebours)
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cs-routes" className="text-[10px] font-extrabold uppercase text-slate-400">
                Chemins ciblés (séparés par une virgule)
              </Label>
              <Input
                id="cs-routes"
                type="text"
                value={comingSoonRoutes}
                onChange={(e) => setComingSoonRoutes(e.target.value)}
                placeholder="Ex: /camps-ete, /examens/dele"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="cs-date" className="text-[10px] font-extrabold uppercase text-slate-400">
                Date de lancement (ISO 8601)
              </Label>
              <Input
                id="cs-date"
                type="text"
                value={comingSoonDate}
                onChange={(e) => setComingSoonDate(e.target.value)}
                placeholder="Ex: 2026-09-01T10:00:00.000Z"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>
          </div>
        </Card>

        {/* Global contacts */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-4">
          <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="size-4.5 text-brand-emerald" /> Coordonnées Globales de l'Académie
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-[10px] font-extrabold uppercase text-slate-400">
                Téléphone principal / WhatsApp
              </Label>
              <Input
                id="phone"
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[10px] font-extrabold uppercase text-slate-400">
                Adresse Email publique
              </Label>
              <Input
                id="email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="address" className="text-[10px] font-extrabold uppercase text-slate-400">
                Adresse physique
              </Label>
              <Input
                id="address"
                type="text"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="hours" className="text-[10px] font-extrabold uppercase text-slate-400">
                Horaires d'ouverture
              </Label>
              <Input
                id="hours"
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
              />
            </div>
          </div>
        </Card>

        {/* Email settings */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-4">
          <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="size-4.5 text-brand-lime" /> Configuration E-Mails
          </h3>

          <div className="space-y-1.5">
            <Label htmlFor="provider" className="text-[10px] font-extrabold uppercase text-slate-400">
              Fournisseur d'envoi actif (Failover Automatique)
            </Label>
            <select
              id="provider"
              value={emailProvider}
              onChange={(e) => setEmailProvider(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-brand-navy outline-none focus:border-brand-emerald cursor-pointer"
            >
              <option value="resend">Resend (Seulement)</option>
              <option value="brevo">Brevo (Seulement)</option>
              <option value="both">Resend (Primaire) + Brevo (Fallback)</option>
            </select>
          </div>
        </Card>

      </div>
    </div>
  );
}
