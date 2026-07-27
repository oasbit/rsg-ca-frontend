export type AccessibilityPreferences = {
  fontScale: number;
  highContrast: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  reduceMotion: boolean;
};

export const A11Y_STORAGE_KEY = "rsg-a11y-preferences";

export const DEFAULT_A11Y_PREFERENCES: AccessibilityPreferences = {
  fontScale: 100,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  reduceMotion: false,
};

export const FONT_SCALE_MIN = 100;
export const FONT_SCALE_MAX = 140;
export const FONT_SCALE_STEP = 10;

export function clampFontScale(value: number): number {
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, value));
}

export function loadAccessibilityPreferences(): AccessibilityPreferences {
  if (typeof window === "undefined") {
    return DEFAULT_A11Y_PREFERENCES;
  }

  try {
    const raw = window.localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return DEFAULT_A11Y_PREFERENCES;

    const parsed = JSON.parse(raw) as Partial<AccessibilityPreferences>;
    return {
      fontScale: clampFontScale(parsed.fontScale ?? DEFAULT_A11Y_PREFERENCES.fontScale),
      highContrast: Boolean(parsed.highContrast),
      highlightLinks: Boolean(parsed.highlightLinks),
      readableFont: Boolean(parsed.readableFont),
      reduceMotion: Boolean(parsed.reduceMotion),
    };
  } catch {
    return DEFAULT_A11Y_PREFERENCES;
  }
}

export function saveAccessibilityPreferences(preferences: AccessibilityPreferences): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(preferences));
}

export function applyAccessibilityPreferences(preferences: AccessibilityPreferences): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--a11y-font-scale", String(preferences.fontScale / 100));
  root.dataset.a11yHighContrast = preferences.highContrast ? "true" : "false";
  root.dataset.a11yHighlightLinks = preferences.highlightLinks ? "true" : "false";
  root.dataset.a11yReadableFont = preferences.readableFont ? "true" : "false";
  root.dataset.a11yReduceMotion = preferences.reduceMotion ? "true" : "false";
}

export function clearAccessibilityPreferences(): AccessibilityPreferences {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(A11Y_STORAGE_KEY);
  }

  applyAccessibilityPreferences(DEFAULT_A11Y_PREFERENCES);
  return DEFAULT_A11Y_PREFERENCES;
}
