"use client";

import { useEffect, useState, useActionState } from "react";
import { GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import { submitNewsletter } from "@/lib/actions/forms";
import { Button } from "@/components/ui/button";

export default function ComingSoonPage() {
  // Target launch date: September 1st, 2026 (or default fallback)
  const launchDate = new Date("2026-09-01T10:00:00.000Z").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [subscribed, setSubscribed] = useState(false);
  const [state, formAction, pending] = useActionState(submitNewsletter, null);

  useEffect(() => {
    const calculateTime = () => {
      const difference = launchDate - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [launchDate]);

  useEffect(() => {
    if (state?.success) {
      setSubscribed(true);
    }
  }, [state]);

  const padZero = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-navy text-white p-6 relative overflow-hidden">
      
      {/* Background radial grid */}
      <div className="absolute inset-0 opacity-5 select-none pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-12 relative z-10">
        
        {/* Brand header */}
        <div className="flex items-center gap-3">
          <GraduationCap className="size-12 text-brand-lime" />
          <div className="text-left">
            <h1 className="text-xl font-bold font-heading tracking-wide">Next Point Academy</h1>
            <p className="text-[10px] text-brand-lime font-extrabold uppercase tracking-widest">
              Language School
            </p>
          </div>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-extrabold uppercase tracking-widest text-brand-lime">
            Lancement Prochain
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
            Quelque chose d'extraordinaire arrive
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-semibold max-w-md mx-auto">
            Nous préparons nos formules d'été immersives avec nos professeurs natifs. Soyez les premiers à vous inscrire.
          </p>
        </div>

        {/* Live Countdown Timer Grid */}
        <div className="grid grid-cols-4 gap-4 max-w-md w-full">
          {[
            { label: "Jours", val: padZero(timeLeft.days) },
            { label: "Heures", val: padZero(timeLeft.hours) },
            { label: "Minutes", val: padZero(timeLeft.minutes) },
            { label: "Secondes", val: padZero(timeLeft.seconds) },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center shadow-md">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-lime tracking-tight tabular-nums">
                {item.val}
              </span>
              <span className="text-[9px] font-extrabold uppercase text-slate-400 tracking-wider mt-1.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Newsletter Box */}
        <div className="w-full max-w-sm">
          {!subscribed ? (
            <form action={formAction} className="flex gap-2">
              <input 
                type="hidden" 
                name="sourcePage" 
                value="/coming-soon" 
              />
              <div className="flex-1 flex flex-col text-left">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="votre.email@exemple.com"
                  className="bg-white/10 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white outline-none w-full placeholder-slate-400 focus:border-white/30"
                />
                {state?.errors?.email && (
                  <span className="text-[10px] text-red-400 font-bold mt-1">
                    {state.errors.email[0]}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                disabled={pending}
                className="bg-brand-lime text-brand-navy hover:bg-brand-lime-dark text-xs font-bold px-5 py-3.5 rounded-xl transition-all border-none flex items-center gap-1 cursor-pointer h-fit"
              >
                {pending ? "..." : (
                  <>
                    Notifiez-moi <ArrowRight className="size-3.5" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-2xl p-4 flex items-center justify-center gap-2 text-brand-lime animate-in fade-in duration-200">
              <CheckCircle2 className="size-5 shrink-0" />
              <span className="text-xs font-bold">
                {state?.message || "Vous serez notifié dès notre ouverture !"}
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Footer copyright */}
      <div className="text-center text-[10px] text-slate-500 font-bold relative z-10">
        &copy; {new Date().getFullYear()} Next Point Academy. Tous droits réservés.
      </div>
    </div>
  );
}
