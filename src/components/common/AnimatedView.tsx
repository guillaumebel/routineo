import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";
import { Animations } from "../../design/animations";

interface AnimatedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animationType?: "fadeIn" | "slideUp" | "scale" | "slideInLeft";
  delay?: number;
  duration?: number;
}

const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  style,
  animationType = "fadeIn",
  delay = 0,
  duration,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animationConfig = getAnimationConfig();
    const animationDuration = duration || animationConfig.duration;

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: animationDuration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, delay, duration, animationType]);

  const getAnimationConfig = () => {
    switch (animationType) {
      case "slideUp":
        return Animations.slideInFromBottom;
      case "scale":
        return Animations.scaleIn;
      case "slideInLeft":
        return Animations.slideInFromLeft;
      default:
        return Animations.fadeIn;
    }
  };

  const getAnimatedStyle = (): ViewStyle => {
    switch (animationType) {
      case "fadeIn":
        return {
          opacity: animatedValue,
        };

      case "slideUp":
        return {
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        };

      case "scale":
        return {
          opacity: animatedValue,
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        };

      case "slideInLeft":
        return {
          opacity: animatedValue,
          transform: [
            {
              translateX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
        };

      default:
        return { opacity: animatedValue };
    }
  };

  return (
    <Animated.View style={[style, getAnimatedStyle()]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedView;
