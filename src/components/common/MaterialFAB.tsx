import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ComponentElevation } from "../../design/shadows";
import { Layout, Spacing } from "../../design/spacing";
import { getRippleConfig, isAndroid } from "../../utils/platform";

export type FABSize = "small" | "normal" | "large";
export type FABVariant = "primary" | "secondary" | "tertiary" | "surface";

interface MaterialFABProps {
  onPress: () => void;
  icon?: string;
  size?: FABSize;
  variant?: FABVariant;
  style?: ViewStyle;
  disabled?: boolean;
  extended?: boolean;
  label?: string;
}

const MaterialFAB: React.FC<MaterialFABProps> = ({
  onPress,
  icon = "add",
  size = "normal",
  variant = "primary",
  style,
  disabled = false,
  extended = false,
  label,
}) => {
  const { theme } = useTheme();

  const getFABStyles = (): ViewStyle => {
    const sizeStyles: Record<FABSize, ViewStyle> = {
      small: {
        width: Layout.fab.sizeSmall,
        height: Layout.fab.sizeSmall,
        borderRadius: Layout.fab.sizeSmall / 2,
      },
      normal: {
        width: Layout.fab.size,
        height: Layout.fab.size,
        borderRadius: Layout.fab.size / 2,
      },
      large: {
        width: Layout.fab.sizeLarge,
        height: Layout.fab.sizeLarge,
        borderRadius: Layout.fab.sizeLarge / 2,
      },
    };

    const variantStyles: Record<FABVariant, ViewStyle> = {
      primary: {
        backgroundColor: disabled
          ? theme.onSurface + "1F"
          : theme.primaryContainer,
      },
      secondary: {
        backgroundColor: disabled
          ? theme.onSurface + "1F"
          : theme.secondaryContainer,
      },
      tertiary: {
        backgroundColor: disabled
          ? theme.onSurface + "1F"
          : theme.tertiaryContainer,
      },
      surface: {
        backgroundColor: disabled
          ? theme.onSurface + "1F"
          : theme.surfaceContainerHigh,
      },
    };

    const baseStyle: ViewStyle = {
      alignItems: "center",
      justifyContent: "center",
      ...ComponentElevation.fab,
    };

    if (extended && label) {
      return {
        ...baseStyle,
        ...variantStyles[variant],
        flexDirection: "row",
        paddingHorizontal: Spacing.lg,
        height: Layout.fab.size,
        borderRadius: Layout.fab.size / 2,
        minWidth: 80,
      };
    }

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getIconColor = (): string => {
    const colorMap: Record<FABVariant, string> = {
      primary: disabled ? theme.onSurface + "61" : theme.onPrimaryContainer,
      secondary: disabled ? theme.onSurface + "61" : theme.onSecondaryContainer,
      tertiary: disabled ? theme.onSurface + "61" : theme.onTertiaryContainer,
      surface: disabled ? theme.onSurface + "61" : theme.primary,
    };

    return colorMap[variant];
  };

  const getIconSize = (): number => {
    const sizeMap: Record<FABSize, number> = {
      small: 18,
      normal: 24,
      large: 36,
    };

    return sizeMap[size];
  };

  const fabStyle = [getFABStyles(), style];
  const iconColor = getIconColor();
  const iconSize = getIconSize();

  const renderContent = () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialIcons name={icon as any} size={iconSize} color={iconColor} />
      {extended && label && (
        <View style={{ marginLeft: Spacing.sm }}>
          {/* You can render label text here if needed */}
        </View>
      )}
    </View>
  );

  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  if (isAndroid) {
    return (
      <TouchableNativeFeedback
        onPress={handlePress}
        disabled={disabled}
        {...getRippleConfig()}
      >
        <View style={fabStyle}>{renderContent()}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={fabStyle}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default MaterialFAB;
