// Material You / Material Design 3 Color System
// Based on Material Design 3 color tokens

export const MaterialColors = {
  // Primary colors (Teal-based)
  primary: {
    primary0: '#000000',
    primary10: '#00201D',
    primary20: '#003732',
    primary25: '#004240',
    primary30: '#004D4A',
    primary35: '#005854',
    primary40: '#008080', // Main primary - Teal
    primary50: '#00A394',
    primary60: '#26BFAC',
    primary70: '#4DD8C4',
    primary80: '#70F2DC',
    primary90: '#B8FFF5',
    primary95: '#D4FFFA',
    primary98: '#EFFFFC',
    primary99: '#F5FFFE',
    primary100: '#FFFFFF',
  },

  // Secondary colors (Sage Green - complementary to teal)
  secondary: {
    secondary0: '#000000',
    secondary10: '#1A1F1A',
    secondary20: '#2F342F',
    secondary25: '#3A403A',
    secondary30: '#454B45',
    secondary35: '#515751',
    secondary40: '#5D635D',
    secondary50: '#757B75',
    secondary60: '#8F958F',
    secondary70: '#A9B0A9',
    secondary80: '#C5CCC5',
    secondary90: '#E1E8E1',
    secondary95: '#EFF6EF',
    secondary98: '#F7FEF7',
    secondary99: '#FBFFFB',
    secondary100: '#FFFFFF',
  },

  // Tertiary colors (Warm Orange - triadic to teal)
  tertiary: {
    tertiary0: '#000000',
    tertiary10: '#2A1400',
    tertiary20: '#422600',
    tertiary25: '#4F2E00',
    tertiary30: '#5C3700',
    tertiary35: '#6A4000',
    tertiary40: '#784A00',
    tertiary50: '#955E00',
    tertiary60: '#B37300',
    tertiary70: '#D18900',
    tertiary80: '#F0A000',
    tertiary90: '#FFCC80',
    tertiary95: '#FFE4B3',
    tertiary98: '#FFF2E6',
    tertiary99: '#FFF9F3',
    tertiary100: '#FFFFFF',
  },

  // Error colors
  error: {
    error0: '#000000',
    error10: '#410E0B',
    error20: '#601410',
    error25: '#6C1D16',
    error30: '#79251B',
    error35: '#852D20',
    error40: '#933B2C',
    error50: '#BA4A3A',
    error60: '#DE5449',
    error70: '#FF5449',
    error80: '#FF897D',
    error90: '#FFCDC2',
    error95: '#FFEBE6',
    error98: '#FFF8F7',
    error99: '#FFFBFF',
    error100: '#FFFFFF',
  },

  // Neutral colors
  neutral: {
    neutral0: '#000000',
    neutral4: '#0F0D13',
    neutral6: '#141218',
    neutral10: '#1D1B20',
    neutral12: '#201F24',
    neutral17: '#2B2930',
    neutral20: '#322F35',
    neutral22: '#36343B',
    neutral24: '#3B383E',
    neutral25: '#3E3C42',
    neutral30: '#49454F',
    neutral35: '#544F5A',
    neutral40: '#605D66',
    neutral50: '#79747E',
    neutral60: '#938F99',
    neutral70: '#AEA9B4',
    neutral80: '#CAC4D0',
    neutral87: '#E0D9E2',
    neutral90: '#E6E0E9',
    neutral92: '#ECE6F0',
    neutral94: '#F3EDF7',
    neutral95: '#F5EFF7',
    neutral96: '#F7F2FA',
    neutral98: '#FEF7FF',
    neutral99: '#FFFBFE',
    neutral100: '#FFFFFF',
  },

  // Neutral variant colors
  neutralVariant: {
    neutralVariant0: '#000000',
    neutralVariant10: '#1D1A22',
    neutralVariant20: '#322F37',
    neutralVariant25: '#3D3A42',
    neutralVariant30: '#49454F',
    neutralVariant35: '#54515B',
    neutralVariant40: '#605D66',
    neutralVariant50: '#79747E',
    neutralVariant60: '#938F99',
    neutralVariant70: '#AEA9B4',
    neutralVariant80: '#CAC4D0',
    neutralVariant90: '#E7E0EC',
    neutralVariant95: '#F5EFF7',
    neutralVariant98: '#FEF7FF',
    neutralVariant99: '#FFFBFE',
    neutralVariant100: '#FFFFFF',
  },
};

// Theme definitions
export const LightTheme = {
  // Primary
  primary: MaterialColors.primary.primary40,
  onPrimary: MaterialColors.primary.primary100,
  primaryContainer: MaterialColors.primary.primary90,
  onPrimaryContainer: MaterialColors.primary.primary10,

  // Secondary
  secondary: MaterialColors.secondary.secondary40,
  onSecondary: MaterialColors.secondary.secondary100,
  secondaryContainer: MaterialColors.secondary.secondary90,
  onSecondaryContainer: MaterialColors.secondary.secondary10,

  // Tertiary
  tertiary: MaterialColors.tertiary.tertiary40,
  onTertiary: MaterialColors.tertiary.tertiary100,
  tertiaryContainer: MaterialColors.tertiary.tertiary90,
  onTertiaryContainer: MaterialColors.tertiary.tertiary10,

  // Error
  error: MaterialColors.error.error40,
  onError: MaterialColors.error.error100,
  errorContainer: MaterialColors.error.error90,
  onErrorContainer: MaterialColors.error.error10,

  // Surface
  surface: MaterialColors.neutral.neutral99,
  onSurface: MaterialColors.neutral.neutral10,
  surfaceVariant: MaterialColors.neutralVariant.neutralVariant90,
  onSurfaceVariant: MaterialColors.neutralVariant.neutralVariant30,

  // Surface containers
  surfaceContainerHighest: MaterialColors.neutral.neutral90,
  surfaceContainerHigh: MaterialColors.neutral.neutral92,
  surfaceContainer: MaterialColors.neutral.neutral94,
  surfaceContainerLow: MaterialColors.neutral.neutral96,
  surfaceContainerLowest: MaterialColors.neutral.neutral100,

  // Other surfaces
  surfaceDim: MaterialColors.neutral.neutral87,
  surfaceBright: MaterialColors.neutral.neutral98,

  // Background
  background: MaterialColors.neutral.neutral99,
  onBackground: MaterialColors.neutral.neutral10,

  // Outline
  outline: MaterialColors.neutralVariant.neutralVariant50,
  outlineVariant: MaterialColors.neutralVariant.neutralVariant80,

  // Inverse
  inverseSurface: MaterialColors.neutral.neutral20,
  inverseOnSurface: MaterialColors.neutral.neutral95,
  inversePrimary: MaterialColors.primary.primary80,

  // Shadow
  shadow: MaterialColors.neutral.neutral0,
  scrim: MaterialColors.neutral.neutral0,
};

export const DarkTheme = {
  // Primary
  primary: MaterialColors.primary.primary80,
  onPrimary: MaterialColors.primary.primary20,
  primaryContainer: MaterialColors.primary.primary30,
  onPrimaryContainer: MaterialColors.primary.primary90,

  // Secondary
  secondary: MaterialColors.secondary.secondary80,
  onSecondary: MaterialColors.secondary.secondary20,
  secondaryContainer: MaterialColors.secondary.secondary30,
  onSecondaryContainer: MaterialColors.secondary.secondary90,

  // Tertiary
  tertiary: MaterialColors.tertiary.tertiary80,
  onTertiary: MaterialColors.tertiary.tertiary20,
  tertiaryContainer: MaterialColors.tertiary.tertiary30,
  onTertiaryContainer: MaterialColors.tertiary.tertiary90,

  // Error
  error: MaterialColors.error.error80,
  onError: MaterialColors.error.error20,
  errorContainer: MaterialColors.error.error30,
  onErrorContainer: MaterialColors.error.error90,

  // Surface
  surface: MaterialColors.neutral.neutral6,
  onSurface: MaterialColors.neutral.neutral90,
  surfaceVariant: MaterialColors.neutralVariant.neutralVariant30,
  onSurfaceVariant: MaterialColors.neutralVariant.neutralVariant80,

  // Surface containers
  surfaceContainerHighest: MaterialColors.neutral.neutral22,
  surfaceContainerHigh: MaterialColors.neutral.neutral17,
  surfaceContainer: MaterialColors.neutral.neutral12,
  surfaceContainerLow: MaterialColors.neutral.neutral10,
  surfaceContainerLowest: MaterialColors.neutral.neutral4,

  // Other surfaces
  surfaceDim: MaterialColors.neutral.neutral6,
  surfaceBright: MaterialColors.neutral.neutral24,

  // Background
  background: MaterialColors.neutral.neutral6,
  onBackground: MaterialColors.neutral.neutral90,

  // Outline
  outline: MaterialColors.neutralVariant.neutralVariant60,
  outlineVariant: MaterialColors.neutralVariant.neutralVariant30,

  // Inverse
  inverseSurface: MaterialColors.neutral.neutral90,
  inverseOnSurface: MaterialColors.neutral.neutral20,
  inversePrimary: MaterialColors.primary.primary40,

  // Shadow
  shadow: MaterialColors.neutral.neutral0,
  scrim: MaterialColors.neutral.neutral0,
};

// Current theme (you can switch this programmatically)
export const Theme = LightTheme;