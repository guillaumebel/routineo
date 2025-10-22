import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ComponentElevation } from "../../design/shadows";
import { Spacing } from "../../design/spacing";
import { Typography } from "../../design/typography";
import { getRippleConfig, isAndroid } from "../../utils/platform";

export type ButtonVariant =
  | "filled"
  | "elevated"
  | "tonal"
  | "outlined"
  | "text";
export type ButtonSize = "small" | "medium" | "large";

interface MaterialButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode | string;
  iconPosition?: "left" | "right";
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const MaterialButton: React.FC<MaterialButtonProps> = ({
  title,
  onPress,
  variant = "filled",
  size = "medium",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { theme } = useTheme();

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 20, // Material Design 3 uses 20dp border radius for buttons
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      minWidth: 64,
      minHeight: getSizeHeight(),
      paddingHorizontal: getSizePadding(),
      ...(fullWidth && { alignSelf: "stretch" }),
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      filled: {
        backgroundColor: disabled ? theme.onSurface + "1F" : theme.primary, // 1F = 12% opacity
        ...ComponentElevation.buttonFilled,
      },
      elevated: {
        backgroundColor: disabled
          ? theme.onSurface + "1F"
          : theme.surfaceContainerLow,
        ...ComponentElevation.buttonElevated,
      },
      tonal: {
        backgroundColor: disabled
          ? theme.onSurface + "1F"
          : theme.secondaryContainer,
        ...ComponentElevation.buttonTonal,
      },
      outlined: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: disabled ? theme.onSurface + "1F" : theme.outline,
        ...ComponentElevation.buttonOutlined,
      },
      text: {
        backgroundColor: "transparent",
        ...ComponentElevation.buttonText,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseTextStyle = Typography.labelLarge;

    const variantTextColors: Record<ButtonVariant, string> = {
      filled: disabled ? theme.onSurface + "61" : theme.onPrimary, // 61 = 38% opacity
      elevated: disabled ? theme.onSurface + "61" : theme.primary,
      tonal: disabled ? theme.onSurface + "61" : theme.onSecondaryContainer,
      outlined: disabled ? theme.onSurface + "61" : theme.primary,
      text: disabled ? theme.onSurface + "61" : theme.primary,
    };

    return {
      ...baseTextStyle,
      color: variantTextColors[variant],
    };
  };

  const getSizeHeight = (): number => {
    const heights: Record<ButtonSize, number> = {
      small: 32,
      medium: 40,
      large: 48,
    };
    return heights[size];
  };

  const getSizePadding = (): number => {
    const paddings: Record<ButtonSize, number> = {
      small: Spacing.md,
      medium: Spacing.lg,
      large: Spacing.xl,
    };
    return paddings[size];
  };

  const buttonStyle = [getButtonStyles(), style];
  const buttonTextStyle = [getTextStyles(), textStyle];

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <MaterialIcons
          name={icon as any}
          size={size === "small" ? 16 : size === "large" ? 24 : 20}
          color={getTextStyles().color}
        />
      );
    }

    return icon;
  };

  const renderContent = () => (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextStyles().color}
          style={styles.loader}
        />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <View style={styles.iconLeft}>{renderIcon()}</View>
          )}
          {title.trim() && <Text style={buttonTextStyle}>{title}</Text>}
          {icon && iconPosition === "right" && (
            <View style={styles.iconRight}>{renderIcon()}</View>
          )}
        </>
      )}
    </View>
  );

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  if (isAndroid) {
    return (
      <TouchableNativeFeedback
        onPress={handlePress}
        disabled={disabled || loading}
        {...getRippleConfig()}
      >
        <View style={buttonStyle}>{renderContent()}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={buttonStyle}
      activeOpacity={0.7}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    marginRight: 0,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});

export default MaterialButton;
