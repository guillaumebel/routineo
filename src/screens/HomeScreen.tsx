import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { JSX, useEffect, useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { db } from "../../firebaseConfig";
import AnimatedView from "../components/common/AnimatedView";
import MaterialCard from "../components/common/MaterialCard";
import MaterialFAB from "../components/common/MaterialFAB";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { createHomeStyles } from "../design/screenStyles";
import { Habit, RootStackParamList } from "../types";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { currentUser } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "habits"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const habitsData = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Habit)
      );
      setHabits(habitsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const calculateStreak = (completions: any[]): number => {
    if (!completions || completions.length === 0) return 0;

    const sortedCompletions = [...completions].sort(
      (a, b) => b.toDate().getTime() - a.toDate().getTime()
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

  const getCompletionRate = (habit: Habit): number => {
    if (!habit.completions || habit.completions.length === 0) return 0;

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const recentCompletions = habit.completions.filter(
      (completion) => completion.toDate() >= thirtyDaysAgo
    );

    return Math.round((recentCompletions.length / 30) * 100);
  };

  const renderHabitChart = (habit: Habit): JSX.Element => {
    const last7Days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      last7Days.push(date);
    }

    const completionDates =
      habit.completions?.map((c) => {
        const d = c.toDate();
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      }) || [];

    return (
      <View style={styles.chartContainer}>
        {last7Days.map((date, index) => {
          const isCompleted = completionDates.includes(date.getTime());
          return (
            <View key={index} style={styles.chartBar}>
              <View
                style={[
                  styles.bar,
                  {
                    backgroundColor: isCompleted
                      ? theme.primary
                      : theme.surfaceVariant,
                  },
                ]}
              />
              <Text style={styles.chartLabel}>
                {["S", "M", "T", "W", "T", "F", "S"][date.getDay()]}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderHabit: ListRenderItem<Habit> = ({ item, index }) => (
    <AnimatedView animationType="slideUp" delay={index ? index * 50 : 0}>
      <MaterialCard
        variant="elevated"
        onPress={() => navigation.navigate("HabitDetail", { habitId: item.id })}
        style={styles.habitCard}
      >
        <View style={styles.habitHeader}>
          <View style={styles.habitInfo}>
            <Text style={styles.habitName}>{item.name}</Text>
            <Text style={styles.habitFrequency}>{item.frequency}</Text>
          </View>
          <View style={styles.streakContainer}>
            <Text style={styles.streakNumber}>
              {calculateStreak(item.completions)}
            </Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </View>
        </View>

        {renderHabitChart(item)}

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {item.completions?.length || 0}
            </Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{getCompletionRate(item)}%</Text>
            <Text style={styles.statLabel}>30-day rate</Text>
          </View>
        </View>
      </MaterialCard>
    </AnimatedView>
  );

  const styles = createHomeStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Routineo</Text>
        {/* <Text style={styles.appBarSubtitle}>Track your progress</Text> */}
      </View>

      <FlatList
        data={habits}
        renderItem={renderHabit}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No habits yet!</Text>
            <Text style={styles.emptySubtext}>
              Tap + to create your first habit
            </Text>
          </View>
        }
      />

      <MaterialFAB
        icon="add"
        onPress={() => navigation.navigate("AddHabit")}
        style={styles.fab}
      />
    </View>
  );
}
