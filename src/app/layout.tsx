import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LevelTestProvider } from "@/context/LevelTestContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { RootLayoutShell } from "@/components/layout/RootLayoutShell";

import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/seo/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nextpoint.ma"),
  title: {
    default: "Next Point Academy | Cours de langues premium",
    template: "%s | Next Point Academy",
  },
  description: "Programmes d'excellence en langues étrangères et préparation aux examens internationaux.",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    siteName: "Next Point Academy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        
        <LanguageProvider>
          <LevelTestProvider>
            <RootLayoutShell>{children}</RootLayoutShell>
          </LevelTestProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

