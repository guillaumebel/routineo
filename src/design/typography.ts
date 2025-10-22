// Material Design 3 Typography System
// Based on Material Design 3 type scale

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

export const FontFamilies = {
  // Using system fonts that match Material Design
  android: 'Roboto',
  default: 'System',
};

// Material Design 3 Type Scale
export const Typography = {
  // Display styles (largest)
  displayLarge: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },

  // Headline styles
  headlineLarge: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },

  // Title styles
  titleLarge: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.medium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  // Label styles
  labelLarge: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.medium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },

  // Body styles (most common)
  bodyLarge: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: FontFamilies.android,
    fontWeight: FontWeights.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
};

// Utility function to create text styles
export const createTextStyle = (
  variant: keyof typeof Typography,
  color?: string
) => ({
  ...Typography[variant],
  color,
});