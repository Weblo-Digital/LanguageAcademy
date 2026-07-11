"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LevelTestContextType {
  isOpen: boolean;
  initialLanguage: string;
  openTestModal: (lang?: string) => void;
  closeTestModal: () => void;
}

const LevelTestContext = createContext<LevelTestContextType | undefined>(undefined);

export function LevelTestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialLanguage, setInitialLanguage] = useState("anglais");

  const openTestModal = (lang?: string) => {
    if (lang) {
      // Map language code to option value
      const mapping: Record<string, string> = {
        en: "anglais",
        fr: "francais",
        es: "espagnol",
        ar: "arabe",
      };
      setInitialLanguage(mapping[lang] || "anglais");
    } else {
      setInitialLanguage("anglais");
    }
    setIsOpen(true);
  };
  
  const closeTestModal = () => setIsOpen(false);

  return (
    <LevelTestContext.Provider value={{ isOpen, initialLanguage, openTestModal, closeTestModal }}>
      {children}
    </LevelTestContext.Provider>
  );
}

export function useLevelTest() {
  const context = useContext(LevelTestContext);
  if (!context) {
    throw new Error("useLevelTest must be used within a LevelTestProvider");
  }
  return context;
}
