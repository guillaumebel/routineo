import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import { db } from "../../firebaseConfig";
import MaterialButton from "../components/common/MaterialButton";
import MaterialCard from "../components/common/MaterialCard";
import MaterialTextInput from "../components/common/MaterialTextInput";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { createAddHabitStyles } from "../design/screenStyles";
import { RootStackParamList } from "../types";

type AddHabitScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddHabit"
>;

interface AddHabitScreenProps {
  navigation: AddHabitScreenNavigationProp;
}

export default function AddHabitScreen({ navigation }: AddHabitScreenProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleCreateHabit = async (): Promise<void> => {
    if (!name.trim()) {
      Alert.alert(t("common.error"), t("validation.pleaseEnterHabitName"));
      return;
    }

    if (!currentUser?.uid) {
      Alert.alert(t("common.error"), t("validation.mustBeLoggedIn"));
      return;
    }

    try {
      await addDoc(collection(db, "habits"), {
        name: name.trim(),
        description: description.trim(),
        frequency,
        userId: currentUser.uid,
        completions: [],
        createdAt: serverTimestamp(),
      });

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(t("common.error"), error.message);
    }
  };

  const frequencyOptions: ("daily" | "weekly" | "monthly")[] = [
    "daily",
    "weekly",
    "monthly",
  ];

  const styles = createAddHabitStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <MaterialCard variant="filled" style={styles.formCard}>
            <MaterialTextInput
              label={t("habits.habitName")}
              placeholder={t("habits.habitNamePlaceholder")}
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <MaterialTextInput
              label={t("habits.description")}
              placeholder={t("habits.descriptionPlaceholder")}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />

            <Text style={styles.label}>{t("habits.frequency")}</Text>
            <View style={styles.frequencyContainer}>
              {frequencyOptions.map((option) => (
                <MaterialButton
                  key={option}
                  variant={frequency === option ? "filled" : "outlined"}
                  title={t(`habits.${option}`)}
                  onPress={() => setFrequency(option)}
                  style={styles.frequencyButton}
                />
              ))}
            </View>

            <MaterialButton
              variant="filled"
              title={t("habits.createHabit")}
              onPress={handleCreateHabit}
              style={styles.button}
            />

            <MaterialButton
              variant="text"
              title={t("common.cancel")}
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
            />
          </MaterialCard>
        </View>
      </ScrollView>
    </View>
  );
}
