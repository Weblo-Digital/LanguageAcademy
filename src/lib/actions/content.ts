"use server";

import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth/dal";
import { revalidatePath } from "next/cache";

interface ProgramInput {
  duration: string;
  groupSize: string;
  level: string;
  modules: string[];
  strategy: string[];
  isActive: boolean;
  fr: {
    name: string;
    subhead: string;
    description: string;
    guideTitle: string;
  };
  en: {
    name: string;
    subhead: string;
    description: string;
    guideTitle: string;
  };
}

interface ExamInput {
  duration: string;
  validity: string;
  format: string;
  sections: { title: string; desc: string }[];
  strategy: string[];
  isActive: boolean;
  fr: {
    name: string;
    fullName: string;
    intro: string;
    guideTitle: string;
  };
  en: {
    name: string;
    fullName: string;
    intro: string;
    guideTitle: string;
  };
}

export async function updateProgram(id: number, input: ProgramInput) {
  const session = await requirePermission("content.edit");

  try {
    // 1. Fetch original program for audit logging
    const original = await db.program.findUnique({
      where: { id },
      include: { translations: true },
    });

    // 2. Perform transaction to update main program and translations
    await db.$transaction(async (tx) => {
      await tx.program.update({
        where: { id },
        data: {
          duration: input.duration,
          groupSize: input.groupSize,
          level: input.level,
          modules: input.modules,
          strategy: input.strategy,
          isActive: input.isActive,
        },
      });

      // Update French Translation
      await tx.programTranslation.upsert({
        where: { programId_locale: { programId: id, locale: "fr" } },
        update: {
          name: input.fr.name,
          subhead: input.fr.subhead,
          description: input.fr.description,
          guideTitle: input.fr.guideTitle,
        },
        create: {
          programId: id,
          locale: "fr",
          name: input.fr.name,
          subhead: input.fr.subhead,
          description: input.fr.description,
          guideTitle: input.fr.guideTitle,
        },
      });

      // Update English Translation
      await tx.programTranslation.upsert({
        where: { programId_locale: { programId: id, locale: "en" } },
        update: {
          name: input.en.name,
          subhead: input.en.subhead,
          description: input.en.description,
          guideTitle: input.en.guideTitle,
        },
        create: {
          programId: id,
          locale: "en",
          name: input.en.name,
          subhead: input.en.subhead,
          description: input.en.description,
          guideTitle: input.en.guideTitle,
        },
      });

      // Write Audit Log entry
      await tx.auditLog.create({
        data: {
          userId: session?.user?.id || "",
          action: "UPDATE",
          resource: "Program",
          resourceId: String(id),
          oldValue: JSON.parse(JSON.stringify(original)),
          newValue: JSON.parse(JSON.stringify(input)),
        },
      });
    });

    revalidatePath("/programmes");
    revalidatePath(`/programmes/${original?.slug}`);
    revalidatePath("/admin/content");

    return { success: true };
  } catch (error) {
    console.error("Program update error:", error);
    return { success: false, error: "Impossible de mettre à jour le programme." };
  }
}

export async function updateExam(id: number, input: ExamInput) {
  const session = await requirePermission("content.edit");

  try {
    const original = await db.exam.findUnique({
      where: { id },
      include: { translations: true },
    });

    await db.$transaction(async (tx) => {
      await tx.exam.update({
        where: { id },
        data: {
          duration: input.duration,
          validity: input.validity,
          format: input.format,
          sections: input.sections,
          strategy: input.strategy,
          isActive: input.isActive,
        },
      });

      // Update French Translation
      await tx.examTranslation.upsert({
        where: { examId_locale: { examId: id, locale: "fr" } },
        update: {
          name: input.fr.name,
          fullName: input.fr.fullName,
          intro: input.fr.intro,
          guideTitle: input.fr.guideTitle,
        },
        create: {
          examId: id,
          locale: "fr",
          name: input.fr.name,
          fullName: input.fr.fullName,
          intro: input.fr.intro,
          guideTitle: input.fr.guideTitle,
        },
      });

      // Update English Translation
      await tx.examTranslation.upsert({
        where: { examId_locale: { examId: id, locale: "en" } },
        update: {
          name: input.en.name,
          fullName: input.en.fullName,
          intro: input.en.intro,
          guideTitle: input.en.guideTitle,
        },
        create: {
          examId: id,
          locale: "en",
          name: input.en.name,
          fullName: input.en.fullName,
          intro: input.en.intro,
          guideTitle: input.en.guideTitle,
        },
      });

      // Write Audit Log entry
      await tx.auditLog.create({
        data: {
          userId: session?.user?.id || "",
          action: "UPDATE",
          resource: "Exam",
          resourceId: String(id),
          oldValue: JSON.parse(JSON.stringify(original)),
          newValue: JSON.parse(JSON.stringify(input)),
        },
      });
    });

    revalidatePath("/examens");
    revalidatePath(`/examens/${original?.slug}`);
    revalidatePath("/admin/content");

    return { success: true };
  } catch (error) {
    console.error("Exam update error:", error);
    return { success: false, error: "Impossible de mettre à jour la certification." };
  }
}
