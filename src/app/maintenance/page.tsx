import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function MaintenancePage() {
  // Query contact settings dynamically from the database
  let phone = "+212 6 63 06 86 18";
  let address = "rue ibnou katir, résidence les perles de casablanca n1";
  let email = "contact@nextpoint.ma";
  let message = "Notre site est actuellement en cours de maintenance pour amélioration. Nous serons de retour très bientôt !";

  try {
    const phoneSet = await db.siteSetting.findUnique({ where: { key: "contact_phone" } });
    const addressSet = await db.siteSetting.findUnique({ where: { key: "contact_address" } });
    const emailSet = await db.siteSetting.findUnique({ where: { key: "contact_email" } });
    const msgSet = await db.siteSetting.findUnique({ where: { key: "maintenance_message_fr" } });

    if (phoneSet) phone = phoneSet.value as string;
    if (addressSet) address = addressSet.value as string;
    if (emailSet) email = emailSet.value as string;
    if (msgSet) message = msgSet.value as string;
  } catch {
    // Graceful fallback to default values in case of DB offline
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-navy text-white p-6 relative overflow-hidden">
      
      {/* Background radial gradient highlights */}
      <div className="absolute inset-0 opacity-5 select-none pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto text-center space-y-8 relative z-10">
        
        {/* Brand logo header */}
        <div className="flex items-center gap-3">
          <GraduationCap className="size-12 text-brand-lime" />
          <div className="text-left">
            <h1 className="text-xl font-bold font-heading tracking-wide">Next Point Academy</h1>
            <p className="text-[10px] text-brand-lime font-extrabold uppercase tracking-widest">
              Language School
            </p>
          </div>
        </div>

        {/* Maintenance Message */}
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-extrabold uppercase tracking-widest text-brand-lime">
            Maintenance en Cours
          </span>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            Nous améliorons notre plateforme
          </h2>
          <p className="text-xs text-slate-350 leading-relaxed font-semibold">
            {message}
          </p>
        </div>

        {/* Divider line */}
        <div className="w-16 h-1 bg-brand-lime rounded-full" />

        {/* Offline Contact Panel */}
        <div className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 text-left">
          <h4 className="text-[10px] font-extrabold uppercase text-brand-lime tracking-wider border-b border-white/10 pb-2">
            Nous Contacter pendant la maintenance
          </h4>

          <div className="space-y-3.5 text-xs font-bold text-slate-200">
            <div className="flex items-center gap-3">
              <Phone className="size-4 text-brand-lime shrink-0" />
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                {phone}
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="size-4 text-brand-lime shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                {email}
              </a>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="size-4 text-brand-lime shrink-0 mt-0.5" />
              <span className="leading-relaxed">{address}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="text-center text-[10px] text-slate-500 font-bold relative z-10">
        &copy; {new Date().getFullYear()} Next Point Academy. Tous droits réservés.
      </div>
    </div>
  );
}
