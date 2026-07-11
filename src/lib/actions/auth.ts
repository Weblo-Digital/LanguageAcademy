"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Veuillez remplir tous les champs." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Identifiants de connexion invalides." };
        default:
          return { success: false, error: "Erreur de connexion. Veuillez réessayer." };
      }
    }
    // Re-throw Next.js redirect errors so the client receives the redirect header
    throw error;
  }
}
