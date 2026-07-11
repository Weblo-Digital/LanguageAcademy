"use client";

import { useActionState, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { footerTranslations } from "@/lib/translations";
import { submitNewsletter } from "@/lib/actions/forms";

export function NewsletterForm() {
  const { language } = useLanguage();
  const t = footerTranslations[language];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [state, formAction, pending] = useActionState(submitNewsletter, null);

  const handleSubmit = (e: React.FormEvent) => {
    // Keep local control if needed, but we submit using native formAction now.
  };

  useEffect(() => {
    if (state?.success) {
      setSubscribed(true);
      setEmail("");
    }
  }, [state]);

  return (
    <div className="space-y-2">
      {!subscribed ? (
        <form action={formAction} className="flex flex-col sm:flex-row gap-2 max-w-sm">
          <input 
            type="hidden" 
            name="sourcePage" 
            value={typeof window !== "undefined" ? window.location.pathname : ""} 
          />
          
          <div className="flex-1 flex flex-col">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletterPlaceholder}
              required
              aria-label={language === "fr" ? "Adresse email pour la newsletter" : "Email address for newsletter"}
              className="bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white outline-none w-full placeholder-gray-400 focus:border-white/30"
            />
            {state?.errors?.email && (
              <span className="text-[10px] text-red-400 font-bold mt-1 text-left">
                {state.errors.email[0]}
              </span>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={pending}
            className="bg-brand-lime text-brand-navy hover:bg-brand-lime-dark text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer border-none h-fit shrink-0"
          >
            {pending ? "Envoi..." : t.subscribe}
          </button>
        </form>
      ) : (
        <p className="text-xs text-brand-lime font-bold">
          {state?.message || (language === "fr" ? "Merci pour votre inscription !" : "Thank you for subscribing!")}
        </p>
      )}
    </div>
  );
}
