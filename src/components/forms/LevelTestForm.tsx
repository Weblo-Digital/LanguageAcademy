"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { submitLevelTest } from "@/lib/actions/forms";
import { useLevelTest } from "@/context/LevelTestContext";

interface LevelTestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LevelTestForm({ open, onOpenChange }: LevelTestFormProps) {
  const { initialLanguage } = useLevelTest();
  const [langValue, setLangValue] = useState("anglais");
  const [state, formAction, pending] = useActionState(submitLevelTest, null);

  // Reset selected language value when modal resets/opens
  useEffect(() => {
    if (open) {
      setLangValue(initialLanguage || "anglais");
    }
  }, [open, initialLanguage]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {state?.success ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in duration-200">
            <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Demande reçue !</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              {state.message}
            </p>
            <Button 
              onClick={() => onOpenChange(false)} 
              className="mt-2 bg-brand-emerald text-white hover:bg-brand-emerald-dark font-bold rounded-xl text-xs py-4 px-6 border-none"
            >
              Fermer
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Test de niveau gratuit</DialogTitle>
              <DialogDescription>
                Remplissez le formulaire ci-dessous pour commencer votre test de
                niveau personnalisé.
              </DialogDescription>
            </DialogHeader>

            <form action={formAction} className="grid gap-4">
              <input 
                type="hidden" 
                name="sourcePage" 
                value={typeof window !== "undefined" ? window.location.pathname : ""} 
              />
              <input type="hidden" name="language" value={langValue} />

              <div className="grid gap-2 text-left">
                <Label htmlFor="level-test-name">Nom</Label>
                <Input
                  id="level-test-name"
                  name="name"
                  placeholder="Votre nom complet"
                  required
                />
                {state?.errors?.name && (
                  <span className="text-[10px] text-red-500 font-bold">
                    {state.errors.name[0]}
                  </span>
                )}
              </div>

              <div className="grid gap-2 text-left">
                <Label htmlFor="level-test-email">Email</Label>
                <Input
                  id="level-test-email"
                  name="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  required
                />
                {state?.errors?.email && (
                  <span className="text-[10px] text-red-500 font-bold">
                    {state.errors.email[0]}
                  </span>
                )}
              </div>

              <div className="grid gap-2 text-left">
                <Label htmlFor="level-test-phone">Numéro WhatsApp</Label>
                <Input
                  id="level-test-phone"
                  name="phone"
                  type="tel"
                  placeholder="+212 6XX XXX XXX"
                  required
                />
                {state?.errors?.phone && (
                  <span className="text-[10px] text-red-500 font-bold">
                    {state.errors.phone[0]}
                  </span>
                )}
              </div>

              <div className="grid gap-2 text-left">
                <Label>Langue souhaitée</Label>
                <Select value={langValue} onValueChange={(val) => setLangValue(val || "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir une langue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anglais">Anglais</SelectItem>
                    <SelectItem value="francais">Français</SelectItem>
                    <SelectItem value="espagnol">Espagnol</SelectItem>
                    <SelectItem value="arabe">Arabe</SelectItem>
                  </SelectContent>
                </Select>
                {state?.errors?.language && (
                  <span className="text-[10px] text-red-500 font-bold">
                    {state.errors.language[0]}
                  </span>
                )}
              </div>

              {state?.error && (
                <div className="bg-red-50 text-red-600 text-xs font-bold px-3 py-2.5 rounded-xl border border-red-100">
                  {state.error}
                </div>
              )}

              <Button
                type="submit"
                disabled={pending}
                className="mt-2 w-full bg-brand-emerald text-white hover:bg-brand-emerald-dark border-none font-bold rounded-xl py-6 text-xs shadow-sm"
              >
                {pending ? "Envoi en cours..." : "Commencer mon test gratuit"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

