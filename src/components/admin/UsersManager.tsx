"use client";

import { useState, useTransition, useActionState, useEffect, useRef } from "react";
import { createAdminUser, toggleUserStatus, deleteUser } from "@/lib/actions/users";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  ShieldCheck, 
  ToggleLeft, 
  ToggleRight,
  CheckCircle,
  XCircle,
  Plus
} from "lucide-react";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  isActive: boolean;
}

interface UsersManagerProps {
  users: User[];
  currentUserId: string;
}

export function UsersManager({ users, currentUserId }: UsersManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [state, formAction, pending] = useActionState(createAdminUser, null);
  const [isPendingStatus, startStatusTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      alert(state.message || "Utilisateur créé !");
      setShowAddForm(false);
      formRef.current?.reset();
    } else if (state?.error) {
      alert(state.error);
    }
  }, [state]);

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    if (id === currentUserId) {
      alert("Vous ne pouvez pas désactiver votre propre compte !");
      return;
    }
    
    startStatusTransition(async () => {
      const res = await toggleUserStatus(id, !currentStatus);
      if (!res.success) {
        alert(res.error || "Erreur de modification du statut");
      }
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (id === currentUserId) {
      alert("Vous ne pouvez pas supprimer votre propre compte !");
      return;
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur ${name} ?`)) {
      return;
    }

    startStatusTransition(async () => {
      const res = await deleteUser(id);
      if (res.success) {
        alert("Utilisateur supprimé avec succès.");
      } else {
        alert(res.error || "Erreur de suppression");
      }
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-6xl mx-auto text-left">
      
      {/* Header bar */}
      <div className="flex justify-between items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-bold text-brand-navy font-heading">
            Comptes Administrateurs & RBAC
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">
            Gérez les comptes d'accès à l'administration et ajustez les rôles de sécurité
          </p>
        </div>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-brand-emerald text-white hover:bg-brand-emerald-dark font-bold rounded-xl px-5 py-3 h-fit text-xs border-none flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <UserPlus className="size-4" /> {showAddForm ? "Annuler" : "Créer un Administrateur"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Users list table */}
        <div className={showAddForm ? "lg:col-span-8" : "lg:col-span-12"}>
          <Card className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider">
                    Nom & Email
                  </th>
                  <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider">
                    Rôle de Sécurité
                  </th>
                  <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider">
                    Statut Actif
                  </th>
                  <th className="p-4 text-[10px] font-black text-brand-navy uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-600">
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 space-y-0.5">
                      <p className="text-brand-navy font-bold">{user.name || "Sans nom"}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{user.email}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                        user.role === "SUPER_ADMIN" 
                          ? "bg-red-50 text-red-700 border border-red-100" 
                          : user.role === "ADMIN" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.isActive)}
                        disabled={isPendingStatus || user.id === currentUserId}
                        className="text-slate-500 hover:text-slate-700 cursor-pointer disabled:opacity-50 border-none bg-transparent"
                      >
                        {user.isActive ? (
                          <ToggleRight className="size-6 text-brand-emerald" />
                        ) : (
                          <ToggleLeft className="size-6 text-slate-350" />
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(user.id, user.name || "")}
                        disabled={isPendingStatus || user.id === currentUserId}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer border-none disabled:opacity-40"
                        title="Supprimer"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Sidebar Creation Form */}
        {showAddForm && (
          <div className="lg:col-span-4">
            <Card className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl space-y-4">
              <h3 className="text-xs font-black text-brand-navy uppercase tracking-wider">
                Nouveau compte Admin
              </h3>

              <form ref={formRef} action={formAction} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[10px] font-extrabold uppercase text-slate-400">
                    Nom complet
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Ex: Hicham Bennani"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[10px] font-extrabold uppercase text-slate-400">
                    Adresse Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="bennani@nextpoint.ma"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-[10px] font-extrabold uppercase text-slate-400">
                    Mot de passe initial
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-brand-navy font-bold focus:border-brand-emerald"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-[10px] font-extrabold uppercase text-slate-400">
                    Rôle & Privilèges
                  </Label>
                  <select
                    id="role"
                    name="role"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-brand-navy outline-none focus:border-brand-emerald cursor-pointer"
                  >
                    <option value="EDITOR">EDITOR (Édition CMS)</option>
                    <option value="ADMIN">ADMIN (CMS & Formulaires)</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN (Système complet)</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={pending}
                  className="bg-brand-navy text-white hover:bg-slate-800 font-bold rounded-xl w-full py-3 h-fit text-xs border-none flex items-center justify-center gap-1.5 shadow-sm cursor-pointer mt-2"
                >
                  <Plus className="size-4" /> {pending ? "Création..." : "Provisionner l'Accès"}
                </Button>
              </form>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
