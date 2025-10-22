import { StyleSheet } from "react-native";
import { LightTheme } from "./colors";
import { Spacing } from "./spacing";
import { Typography } from "./typography";

type ThemeType = typeof LightTheme;

// Create a shared styles object to reduce duplication
const createSharedStyles = (theme: ThemeType) => ({
  // Base layouts - used by all screens
  container: {
    flex: 1,
    backgroundColor: theme.surface,
    paddingTop: Spacing.xl,
  },
  content: {
    padding: Spacing.lg,
  },
  scrollContainer: {
    flex: 1,
  },
  
  // Common app bar - used by most screens
  appBar: {
    backgroundColor: theme.surfaceContainer,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.lg,
    elevation: 2,
  },
  appBarTitle: {
    ...Typography.headlineMedium,
    color: theme.primary,
  },
  
  // Navigation app bar - used by detail screens  
  navAppBar: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    backgroundColor: theme.surfaceContainer,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.md,
    elevation: 2,
  },
  backButton: {
    marginRight: Spacing.sm,
  },
  navAppBarTitle: {
    ...Typography.titleLarge,
    color: theme.onSurface,
    flex: 1,
  },
  appBarSpacer: {
    width: 48,
  },
  
  // Common card pattern
  card: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  
  // Common form elements
  input: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.labelLarge,
    color: theme.onSurface,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  
  // Common buttons
  button: {
    marginTop: Spacing.lg,
  },
  secondaryButton: {
    marginTop: Spacing.md,
  },
  
  // Common stats display
  statsRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.outlineVariant,
  },
  statsLabel: {
    ...Typography.bodyMedium,
    color: theme.onSurfaceVariant,
  },
  statsValue: {
    ...Typography.bodyMedium,
    color: theme.onSurface,
  },
  
  // Common empty state
  emptyContainer: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: Spacing.xxxl,
  },
  emptyText: {
    ...Typography.titleLarge,
    color: theme.onSurfaceVariant,
    marginBottom: Spacing.xs,
    textAlign: "center" as const,
  },
});

// Individual screen styles - now much shorter and focused on unique elements
export const createLoginStyles = (theme: ThemeType) => {
  const shared = createSharedStyles(theme);
  return StyleSheet.create({
    ...shared,
    // Login-specific overrides
    content: {
      flex: 1,
      justifyContent: "center" as const,
      padding: Spacing.lg,
    },
    title: {
      ...Typography.displayMedium,
      color: theme.onSurface,
      marginBottom: Spacing.sm,
      textAlign: "center" as const,
    },
    subtitle: {
      ...Typography.bodyLarge,
      color: theme.onSurfaceVariant,
      marginBottom: Spacing.xxxl,
      textAlign: "center" as const,
    },
    switchButton: {
      marginTop: Spacing.md,
    },
  });
};

export const createHomeStyles = (theme: ThemeType) => {
  const shared = createSharedStyles(theme);
  return StyleSheet.create({
    ...shared,
    // Home-specific styles
    appBar: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.xxxl ,
      paddingBottom: Spacing.lg,
    },
    appBarTitle: {
      ...Typography.headlineMedium,
      color: theme.onPrimaryContainer,
      marginBottom: Spacing.xs,
    },
    appBarSubtitle: {
      ...Typography.bodyMedium,
      color: theme.onPrimaryContainer,
      opacity: 0.8,
    },
    listContainer: {
      padding: Spacing.md,
    },
    habitCard: {
      marginBottom: Spacing.md,
    },
    habitHeader: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "flex-start" as const,
      marginBottom: Spacing.md,
      padding: Spacing.lg,
    },
    habitInfo: {
      flex: 1,
    },
    habitName: {
      ...Typography.titleLarge,
      color: theme.onSurface,
      marginBottom: Spacing.xs,
    },
    habitFrequency: {
      ...Typography.bodyMedium,
      color: theme.onSurfaceVariant,
      textTransform: "capitalize" as const,
    },
    streakContainer: {
      backgroundColor: theme.tertiaryContainer,
      borderRadius: 12,
      padding: Spacing.sm,
      alignItems: "center" as const,
      minWidth: 60,
    },
    streakNumber: {
      ...Typography.headlineSmall,
      color: theme.onTertiaryContainer,
    },
    streakLabel: {
      ...Typography.labelSmall,
      color: theme.onTertiaryContainer,
    },
    chartContainer: {
      flexDirection: "row" as const,
      justifyContent: "space-around" as const,
      marginBottom: Spacing.md,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.lg,
    },
    chartBar: {
      alignItems: "center" as const,
    },
    bar: {
      width: 30,
      height: 60,
      borderRadius: 6,
      marginBottom: Spacing.xs,
    },
    chartLabel: {
      ...Typography.labelSmall,
      color: theme.onSurfaceVariant,
    },
    statsContainer: {
      flexDirection: "row" as const,
      justifyContent: "space-around" as const,
      borderTopWidth: 1,
      borderTopColor: theme.outlineVariant,
      paddingTop: Spacing.md,
      paddingHorizontal: Spacing.lg,
    },
    stat: {
      alignItems: "center" as const,
    },
    statValue: {
      ...Typography.titleMedium,
      color: theme.primary,
    },
    statLabel: {
      ...Typography.labelMedium,
      color: theme.onSurfaceVariant,
      marginTop: Spacing.xs,
    },
    emptySubtext: {
      ...Typography.bodyMedium,
      color: theme.onSurfaceVariant,
    },
    fab: {
      position: "absolute" as const,
      right: Spacing.lg,
      bottom: Spacing.lg,
    },
  });
};

export const createAddHabitStyles = (theme: ThemeType) => {
  const shared = createSharedStyles(theme);
  return StyleSheet.create({
    ...shared,
    // Use navigation app bar
    appBar: shared.navAppBar,
    appBarTitle: shared.navAppBarTitle,
    // AddHabit-specific styles
    formCard: {
      padding: Spacing.lg,
    },
    textArea: {
      marginBottom: Spacing.md,
    },
    frequencyContainer: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      marginBottom: Spacing.xl,
      gap: Spacing.sm,
    },
    frequencyButton: {
      flex: 1,
    },
    cancelButton: {
      marginTop: Spacing.md,
    },
  });
};

export const createHabitDetailStyles = (theme: ThemeType) => {
  const shared = createSharedStyles(theme);
  return StyleSheet.create({
    ...shared,
    // Use navigation app bar
    appBar: shared.navAppBar,
    appBarTitle: shared.navAppBarTitle,
    // HabitDetail-specific styles
    headerCard: shared.card,
    habitTitle: {
      ...Typography.headlineSmall,
      color: theme.onSurface,
      marginBottom: Spacing.sm,
    },
    habitDescription: {
      ...Typography.bodyLarge,
      color: theme.onSurfaceVariant,
      marginBottom: Spacing.md,
    },
    frequencyBadge: {
      backgroundColor: theme.primary,
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: 16,
      alignSelf: "flex-start" as const,
    },
    frequencyText: {
      ...Typography.labelMedium,
      color: theme.onPrimary,
      textTransform: "capitalize" as const,
    },
    statsCard: shared.card,
    statsTitle: {
      ...Typography.titleLarge,
      color: theme.onSurface,
      marginBottom: Spacing.md,
    },
    completionsCard: shared.card,
    completionsTitle: {
      ...Typography.titleLarge,
      color: theme.onSurface,
      marginBottom: Spacing.md,
    },
    completionItem: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      paddingVertical: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.outlineVariant,
    },
    completionDate: {
      ...Typography.bodyMedium,
      color: theme.onSurfaceVariant,
    },
    completionTime: {
      ...Typography.bodyMedium,
      color: theme.onSurfaceVariant,
    },
    deleteButton: {
      marginTop: Spacing.lg,
    },
    // Legacy compatibility names
    habitName: {
      ...Typography.headlineSmall,
      color: theme.onSurface,
      marginBottom: Spacing.sm,
    },
    habitFrequency: {
      ...Typography.labelLarge,
      color: theme.primary,
      textTransform: "uppercase" as const,
    },
    checkInButton: {
      marginBottom: Spacing.lg,
    },
    statRow: shared.statsRow,
    statLabel: shared.statsLabel,
    statValue: {
      ...Typography.labelLarge,
      color: theme.onSurface,
    },
    historyCard: shared.card,
    historyTitle: {
      ...Typography.titleMedium,
      color: theme.onSurface,
      marginBottom: Spacing.md,
    },
    historyItem: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      alignItems: "center" as const,
      paddingVertical: Spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.outlineVariant,
    },
    historyDate: {
      ...Typography.bodyMedium,
      color: theme.onSurfaceVariant,
    },
  });
};

export const createProfileStyles = (theme: ThemeType) => {
  const shared = createSharedStyles(theme);
  return StyleSheet.create({
    ...shared,
    // Profile-specific styles
    profileCard: shared.card,
    avatarContainer: {
      alignItems: "center" as const,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.primaryContainer,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      marginBottom: Spacing.md,
    },
    emailText: {
      ...Typography.titleMedium,
      color: theme.onSurface,
      textAlign: "center" as const,
    },
    infoCard: shared.card,
    cardTitle: {
      ...Typography.titleLarge,
      color: theme.onSurface,
      marginBottom: Spacing.lg,
    },
    infoRow: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.outlineVariant,
    },
    infoTextContainer: {
      flex: 1,
      marginLeft: Spacing.md,
    },
    label: {
      ...Typography.labelMedium,
      color: theme.onSurfaceVariant,
      marginBottom: Spacing.xs,
    },
    value: {
      ...Typography.bodyLarge,
      color: theme.onSurface,
    },
    logoutButton: {
      marginTop: Spacing.lg,
    },
    settingsCard: {
      marginTop: Spacing.md,
    },
  });
};