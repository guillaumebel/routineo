import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Language = "en" | "fr";

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (language: Language) => void;
  availableLanguages: { code: Language; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const LANGUAGE_STORAGE_KEY = "@habittracker:language";

export const availableLanguages = [
  { code: "en" as Language, name: "English", nativeName: "English" },
  { code: "fr" as Language, name: "French", nativeName: "Français" },
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load saved language preference
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (
          savedLanguage &&
          (savedLanguage === "en" || savedLanguage === "fr")
        ) {
          setCurrentLanguage(savedLanguage);
          await i18n.changeLanguage(savedLanguage);
        } else {
          // Use current i18n language as default
          const currentLang = i18n.language === "fr" ? "fr" : "en";
          setCurrentLanguage(currentLang);
        }
      } catch (error) {
        console.error("Error loading language preference:", error);
      }
    };

    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (language: Language) => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
