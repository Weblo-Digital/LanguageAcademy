"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-brand-navy tracking-tight font-heading">
            Portail Admin
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Next Point Academy — Master Administration
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          {state?.error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold px-4 py-3.5 rounded-xl border border-red-100">
              {state.error}
            </div>
          )}

          <div className="space-y-1.5 text-left">
            <Label htmlFor="email" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Adresse Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@nextpoint.ma"
              required
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <Label htmlFor="password" className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Mot de passe
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-xs text-brand-navy font-bold outline-none focus:border-brand-emerald"
            />
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-brand-emerald text-white hover:bg-brand-emerald-dark font-bold rounded-xl py-6 text-xs transition-colors duration-200 cursor-pointer shadow-md border-none"
          >
            {pending ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
