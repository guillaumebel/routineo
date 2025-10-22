import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { Spacing } from "../../design/spacing";
import { Typography } from "../../design/typography";
import MaterialCard from "./MaterialCard";

interface ThemeSwitcherProps {
  style?: ViewStyle;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ style }) => {
  const { themeMode, theme, setThemeMode } = useTheme();

  const themeOptions = [
    {
      mode: "light" as const,
      label: "Light",
      icon: "light-mode",
      description: "Always use light theme",
    },
    {
      mode: "dark" as const,
      label: "Dark",
      icon: "dark-mode",
      description: "Always use dark theme",
    },
    {
      mode: "system" as const,
      label: "System",
      icon: "settings-brightness",
      description: "Follow system setting",
    },
  ];

  return (
    <MaterialCard
      variant="elevated"
      style={StyleSheet.flatten([styles.container, style])}
    >
      <Text style={[styles.title, { color: theme.onSurface }]}>Theme</Text>

      {themeOptions.map((option) => (
        <TouchableOpacity
          key={option.mode}
          style={[
            styles.option,
            {
              backgroundColor:
                themeMode === option.mode
                  ? theme.primaryContainer
                  : "transparent",
            },
          ]}
          onPress={() => setThemeMode(option.mode)}
        >
          <View style={styles.optionContent}>
            <MaterialIcons
              name={option.icon as any}
              size={24}
              color={
                themeMode === option.mode
                  ? theme.onPrimaryContainer
                  : theme.onSurfaceVariant
              }
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.optionLabel,
                  {
                    color:
                      themeMode === option.mode
                        ? theme.onPrimaryContainer
                        : theme.onSurface,
                  },
                ]}
              >
                {option.label}
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  {
                    color:
                      themeMode === option.mode
                        ? theme.onPrimaryContainer
                        : theme.onSurfaceVariant,
                  },
                ]}
              >
                {option.description}
              </Text>
            </View>
          </View>
          {themeMode === option.mode && (
            <MaterialIcons
              name="check"
              size={20}
              color={theme.onPrimaryContainer}
            />
          )}
        </TouchableOpacity>
      ))}
    </MaterialCard>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
  title: {
    ...Typography.titleLarge,
    marginBottom: Spacing.md,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.md,
    borderRadius: 12,
    marginVertical: Spacing.xs,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  optionLabel: {
    ...Typography.bodyLarge,
    marginBottom: Spacing.xs,
  },
  optionDescription: {
    ...Typography.bodySmall,
  },
});

export default ThemeSwitcher;
