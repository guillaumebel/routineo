// Material Design 3 Animation System
// Based on Material Motion principles

export const Duration = {
  // Standard durations
  short1: 50,    // Ultra-fast (state changes)
  short2: 100,   // Very fast (simple transitions)
  short3: 150,   // Fast (simple animations)
  short4: 200,   // Standard (most common)
  medium1: 250,  // Medium (complex transitions)
  medium2: 300,  // Medium-slow (entering/exiting)
  medium3: 350,  // Slow (large movements)
  medium4: 400,  // Very slow (complex sequences)
  long1: 450,    // Extra slow (emphasized transitions)
  long2: 500,    // Maximum (very emphasized)
  long3: 550,    // Extended
  long4: 600,    // Maximum extended
};

export const Easing = {
  // Standard easing curves
  standard: 'cubic-bezier(0.2, 0.0, 0, 1.0)', // Most common
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)', // Incoming elements
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)', // Outgoing elements
  emphasized: 'cubic-bezier(0.2, 0.0, 0, 1.0)', // Emphasized actions
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1.0)', // Emphasized incoming
  emphasizedAccelerate: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)', // Emphasized outgoing
  
  // Legacy easing (for React Native compatibility)
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
};

// Animation configurations for common patterns
export const Animations = {
  // Fade animations
  fadeIn: {
    duration: Duration.short4,
    easing: Easing.decelerate,
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    duration: Duration.short3,
    easing: Easing.accelerate,
    from: { opacity: 1 },
    to: { opacity: 0 },
  },

  // Scale animations
  scaleIn: {
    duration: Duration.medium2,
    easing: Easing.emphasizedDecelerate,
    from: { opacity: 0, transform: [{ scale: 0.8 }] },
    to: { opacity: 1, transform: [{ scale: 1 }] },
  },
  scaleOut: {
    duration: Duration.short4,
    easing: Easing.emphasizedAccelerate,
    from: { opacity: 1, transform: [{ scale: 1 }] },
    to: { opacity: 0, transform: [{ scale: 0.8 }] },
  },

  // Slide animations
  slideInFromRight: {
    duration: Duration.medium2,
    easing: Easing.emphasizedDecelerate,
    from: { transform: [{ translateX: 100 }] },
    to: { transform: [{ translateX: 0 }] },
  },
  slideOutToRight: {
    duration: Duration.short4,
    easing: Easing.emphasizedAccelerate,
    from: { transform: [{ translateX: 0 }] },
    to: { transform: [{ translateX: 100 }] },
  },
  slideInFromLeft: {
    duration: Duration.medium2,
    easing: Easing.emphasizedDecelerate,
    from: { transform: [{ translateX: -100 }] },
    to: { transform: [{ translateX: 0 }] },
  },
  slideOutToLeft: {
    duration: Duration.short4,
    easing: Easing.emphasizedAccelerate,
    from: { transform: [{ translateX: 0 }] },
    to: { transform: [{ translateX: -100 }] },
  },

  // Slide from bottom (for sheets, dialogs)
  slideInFromBottom: {
    duration: Duration.medium2,
    easing: Easing.emphasizedDecelerate,
    from: { transform: [{ translateY: 100 }] },
    to: { transform: [{ translateY: 0 }] },
  },
  slideOutToBottom: {
    duration: Duration.short4,
    easing: Easing.emphasizedAccelerate,
    from: { transform: [{ translateY: 0 }] },
    to: { transform: [{ translateY: 100 }] },
  },

  // Shared axis transitions
  sharedAxisXForward: {
    duration: Duration.medium2,
    easing: Easing.standard,
    from: { opacity: 0, transform: [{ translateX: 30 }] },
    to: { opacity: 1, transform: [{ translateX: 0 }] },
  },
  sharedAxisXBackward: {
    duration: Duration.medium2,
    easing: Easing.standard,
    from: { opacity: 0, transform: [{ translateX: -30 }] },
    to: { opacity: 1, transform: [{ translateX: 0 }] },
  },

  // Container transform (for cards, lists)
  containerTransform: {
    duration: Duration.medium3,
    easing: Easing.emphasizedDecelerate,
  },

  // FAB animations
  fabIn: {
    duration: Duration.medium1,
    easing: Easing.emphasizedDecelerate,
    from: { opacity: 0, transform: [{ scale: 0 }] },
    to: { opacity: 1, transform: [{ scale: 1 }] },
  },
  fabOut: {
    duration: Duration.short4,
    easing: Easing.emphasizedAccelerate,
    from: { opacity: 1, transform: [{ scale: 1 }] },
    to: { opacity: 0, transform: [{ scale: 0 }] },
  },

  // Ripple effect timing
  ripple: {
    duration: Duration.long2,
    easing: Easing.linear,
  },
};

// Stagger animations (for lists, grids)
export const Stagger = {
  // Standard stagger delay between items
  short: 25,   // Fast succession
  medium: 50,  // Standard
  long: 100,   // Slow succession
};

// Spring animation configurations
export const SpringConfigs = {
  gentle: {
    tension: 120,
    friction: 14,
  },
  wobbly: {
    tension: 180,
    friction: 12,
  },
  stiff: {
    tension: 200,
    friction: 26,
  },
  slow: {
    tension: 280,
    friction: 60,
  },
};