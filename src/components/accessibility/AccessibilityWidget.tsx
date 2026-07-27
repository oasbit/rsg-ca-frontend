"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AccessibilityIcon } from "@/components/icons/AccessibilityIcon";
import { cn } from "@/lib/utils";
import {
  applyAccessibilityPreferences,
  clampFontScale,
  clearAccessibilityPreferences,
  DEFAULT_A11Y_PREFERENCES,
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  FONT_SCALE_STEP,
  loadAccessibilityPreferences,
  saveAccessibilityPreferences,
  type AccessibilityPreferences,
} from "@/lib/accessibility/preferences";

interface ToggleOptionProps {
  label: string;
  description: string;
  pressed: boolean;
  onToggle: () => void;
}

function ToggleOption({ label, description, pressed, onToggle }: ToggleOptionProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      onClick={onToggle}
      className={cn(
        "flex w-full items-start justify-between gap-3 rounded-lg border px-3 py-3 text-left transition-colors duration-200",
        pressed
          ? "border-accent bg-accent/10 text-white"
          : "border-white/15 bg-black/40 text-white/85 hover:border-white/30 hover:bg-white/[0.06]",
      )}
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-white/65">{description}</span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 inline-flex h-6 w-10 shrink-0 items-center rounded-full border px-0.5 transition-colors duration-200",
          pressed ? "border-accent bg-accent/25" : "border-white/20 bg-white/5",
        )}
      >
        <span
          className={cn(
            "h-4 w-4 rounded-full bg-white transition-transform duration-200",
            pressed ? "translate-x-4 bg-accent" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

export function AccessibilityWidget() {
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(
    DEFAULT_A11Y_PREFERENCES,
  );

  const updatePreferences = useCallback((next: AccessibilityPreferences) => {
    setPreferences(next);
    applyAccessibilityPreferences(next);
    saveAccessibilityPreferences(next);
  }, []);

  useEffect(() => {
    const stored = loadAccessibilityPreferences();
    setPreferences(stored);
    applyAccessibilityPreferences(stored);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  function togglePreference(key: keyof Omit<AccessibilityPreferences, "fontScale">) {
    updatePreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  }

  function changeFontScale(delta: number) {
    updatePreferences({
      ...preferences,
      fontScale: clampFontScale(preferences.fontScale + delta),
    });
  }

  function resetPreferences() {
    const defaults = clearAccessibilityPreferences();
    setPreferences(defaults);
  }

  return (
    <div className="fixed bottom-4 left-4 z-[120] flex flex-col items-start gap-3 sm:bottom-6 sm:left-6">
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Accessibility options"
          className="w-[min(100vw-2rem,20rem)] rounded-xl border border-white/15 bg-black/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">Accessibility</p>
              <p className="mt-1 text-xs leading-5 text-white/65">
                Adjust the site to your needs. Settings are saved in this browser.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-white/15 p-1.5 text-white/70 transition-colors hover:border-white/30 hover:text-white"
              aria-label="Close accessibility options"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-white/15 bg-black/40 p-3">
              <p className="text-sm font-medium text-white">Text size</p>
              <p className="mt-1 text-xs leading-5 text-white/65">
                Increase or decrease text across the site.
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => changeFontScale(-FONT_SCALE_STEP)}
                  disabled={preferences.fontScale <= FONT_SCALE_MIN}
                  className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-white/15 px-3 text-sm text-white transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease text size"
                >
                  A−
                </button>
                <span className="text-sm tabular-nums text-white/85" aria-live="polite">
                  {preferences.fontScale}%
                </span>
                <button
                  type="button"
                  onClick={() => changeFontScale(FONT_SCALE_STEP)}
                  disabled={preferences.fontScale >= FONT_SCALE_MAX}
                  className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-white/15 px-3 text-sm text-white transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase text size"
                >
                  A+
                </button>
              </div>
            </div>

            <ToggleOption
              label="High contrast"
              description="Stronger contrast for text, links, and borders."
              pressed={preferences.highContrast}
              onToggle={() => togglePreference("highContrast")}
            />

            <ToggleOption
              label="Highlight links"
              description="Underline links so they are easier to spot."
              pressed={preferences.highlightLinks}
              onToggle={() => togglePreference("highlightLinks")}
            />

            <ToggleOption
              label="Readable font"
              description="Use a simpler font with more spacing for body text."
              pressed={preferences.readableFont}
              onToggle={() => togglePreference("readableFont")}
            />

            <ToggleOption
              label="Reduce motion"
              description="Minimize animations and transitions."
              pressed={preferences.reduceMotion}
              onToggle={() => togglePreference("reduceMotion")}
            />

            <button
              type="button"
              onClick={resetPreferences}
              className="w-full rounded-lg border border-white/15 px-3 py-2.5 text-sm text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
            >
              Reset accessibility settings
            </button>
          </div>
        </div>
      ) : null}

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open accessibility options"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-full border p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] transition-colors duration-200",
          open
            ? "border-accent bg-accent text-black"
            : "border-white/20 bg-black/90 text-accent hover:border-accent hover:bg-black",
        )}
      >
        <AccessibilityIcon />
      </button>
    </div>
  );
}
