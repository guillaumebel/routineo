import { StatusBar, StatusBarStyle } from "expo-status-bar";
import React from "react";
import { StatusBar as RNStatusBar } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { isAndroid } from "../../utils/platform";

interface MaterialStatusBarProps {
  style?: StatusBarStyle;
  backgroundColor?: string;
  translucent?: boolean;
}

const MaterialStatusBar: React.FC<MaterialStatusBarProps> = ({
  style = "auto",
  backgroundColor,
  translucent = true,
}) => {
  const { theme, isDark } = useTheme();
  const statusBarColor =
    backgroundColor || (isAndroid ? theme.surface : "transparent");

  // Use dynamic style based on theme if not explicitly provided
  const statusBarStyle = style === "auto" ? (isDark ? "light" : "dark") : style;

  React.useEffect(() => {
    if (isAndroid) {
      // Set Android status bar to Material Design specifications
      RNStatusBar.setBackgroundColor(statusBarColor, true);
      RNStatusBar.setTranslucent(translucent);
    }
  }, [statusBarColor, translucent]);

  return (
    <StatusBar
      style={statusBarStyle}
      backgroundColor={statusBarColor}
      translucent={translucent}
    />
  );
};

export default MaterialStatusBar;
