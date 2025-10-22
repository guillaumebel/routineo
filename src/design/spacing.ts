// Material Design 3 Spacing System
// Based on 4dp base unit with 8dp grid system

export const Spacing = {
  // Base spacing units (multiples of 4dp)
  xs: 4,   // 4dp - Extra small
  sm: 8,   // 8dp - Small  
  md: 12,  // 12dp - Medium (3 * 4)
  lg: 16,  // 16dp - Large (4 * 4)
  xl: 20,  // 20dp - Extra large (5 * 4)
  xxl: 24, // 24dp - Extra extra large (6 * 4)
  xxxl: 32, // 32dp - Triple extra large (8 * 4)

  // Specific use cases
  none: 0,
  
  // Container padding/margin
  container: 16,
  containerLarge: 24,
  
  // Component spacing
  component: 8,
  componentLarge: 16,
  
  // Screen padding
  screen: 16,
  screenHorizontal: 16,
  screenVertical: 24,

  // List item spacing
  listItem: 16,
  listItemVertical: 8,
  
  // Button spacing
  button: 16,
  buttonVertical: 12,
  
  // Card spacing
  card: 16,
  cardVertical: 20,

  // Input spacing
  input: 16,
  inputVertical: 12,

  // Navigation spacing
  nav: 16,
  navVertical: 8,

  // Icon spacing
  icon: 8,
  iconLarge: 16,

  // Section spacing
  section: 24,
  sectionLarge: 32,
};

// Layout helpers
export const Layout = {
  // Safe area insets (for status bar, navigation bar)
  safeArea: {
    top: 24,
    bottom: 16,
    left: 0,
    right: 0,
  },

  // Header heights
  header: {
    default: 56,
    large: 64,
    dense: 48,
  },

  // Bottom navigation
  bottomNav: {
    height: 80,
    padding: 16,
  },

  // FAB (Floating Action Button)
  fab: {
    size: 56,
    margin: 16,
    sizeSmall: 40,
    sizeLarge: 96,
  },

  // Minimum touch target size
  touchTarget: {
    minWidth: 48,
    minHeight: 48,
  },

  // Screen breakpoints (for responsive design)
  breakpoints: {
    compact: 600,    // 0-599dp
    medium: 840,     // 600-839dp
    expanded: 1200,  // 840-1199dp
    large: 1600,     // 1200-1599dp
    extraLarge: 1600, // 1600dp+
  },
};

// Responsive spacing utility
export const getResponsiveSpacing = (
  screenWidth: number,
  compact: number,
  medium?: number,
  expanded?: number
) => {
  if (screenWidth < Layout.breakpoints.compact) {
    return compact;
  } else if (screenWidth < Layout.breakpoints.medium) {
    return medium || compact;
  } else {
    return expanded || medium || compact;
  }
};