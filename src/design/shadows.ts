// Material Design 3 Elevation and Shadow System
// Based on Material Design 3 elevation tokens

export const Elevation = {
  // Standard elevation levels
  level0: 0,   // No elevation (on surface)
  level1: 1,   // Surface container low
  level2: 3,   // Surface container
  level3: 6,   // Surface container high
  level4: 8,   // Surface container highest
  level5: 12,  // App bars, navigation drawers
};

// Shadow styles for different elevation levels
export const Shadows = {
  elevation0: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0, // Android
  },
  
  elevation1: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // Android
  },

  elevation2: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3, // Android
  },

  elevation3: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.11,
    shadowRadius: 6,
    elevation: 6, // Android
  },

  elevation4: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 8, // Android
  },

  elevation5: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 12, // Android
  },
};

// Component-specific elevation mapping
export const ComponentElevation = {
  // Surfaces
  surfaceContainer: Shadows.elevation0,
  surfaceContainerLow: Shadows.elevation1,
  surfaceContainerHigh: Shadows.elevation3,
  surfaceContainerHighest: Shadows.elevation4,

  // Cards
  card: Shadows.elevation1,
  cardElevated: Shadows.elevation3,
  cardFilled: Shadows.elevation0,

  // Buttons
  buttonFilled: Shadows.elevation0,
  buttonElevated: Shadows.elevation1,
  buttonTonal: Shadows.elevation0,
  buttonOutlined: Shadows.elevation0,
  buttonText: Shadows.elevation0,

  // FAB (Floating Action Button)
  fab: Shadows.elevation3,
  fabPressed: Shadows.elevation2,
  fabLowered: Shadows.elevation1,

  // App bars
  topAppBar: Shadows.elevation0,
  topAppBarScrolled: Shadows.elevation2,
  bottomAppBar: Shadows.elevation2,

  // Navigation
  navigationBar: Shadows.elevation2,
  navigationDrawer: Shadows.elevation1,
  navigationRail: Shadows.elevation0,

  // Dialogs and sheets
  dialog: Shadows.elevation5,
  bottomSheet: Shadows.elevation1,
  sideSheet: Shadows.elevation1,

  // Menus and tooltips
  menu: Shadows.elevation2,
  tooltip: Shadows.elevation2,

  // Search
  searchBar: Shadows.elevation0,
  searchBarActive: Shadows.elevation3,

  // Switches and sliders
  switch: Shadows.elevation0,
  slider: Shadows.elevation0,

  // Snackbar
  snackbar: Shadows.elevation3,
};

// Utility function to get elevation style
export const getElevationStyle = (level: keyof typeof Shadows) => Shadows[level];

// State-based elevation (for interactive components)
export const getStateElevation = (
  baseElevation: keyof typeof Shadows,
  state: 'normal' | 'hovered' | 'pressed' | 'focused' | 'disabled'
) => {
  const elevationMap = {
    elevation0: { normal: 0, hovered: 1, pressed: 1, focused: 0, disabled: 0 },
    elevation1: { normal: 1, hovered: 2, pressed: 1, focused: 1, disabled: 0 },
    elevation2: { normal: 3, hovered: 4, pressed: 2, focused: 3, disabled: 1 },
    elevation3: { normal: 6, hovered: 8, pressed: 6, focused: 6, disabled: 1 },
    elevation4: { normal: 8, hovered: 12, pressed: 8, focused: 8, disabled: 2 },
    elevation5: { normal: 12, hovered: 16, pressed: 12, focused: 12, disabled: 2 },
  };

  const targetElevation = elevationMap[baseElevation][state];
  const elevationKey = `elevation${targetElevation}` as keyof typeof Shadows;
  
  return Shadows[elevationKey] || Shadows.elevation0;
};