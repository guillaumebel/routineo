import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import { db } from "../../firebaseConfig";
import MaterialButton from "../components/common/MaterialButton";
import MaterialCard from "../components/common/MaterialCard";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { createHabitDetailStyles } from "../design/screenStyles";
import { Habit, RootStackParamList } from "../types";

type HabitDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "HabitDetail"
>;
type HabitDetailScreenRouteProp = RouteProp<RootStackParamList, "HabitDetail">;

interface HabitDetailScreenProps {
  route: HabitDetailScreenRouteProp;
  navigation: HabitDetailScreenNavigationProp;
}

export default function HabitDetailScreen({
  route,
  navigation,
}: HabitDetailScreenProps) {
  const { habitId } = route.params;
  const [habit, setHabit] = useState<Habit | null>(null);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadHabit();
  }, []);

  const loadHabit = async (): Promise<void> => {
    try {
      const habitDoc = await getDoc(doc(db, "habits", habitId));
      if (habitDoc.exists()) {
        const habitData = { id: habitDoc.id, ...habitDoc.data() } as Habit;

        if (habitData.userId !== currentUser?.uid) {
          Alert.alert(t("common.error"), t("validation.unauthorizedAccess"));
          navigation.goBack();
          return;
        }

        setHabit(habitData);
      } else {
        Alert.alert(t("common.error"), t("validation.habitNotFound"));
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert(t("common.error"), error.message);
      navigation.goBack();
    }
  };

  const checkIfCompletedToday = (): boolean => {
    if (!habit || !habit.completions) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return habit.completions.some((completion) => {
      const completionDate = completion.toDate();
      completionDate.setHours(0, 0, 0, 0);
      return completionDate.getTime() === today.getTime();
    });
  };

  const handleCheckIn = async (): Promise<void> => {
    if (!currentUser?.uid) {
      Alert.alert(t("common.error"), t("validation.mustBeLoggedIn"));
      return;
    }

    if (!habit || habit.userId !== currentUser.uid) {
      Alert.alert(t("common.error"), t("validation.unauthorizedAccess"));
      return;
    }

    if (checkIfCompletedToday()) {
      Alert.alert(t("messages.habitCompleted"), t("messages.alreadyCheckedIn"));
      return;
    }

    try {
      await updateDoc(doc(db, "habits", habitId), {
        completions: arrayUnion(Timestamp.now()),
      });
      loadHabit();
      Alert.alert(t("common.successTitle"), t("messages.checkInSuccess"));
    } catch (error: any) {
      Alert.alert(t("common.error"), error.message);
    }
  };

  const handleDeleteHabit = (): void => {
    if (!currentUser?.uid) {
      Alert.alert(t("common.error"), t("validation.mustBeLoggedIn"));
      return;
    }

    if (!habit || habit.userId !== currentUser.uid) {
      Alert.alert(t("common.error"), t("validation.unauthorizedAccess"));
      return;
    }

    Alert.alert(t("habits.deleteHabit"), t("messages.confirmDelete"), [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "habits", habitId));
            navigation.goBack();
          } catch (error: any) {
            Alert.alert(t("common.error"), error.message);
          }
        },
      },
    ]);
  };

  const styles = createHabitDetailStyles(theme);

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const isCompletedToday = checkIfCompletedToday();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <MaterialCard variant="filled" style={styles.headerCard}>
          <Text style={styles.habitName}>{habit.name}</Text>
          {habit.description && (
            <Text style={styles.habitDescription}>{habit.description}</Text>
          )}
          <Text style={styles.habitFrequency}>
            {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}{" "}
            Goal
          </Text>
        </MaterialCard>

        <View style={styles.content}>
          <MaterialButton
            variant={isCompletedToday ? "filled" : "elevated"}
            title={
              isCompletedToday
                ? `✓ ${t("messages.completedToday")}`
                : t("messages.checkInForToday")
            }
            onPress={handleCheckIn}
            disabled={isCompletedToday}
            style={styles.checkInButton}
            icon={isCompletedToday ? "check" : "today"}
          />

          <MaterialCard variant="elevated" style={styles.statsCard}>
            <Text style={styles.statsTitle}>{t("habits.statistics")}</Text>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Completions:</Text>
              <Text style={styles.statValue}>
                {habit.completions?.length || 0}
              </Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Current Streak:</Text>
              <Text style={styles.statValue}>
                {calculateStreak(habit.completions)} {t("messages.days")}
              </Text>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Created:</Text>
              <Text style={styles.statValue}>
                {habit.createdAt?.toDate().toLocaleDateString()}
              </Text>
            </View>
          </MaterialCard>

          <MaterialCard variant="elevated" style={styles.historyCard}>
            <Text style={styles.historyTitle}>Recent Check-ins</Text>
            {habit.completions && habit.completions.length > 0 ? (
              habit.completions
                .slice()
                .sort((a, b) => b.toDate().getTime() - a.toDate().getTime())
                .slice(0, 10)
                .map((completion, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={styles.historyDate}>
                      {completion.toDate().toLocaleDateString()}
                    </Text>
                    <MaterialIcons
                      name="check"
                      size={20}
                      color={theme.primary}
                    />
                  </View>
                ))
            ) : (
              <Text style={styles.emptyText}>No check-ins yet</Text>
            )}
          </MaterialCard>

          <MaterialButton
            variant="outlined"
            title={t("habits.deleteHabit")}
            onPress={handleDeleteHabit}
            style={styles.deleteButton}
            icon="delete"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const calculateStreak = (completions: any[]): number => {
  if (!completions || completions.length === 0) return 0;

  const sortedCompletions = [...completions].sort(
    (a, b) => b.toDate() - a.toDate()
  );
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedCompletions.length; i++) {
    const completionDate = sortedCompletions[i].toDate();
    completionDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);

    if (completionDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
