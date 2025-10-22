import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import LanguageSelector from "../components/common/LanguageSelector";
import MaterialButton from "../components/common/MaterialButton";
import MaterialCard from "../components/common/MaterialCard";
import ThemeSwitcher from "../components/common/ThemeSwitcher";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { createProfileStyles } from "../design/screenStyles";

export default function ProfileScreen() {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const styles = createProfileStyles(theme);

  const handleLogout = (): void => {
    Alert.alert(t("profile.signOut"), t("profile.confirmSignOut"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("profile.signOut"),
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error: any) {
            Alert.alert(t("common.error"), error.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.appBar}>
          <Text style={styles.appBarTitle}>{t("profile.profile")}</Text>
        </View>

        <View style={styles.content}>
          <MaterialCard variant="filled" style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <MaterialIcons
                  name="person"
                  size={48}
                  color={theme.onPrimaryContainer}
                />
              </View>
              <Text style={styles.emailText}>{currentUser?.email}</Text>
            </View>
          </MaterialCard>

          <MaterialCard variant="elevated" style={styles.infoCard}>
            <Text style={styles.cardTitle}>
              {t("profile.accountInformation")}
            </Text>

            <View style={styles.infoRow}>
              <MaterialIcons
                name="email"
                size={24}
                color={theme.onSurfaceVariant}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>{t("profile.emailAddress")}</Text>
                <Text style={styles.value}>{currentUser?.email}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons
                name="today"
                size={24}
                color={theme.onSurfaceVariant}
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>{t("profile.userId")}</Text>
                <Text
                  style={styles.value}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                >
                  {currentUser?.uid || t("profile.unknown")}
                </Text>
              </View>
            </View>
          </MaterialCard>

          <MaterialCard variant="elevated" style={styles.settingsCard}>
            <Text style={styles.cardTitle}>{t("profile.settings")}</Text>
            <ThemeSwitcher />
          </MaterialCard>

          <LanguageSelector />

          <MaterialButton
            variant="outlined"
            title={t("profile.signOut")}
            onPress={handleLogout}
            style={styles.logoutButton}
            icon="logout"
          />
        </View>
      </ScrollView>
    </View>
  );
}
