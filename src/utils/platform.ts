import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Platform detection
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

// Safe area helpers - Hook for use in components
export const useSafeArea = () => {
  return useSafeAreaInsets();
};


// Material Design ripple effect configuration
export const getRippleConfig = (color?: string) => {
  if (!isAndroid) return {};
  
  return {
    android_ripple: {
      color: color || 'rgba(0, 0, 0, 0.12)',
      borderless: false,
      radius: -1, // Let the system determine the radius
    },
  };
};

// Platform-specific animation configurations
export const getAnimationConfig = () => ({
  duration: isAndroid ? 200 : 300,
  easing: isAndroid ? 'ease-out' : 'ease-in-out',
});

// Haptic feedback using expo-haptics
export const triggerHapticFeedback = async (type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'medium') => {
  try {
    switch (type) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  } catch (error) {
    // Haptic feedback might not be available on all devices
    console.log('Haptic feedback not available:', error);
  }
};
