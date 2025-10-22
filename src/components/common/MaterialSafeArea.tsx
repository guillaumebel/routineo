import React from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LightTheme as Theme } from "../../design/colors";
import { isAndroid } from "../../utils/platform";

interface MaterialSafeAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ("top" | "bottom" | "left" | "right")[];
  backgroundColor?: string;
}

const MaterialSafeArea: React.FC<MaterialSafeAreaProps> = ({
  children,
  style,
  edges = ["top", "bottom", "left", "right"],
  backgroundColor = Theme.surface,
}) => {
  const insets = useSafeAreaInsets();

  const safeAreaStyle: ViewStyle = {
    backgroundColor,
    ...(edges.includes("top") && { paddingTop: isAndroid ? 0 : insets.top }),
    ...(edges.includes("bottom") && { paddingBottom: insets.bottom }),
    ...(edges.includes("left") && { paddingLeft: insets.left }),
    ...(edges.includes("right") && { paddingRight: insets.right }),
  };

  return <View style={[safeAreaStyle, style]}>{children}</View>;
};

export default MaterialSafeArea;
