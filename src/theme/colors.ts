/**
 * Neon synthwave palette: deep darks, electric neon accents, high contrast.
 */
export const colors = {
  // Backgrounds
  background: '#0d0221',       // near-black purple
  surface: '#1a0a2e',         // card/input background
  surfaceElevated: '#2d1b4e', // slightly brighter surface

  // Neon accents
  neonPink: '#ff2a6d',
  neonCyan: '#05d9e8',
  neonPurple: '#d300c5',
  neonBlue: '#6c63ff',
  accent: '#05d9e8',          // primary accent (cyan)
  accentSecondary: '#ff2a6d', // pink for CTAs / links

  // Text
  text: '#e8e8e8',
  textMuted: '#a0a0c0',
  textBright: '#ffffff',

  // UI
  border: '#2d1b4e',
  inputBg: '#1a0a2e',
  buttonPrimary: '#ff2a6d',
  buttonPrimaryText: '#ffffff',
  link: '#05d9e8',
  destructive: '#ff2a6d',
  tabActive: '#05d9e8',
  tabInactive: '#6b6b8a',
} as const;
