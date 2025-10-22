import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { ComponentElevation } from "../../design/shadows";
import { Spacing } from "../../design/spacing";
import { getRippleConfig, isAndroid } from "../../utils/platform";

export type CardVariant = "elevated" | "filled" | "outlined";

interface MaterialCardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  disabled?: boolean;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  children,
  variant = "elevated",
  onPress,
  style,
  contentStyle,
  disabled = false,
}) => {
  const { theme } = useTheme();

  const getCardStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12, // Material Design 3 uses 12dp for cards
      overflow: "hidden",
    };

    const variantStyles: Record<CardVariant, ViewStyle> = {
      elevated: {
        backgroundColor: theme.surfaceContainerLow,
        ...ComponentElevation.card,
      },
      filled: {
        backgroundColor: theme.surfaceContainerHighest,
        ...ComponentElevation.cardFilled,
      },
      outlined: {
        backgroundColor: theme.surface,
        borderWidth: 1,
        borderColor: theme.outlineVariant,
        ...ComponentElevation.cardFilled,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  const getContentStyles = (): ViewStyle => ({
    padding: Spacing.card,
    paddingVertical: Spacing.cardVertical,
  });

  const cardStyle = [getCardStyles(), style];
  const cardContentStyle = [getContentStyles(), contentStyle];

  const renderContent = () => <View style={cardContentStyle}>{children}</View>;

  if (onPress && !disabled) {
    if (isAndroid) {
      return (
        <TouchableNativeFeedback onPress={onPress} {...getRippleConfig()}>
          <View style={cardStyle}>{renderContent()}</View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity onPress={onPress} style={cardStyle} activeOpacity={0.7}>
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{renderContent()}</View>;
};

// Styles are defined inline for this component

export default MaterialCard;
