import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LevelTestProvider } from "@/context/LevelTestContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { LevelTestModal } from "@/components/client/LevelTestModal";

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
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <LevelTestModal />
            
            {/* Sticky WhatsApp Button */}
            <a
              href="https://wa.me/212663068618"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#20ba5a] transition-all hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
              aria-label="Contactez-nous sur WhatsApp"
            >
              <svg className="size-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2C6.49 2 2 6.48 2 12.02c0 1.8.47 3.49 1.3 4.97L2 22l5.14-1.27c1.43.78 3.06 1.22 4.81 1.22 5.54 0 10.03-4.48 10.03-10.02C22.062 6.48 17.572 2 12.031 2zm0 18.04c-1.57 0-3.1-.42-4.43-1.21l-.32-.19-3.29.81.83-3.21-.21-.34c-.87-1.39-1.33-3-1.33-4.68 0-4.8 3.91-8.71 8.71-8.71 4.8 0 8.71 3.91 8.71 8.71 0 4.8-3.91 8.71-8.71 8.71h-.03z" />
                <path d="M15.93 13.56c-.22-.11-1.29-.63-1.49-.71-.2-.07-.35-.11-.49.1-.14.21-.56.71-.69.86-.13.15-.26.17-.48.06-.22-.11-.93-.34-1.78-1.1-1.27-1.14-1.34-1.89-1.47-2.12-.13-.22-.01-.35.1-.46.1-.1.22-.26.33-.38.11-.13.15-.21.22-.35.07-.14.04-.26-.02-.38-.06-.11-.49-1.18-.67-1.62-.18-.43-.36-.37-.49-.38-.13-.01-.27-.01-.41-.01-.14 0-.38.05-.58.27-.2.22-.76.75-.76 1.83 0 1.08.79 2.12.9 2.27.11.15 1.55 2.37 3.76 3.32.53.23.94.37 1.26.47.53.17 1.01.14 1.39.09.43-.06 1.3-.53 1.48-1.04.19-.51.19-.95.13-1.04-.06-.09-.2-.14-.42-.25z" />
              </svg>
            </a>
          </LevelTestProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

