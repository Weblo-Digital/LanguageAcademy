import { db as prisma } from "../src/lib/db";
import * as bcrypt from "bcryptjs";
import { programData } from "../src/lib/data/programs";
import { examData } from "../src/lib/data/exams";
import { languageData, levels } from "../src/lib/data/languages";

async function main() {
  console.log("Seeding started...");

  // 1. Create default SUPER_ADMIN user
  const adminEmail = "admin@nextpoint.ma";
  const defaultPassword = "adminpassword123";
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Super Admin",
      email: adminEmail,
      passwordHash: passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log(`Created default user: ${adminUser.email} (password: ${defaultPassword})`);

  // 2. Seed Languages and translations
  for (const [slug, data] of Object.entries(languageData)) {
    const lang = await prisma.language.upsert({
      where: { slug },
      update: {
        code: data.code,
      },
      create: {
        slug,
        code: data.code,
        isActive: true,
      },
    });

    // Add French translation
    await prisma.languageTranslation.upsert({
      where: {
        languageId_locale: {
          languageId: lang.id,
          locale: "fr",
        },
      },
      update: {},
      create: {
        languageId: lang.id,
        locale: "fr",
        name: data.name,
        fullName: data.fullName,
        description: data.description,
        levels: JSON.parse(JSON.stringify(levels)),
      },
    });

    // Add English translation (fallback/translated name)
    const enNames: Record<string, { name: string; fullName: string; desc: string }> = {
      anglais: {
        name: "English",
        fullName: "Intensive English Courses",
        desc: "Intensive English programs designed for professional development and global academic integration.",
      },
      francais: {
        name: "French",
        fullName: "Intensive French Courses",
        desc: "Immersive French courses to master active communication, writing, and social ease.",
      },
      espagnol: {
        name: "Spanish",
        fullName: "Intensive Spanish Courses",
        desc: "Explore practical and professional Spanish with our active method focused on spontaneous speaking.",
      },
      arabe: {
        name: "Arabic",
        fullName: "Intensive Arabic Courses",
        desc: "Discover the richness and structure of the Arabic language, tailored for professional, literary, and diplomatic goals.",
      },
    };

    const enData = enNames[slug] || { name: data.name, fullName: data.fullName, desc: data.description };

    await prisma.languageTranslation.upsert({
      where: {
        languageId_locale: {
          languageId: lang.id,
          locale: "en",
        },
      },
      update: {},
      create: {
        languageId: lang.id,
        locale: "en",
        name: enData.name,
        fullName: enData.fullName,
        description: enData.desc,
        levels: JSON.parse(JSON.stringify(levels)),
      },
    });
  }
  console.log("Languages seeded successfully.");

  // 3. Seed Programs and translations
  let pIndex = 0;
  for (const [slug, data] of Object.entries(programData)) {
    const program = await prisma.program.upsert({
      where: { slug },
      update: {
        duration: data.duration,
        groupSize: data.group,
        level: data.level,
        modules: data.modules,
        strategy: data.strategy,
      },
      create: {
        slug,
        duration: data.duration,
        groupSize: data.group,
        level: data.level,
        modules: data.modules,
        strategy: data.strategy,
        sortOrder: pIndex++,
        isActive: true,
      },
    });

    // French program details translation
    await prisma.programTranslation.upsert({
      where: {
        programId_locale: {
          programId: program.id,
          locale: "fr",
        },
      },
      update: {},
      create: {
        programId: program.id,
        locale: "fr",
        name: data.name,
        subhead: data.subhead,
        description: data.description,
        guideTitle: data.guideTitle,
      },
    });

    // English program details translation (standard fallback values)
    await prisma.programTranslation.upsert({
      where: {
        programId_locale: {
          programId: program.id,
          locale: "en",
        },
      },
      update: {},
      create: {
        programId: program.id,
        locale: "en",
        name: data.name,
        subhead: data.subhead,
        description: data.description,
        guideTitle: data.guideTitle,
      },
    });
  }
  console.log("Programs seeded successfully.");

  // 4. Seed Exams and translations
  let eIndex = 0;
  for (const [slug, data] of Object.entries(examData)) {
    const exam = await prisma.exam.upsert({
      where: { slug },
      update: {
        languageCode: data.language === "Anglais" ? "en" : data.language === "Français" ? "fr" : data.language === "Espagnol" ? "es" : "ar",
        duration: data.duration,
        validity: data.validity,
        format: data.format,
        sections: data.sections,
        strategy: data.strategy,
      },
      create: {
        slug,
        languageCode: data.language === "Anglais" ? "en" : data.language === "Français" ? "fr" : data.language === "Espagnol" ? "es" : "ar",
        duration: data.duration,
        validity: data.validity,
        format: data.format,
        sections: data.sections,
        strategy: data.strategy,
        sortOrder: eIndex++,
        isActive: true,
      },
    });

    // French translation
    await prisma.examTranslation.upsert({
      where: {
        examId_locale: {
          examId: exam.id,
          locale: "fr",
        },
      },
      update: {},
      create: {
        examId: exam.id,
        locale: "fr",
        name: data.name,
        fullName: data.fullName,
        intro: data.intro,
        guideTitle: data.guideTitle,
      },
    });

    // English translation
    await prisma.examTranslation.upsert({
      where: {
        examId_locale: {
          examId: exam.id,
          locale: "en",
        },
      },
      update: {},
      create: {
        examId: exam.id,
        locale: "en",
        name: data.name,
        fullName: data.fullName,
        intro: data.intro,
        guideTitle: data.guideTitle,
      },
    });
  }
  console.log("Exams seeded successfully.");

  // 5. Seed default Site Settings
  const defaultSettings = [
    { key: "maintenance_mode", value: false, description: "Active la page de maintenance globale pour tous les utilisateurs non-admins" },
    { key: "maintenance_message_fr", value: "Notre site est actuellement en cours de maintenance pour amélioration. Nous serons de retour très bientôt !", description: "Message de maintenance en Français" },
    { key: "maintenance_message_en", value: "Our site is currently undergoing scheduled maintenance. We will be back online shortly!", description: "Message de maintenance en Anglais" },
    { key: "maintenance_allowed_ips", value: [], description: "Liste d'adresses IP autorisées à contourner le mode maintenance" },
    { key: "coming_soon_mode", value: false, description: "Active la page coming-soon pour des chemins spécifiques" },
    { key: "coming_soon_routes", value: [], description: "Chemins ou URL ciblés par la page coming-soon" },
    { key: "coming_soon_date", value: "2026-09-01T10:00:00.000Z", description: "Date cible du compte à rebours de lancement" },
    { key: "contact_phone", value: "+212 6 63 06 86 18", description: "Numéro de téléphone principal de l'académie" },
    { key: "contact_address", value: "rue ibnou katir, résidence les perles de casablanca n1", description: "Adresse physique principale de l'académie" },
    { key: "contact_email", value: "contact@nextpoint.ma", description: "Adresse email officielle de l'académie" },
    { key: "opening_hours", value: "Lundi au Samedi : 10:00 - 21:00", description: "Description des horaires de travail" },
    { key: "email_provider", value: "both", description: "Fournisseur d'email actif: resend, brevo, ou both (failover)" }
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: {
        key: setting.key,
        value: setting.value,
        description: setting.description
      }
    });
  }
  console.log("Site Settings seeded successfully.");

  // 6. Seed default SEO Metadata
  const defaultSeo = [
    {
      pagePath: "/",
      titleFr: "Cours de langues premium à Casablanca",
      titleEn: "Premium Language Courses in Casablanca",
      descriptionFr: "Next Point Academy propose des formations certifiées d'excellence en Anglais, Français, Espagnol et Arabe. Étudiez avec des tuteurs natifs.",
      descriptionEn: "Next Point Academy offers certified training programs of excellence in English, French, Spanish, and Arabic. Study with native tutors.",
      noindex: false
    },
    {
      pagePath: "/contact",
      titleFr: "Contactez-nous | Next Point Academy",
      titleEn: "Contact Us | Next Point Academy",
      descriptionFr: "Une question ? Envie de nous rendre visite ? Retrouvez toutes nos coordonnées.",
      descriptionEn: "Have a question? Want to visit us? Find all of our contact coordinates.",
      noindex: false
    },
    {
      pagePath: "/examens",
      titleFr: "Préparation aux Examens Internationaux",
      titleEn: "Preparation for International Exams",
      descriptionFr: "Préparez vos examens IELTS, TOEFL, DELF, DALF, TCF et DELE avec nos formateurs certifiés.",
      descriptionEn: "Prepare for your IELTS, TOEFL, DELF, DALF, TCF, and DELE exams with our certified trainers.",
      noindex: false
    },
    {
      pagePath: "/institut",
      titleFr: "L'Institut | Next Point Academy",
      titleEn: "The Institute | Next Point Academy",
      descriptionFr: "Découvrez notre histoire, notre campus de référence et notre méthodologie d'enseignement active.",
      descriptionEn: "Discover our history, our benchmark campus, and our active teaching methodology.",
      noindex: false
    },
    {
      pagePath: "/camps-ete",
      titleFr: "Camps d'Été Linguistiques 2026",
      titleEn: "Summer Camps 2026",
      descriptionFr: "Camps d'été en immersion linguistique à Casablanca avec tuteurs natifs pour tous les âges.",
      descriptionEn: "Summer immersion language camps in Casablanca with native tutors for all ages.",
      noindex: false
    }
  ];

  for (const seo of defaultSeo) {
    await prisma.seoMetadata.upsert({
      where: { pagePath: seo.pagePath },
      update: {},
      create: {
        pagePath: seo.pagePath,
        titleFr: seo.titleFr,
        titleEn: seo.titleEn,
        descriptionFr: seo.descriptionFr,
        descriptionEn: seo.descriptionEn,
        noindex: seo.noindex
      }
    });
  }
  console.log("SEO Metadata seeded successfully.");

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
