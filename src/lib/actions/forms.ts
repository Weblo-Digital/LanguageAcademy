"use server";

import { db } from "@/lib/db";
import { sendNotificationEmail } from "@/lib/email";
import { z } from "zod";

// Zod schemas for input validation
const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  phone: z.string().optional(),
  message: z.string().min(5, "Le message doit comporter au moins 5 caractères."),
  sourcePage: z.string().optional(),
});

const leadCaptureSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  phone: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
});

const levelTestSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse email invalide."),
  phone: z.string().min(8, "Numéro WhatsApp invalide."),
  language: z.string().min(2, "Langue requise."),
  sourcePage: z.string().optional(),
});

const newsletterSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  sourcePage: z.string().optional(),
});

// Server Actions

export async function submitContactForm(prevState: any, formData: FormData) {
  const rawFields = Object.fromEntries(formData.entries());
  
  const parsed = contactSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, message, sourcePage } = parsed.data;

  try {
    const submission = await db.formSubmission.create({
      data: {
        formType: "CONTACT",
        data: { name, email, phone, message },
        sourcePage: sourcePage || "/contact",
      },
    });

    await sendNotificationEmail({
      formType: "Contact",
      data: { name, email, phone, message },
      sourcePage: sourcePage || "/contact",
    });

    return {
      success: true,
      message: "Votre message a été envoyé avec succès ! Notre équipe vous contactera sous peu.",
    };
  } catch (error) {
    console.error("Database save error inside contact action:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de l'enregistrement de votre demande. Veuillez réessayer.",
    };
  }
}

export async function submitLeadCapture(prevState: any, formData: FormData) {
  const rawFields = Object.fromEntries(formData.entries());
  
  const parsed = leadCaptureSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, message, sourcePage } = parsed.data;

  try {
    const isFullContact = !!message && message.trim().length > 0;
    
    await db.formSubmission.create({
      data: {
        formType: isFullContact ? "CONTACT" : "LEAD_CAPTURE",
        data: { name, email, phone, message },
        sourcePage: sourcePage || "/programmes",
      },
    });

    await sendNotificationEmail({
      formType: isFullContact ? "Contact" : "Lead Capture",
      data: { name, email, phone, message },
      sourcePage: sourcePage || "/programmes",
    });

    return {
      success: true,
      message: "Demande enregistrée avec succès ! Notre équipe vous contactera sous peu.",
    };
  } catch (error) {
    console.error("Database save error inside lead capture action:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de l'enregistrement de votre demande. Veuillez réessayer.",
    };
  }
}

export async function submitLevelTest(prevState: any, formData: FormData) {
  const rawFields = Object.fromEntries(formData.entries());
  
  const parsed = levelTestSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, phone, language, sourcePage } = parsed.data;

  try {
    await db.formSubmission.create({
      data: {
        formType: "LEVEL_TEST",
        data: { name, email, phone, language },
        sourcePage: sourcePage || "/eval-level",
      },
    });

    await sendNotificationEmail({
      formType: "Test de Niveau",
      data: { name, email, phone, language },
      sourcePage: sourcePage || "/eval-level",
    });

    return {
      success: true,
      message: "Inscription au test validée ! Nous vous contacterons sur WhatsApp pour démarrer le test.",
    };
  } catch (error) {
    console.error("Database save error inside level test action:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de l'enregistrement de votre demande. Veuillez réessayer.",
    };
  }
}

export async function submitNewsletter(prevState: any, formData: FormData) {
  const rawFields = Object.fromEntries(formData.entries());
  
  const parsed = newsletterSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, sourcePage } = parsed.data;

  try {
    await db.formSubmission.create({
      data: {
        formType: "NEWSLETTER",
        data: { email },
        sourcePage: sourcePage || "/",
      },
    });

    return {
      success: true,
      message: "Merci pour votre inscription à la newsletter !",
    };
  } catch (error) {
    console.error("Database save error inside newsletter action:", error);
    return {
      success: false,
      error: "Erreur d'enregistrement.",
    };
  }
}
