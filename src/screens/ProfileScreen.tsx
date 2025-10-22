import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, Text, View } from "react-native";
import MaterialButton from "../components/common/MaterialButton";
import MaterialCard from "../components/common/MaterialCard";
import ThemeSwitcher from "../components/common/ThemeSwitcher";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { createProfileStyles } from "../design/screenStyles";

export default function ProfileScreen() {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();

  const styles = createProfileStyles(theme);

  const handleLogout = (): void => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Profile</Text>
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
          <Text style={styles.cardTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <MaterialIcons
              name="email"
              size={24}
              color={theme.onSurfaceVariant}
            />
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>Email Address</Text>
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
              <Text style={styles.label}>User ID</Text>
              <Text
                style={styles.value}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {currentUser?.uid || "Unknown"}
              </Text>
            </View>
          </View>
        </MaterialCard>

        <MaterialCard variant="elevated" style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Settings</Text>
          <ThemeSwitcher />
        </MaterialCard>

        <MaterialButton
          variant="outlined"
          title="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
          icon="logout"
        />
      </View>
    </View>
  );
}
