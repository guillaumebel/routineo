import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { Spacing } from "../../design/spacing";
import { Typography } from "../../design/typography";

export type InputVariant = "filled" | "outlined";

interface MaterialTextInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  helperText?: string;
  errorText?: string;
  variant?: InputVariant;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const MaterialTextInput: React.FC<MaterialTextInputProps> = ({
  label,
  helperText,
  errorText,
  variant = "outlined",
  style,
  inputStyle,
  leadingIcon,
  trailingIcon,
  value,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!errorText;
  const hasValue = !!value && value.length > 0;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getContainerStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      minHeight: 56,
      borderRadius: variant === "filled" ? 4 : 4,
      paddingHorizontal: Spacing.input,
      flexDirection: "row",
      alignItems: "center",
    };

    if (variant === "filled") {
      return {
        ...baseStyle,
        backgroundColor: hasError
          ? theme.errorContainer + "0F" // 6% opacity
          : isFocused
          ? theme.onSurface + "0F"
          : theme.onSurface + "08", // 3% opacity
        borderBottomWidth: isFocused ? 2 : 1,
        borderBottomColor: hasError
          ? theme.error
          : isFocused
          ? theme.primary
          : theme.onSurfaceVariant,
        borderRadius: 4,
      };
    }

    // Outlined variant
    return {
      ...baseStyle,
      backgroundColor: "transparent",
      borderWidth: isFocused ? 2 : 1,
      borderColor: hasError
        ? theme.error
        : isFocused
        ? theme.primary
        : theme.outline,
    };
  };

  const getLabelStyles = (): TextStyle => {
    const isFloating = isFocused || textInputProps.placeholder || hasValue;

    return {
      ...Typography.bodyLarge,
      position: "absolute",
      left: leadingIcon ? 48 : Spacing.input,
      color: hasError
        ? theme.error
        : isFocused
        ? theme.primary
        : theme.onSurfaceVariant,
      fontSize: isFloating ? 12 : 16,
      top: isFloating ? -8 : 16,
      backgroundColor:
        variant === "outlined" && isFloating ? theme.surface : "transparent",
      paddingHorizontal: variant === "outlined" && isFloating ? 4 : 0,
      zIndex: 1,
    };
  };

  const getInputStyles = (): TextStyle => ({
    ...Typography.bodyLarge,
    flex: 1,
    color: theme.onSurface,
    paddingTop: label ? Spacing.md : 0,
    paddingLeft: leadingIcon ? Spacing.sm : 0,
    paddingRight: trailingIcon ? Spacing.sm : 0,
    minHeight: 24,
  });

  const getSupportingTextStyles = (): TextStyle => ({
    ...Typography.bodySmall,
    color: hasError ? theme.error : theme.onSurfaceVariant,
    marginTop: Spacing.xs,
    marginHorizontal: Spacing.input,
  });

  const containerStyle = [getContainerStyles(), style];
  const labelStyle = getLabelStyles();
  const inputStyleCombined = [getInputStyles(), inputStyle];
  const supportingTextStyle = getSupportingTextStyles();

  return (
    <View>
      <View style={containerStyle}>
        {leadingIcon && <View style={styles.iconContainer}>{leadingIcon}</View>}

        <View style={styles.inputWrapper}>
          {label && <Text style={labelStyle}>{label}</Text>}
          <TextInput
            {...textInputProps}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyleCombined}
            placeholderTextColor={theme.onSurfaceVariant}
          />
        </View>

        {trailingIcon && (
          <View style={styles.iconContainer}>{trailingIcon}</View>
        )}
      </View>

      {(helperText || errorText) && (
        <Text style={supportingTextStyle}>{errorText || helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    position: "relative",
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MaterialTextInput;
