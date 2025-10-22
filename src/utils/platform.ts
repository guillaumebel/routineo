import { Dimensions, Platform } from 'react-native';

// Platform detection
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

// Get current platform
export const getCurrentPlatform = () => Platform.OS;

// Screen dimensions
export const getScreenDimensions = () => Dimensions.get('screen');
export const getWindowDimensions = () => Dimensions.get('window');

// Platform-specific styling utility
export const platformSelect = <T>(options: {
  android?: T;
  ios?: T;
  default?: T;
}): T | undefined => {
  if (isAndroid && options.android !== undefined) {
    return options.android;
  }
  if (isIOS && options.ios !== undefined) {
    return options.ios;
  }
  return options.default;
};

// Platform-specific values with fallback
export const platformValue = <T>(androidValue: T, iosValue: T): T => {
  return isAndroid ? androidValue : iosValue;
};

// Responsive design helpers
export const isTablet = () => {
  const { width, height } = getScreenDimensions();
  const aspectRatio = Math.max(width, height) / Math.min(width, height);
  return Math.min(width, height) >= 600 && aspectRatio < 1.6;
};

export const isLandscape = () => {
  const { width, height } = getWindowDimensions();
  return width > height;
};

// Material Design breakpoints
export const getBreakpoint = () => {
  const { width } = getWindowDimensions();
  
  if (width < 600) return 'compact';
  if (width < 840) return 'medium';
  if (width < 1200) return 'expanded';
  if (width < 1600) return 'large';
  return 'extraLarge';
};

// Safe area helpers for Android
export const getSafeAreaInsets = () => {
  // For Android, we'll use standard values
  // In a real app, you'd use react-native-safe-area-context
  return {
    top: isAndroid ? 24 : 44, // Status bar height
    bottom: isAndroid ? 0 : 34, // Home indicator on iOS
    left: 0,
    right: 0,
  };
};

// Material Design specific utilities
export const getMaterialElevation = (level: number) => {
  // Android uses elevation property for shadows
  return isAndroid ? { elevation: level } : {};
};

// Haptic feedback (Android specific)
export const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'medium') => {
  if (isAndroid) {
    // In React Native, you'd use @react-native-community/hooks or similar
    // For now, we'll just log it
    console.log(`Haptic feedback: ${type}`);
  }
};

// Status bar utilities
export const getStatusBarHeight = () => {
  return platformSelect({
    android: 24,
    ios: 44,
    default: 24,
  });
};

// Navigation bar height (Android)
export const getNavigationBarHeight = () => {
  return isAndroid ? 48 : 0;
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

// Text scaling utilities
export const getScaledSize = (size: number, factor = 1) => {
  // In a real app, you'd get the system font scale
  const fontScale = 1; // Dimensions.get('window').fontScale;
  return size * fontScale * factor;
};

// Accessibility helpers
export const getAccessibilityProps = (label: string, hint?: string, role?: string) => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: role as any,
});

// Performance helpers
export const isLowEndDevice = () => {
  // In a real app, you'd use react-native-device-info
  // For now, assume all devices are capable
  return false;
};