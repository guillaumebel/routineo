import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import MaterialButton from "../components/common/MaterialButton";
import MaterialTextInput from "../components/common/MaterialTextInput";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { createLoginStyles } from "../design/screenStyles";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { login, signup } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = async (): Promise<void> => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const styles = createLoginStyles(theme);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{t("home.appTitle")}</Text>
        <Text style={styles.subtitle}>
          {isLogin ? t("auth.signInToContinue") : t("auth.createYourAccount")}
        </Text>

        <MaterialTextInput
          label={t("auth.email")}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <MaterialTextInput
          label={t("auth.password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <MaterialButton
          variant="filled"
          title={isLogin ? t("auth.login") : t("auth.signUp")}
          onPress={handleSubmit}
          style={styles.button}
        />

        <MaterialButton
          variant="text"
          title={
            isLogin ? t("auth.dontHaveAccount") : t("auth.alreadyHaveAccount")
          }
          onPress={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
