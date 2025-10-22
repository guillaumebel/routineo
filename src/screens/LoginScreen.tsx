import React, { useState } from "react";
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
        <Text style={styles.title}>Routineo</Text>
        <Text style={styles.subtitle}>
          {isLogin ? "Sign in to continue" : "Create your account"}
        </Text>

        <MaterialTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <MaterialTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <MaterialButton
          variant="filled"
          title={isLogin ? "Login" : "Sign Up"}
          onPress={handleSubmit}
          style={styles.button}
        />

        <MaterialButton
          variant="text"
          title={
            isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"
          }
          onPress={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
