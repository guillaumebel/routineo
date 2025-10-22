import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { triggerHapticFeedback } from "../../utils/platform";
import MaterialButton from "./MaterialButton";
import MaterialCard from "./MaterialCard";

export default function LanguageSelector() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { theme } = useTheme();

  const handleLanguageChange = async (languageCode: "en" | "fr") => {
    if (languageCode !== currentLanguage) {
      await triggerHapticFeedback("light");
      changeLanguage(languageCode);
    }
  };

  const styles = StyleSheet.create({
    container: {
      margin: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.onSurface,
      marginBottom: 12,
    },
    languageOption: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.outline,
    },
    lastOption: {
      borderBottomWidth: 0,
    },
    languageInfo: {
      flex: 1,
    },
    languageName: {
      fontSize: 16,
      color: theme.onSurface,
      fontWeight: "500",
    },
    nativeLanguageName: {
      fontSize: 14,
      color: theme.onSurfaceVariant,
      marginTop: 2,
    },
    buttonContainer: {
      flexDirection: "row",
      gap: 8,
    },
  });

  return (
    <MaterialCard variant="outlined" style={styles.container}>
      <Text style={styles.title}>{t("profile.language")}</Text>
      {availableLanguages.map((language, index) => (
        <View
          key={language.code}
          style={[
            styles.languageOption,
            index === availableLanguages.length - 1 && styles.lastOption,
          ]}
        >
          <View style={styles.languageInfo}>
            <Text style={styles.languageName}>{language.name}</Text>
            <Text style={styles.nativeLanguageName}>{language.nativeName}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MaterialButton
              variant={
                currentLanguage === language.code ? "filled" : "outlined"
              }
              title={
                currentLanguage === language.code
                  ? t("common.selected")
                  : t("common.select")
              }
              onPress={() => handleLanguageChange(language.code)}
              size="small"
            />
          </View>
        </View>
      ))}
    </MaterialCard>
  );
}
