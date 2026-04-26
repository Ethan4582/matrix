"use client";

import { ThemeMatrixIcon } from "@/components/package-manager-install-toolbar";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "dotmatrix-theme";
const DEFAULT_THEME: ThemeMode = "dark";

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      applyTheme(stored);
      setTheme(stored);
      return;
    }

    applyTheme(DEFAULT_THEME);
    setTheme(DEFAULT_THEME);
  }, []);

  return (
    <div className="w-max rounded-lg bg-surface-soft p-1">
      <div className="flex min-w-0 items-center justify-center gap-1 rounded-sm bg-bg p-[7px]">
        <button
          type="button"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          onClick={() => {
            const current = theme ?? DEFAULT_THEME;
            const next: ThemeMode = current === "dark" ? "light" : "dark";
            applyTheme(next);
            window.localStorage.setItem(THEME_STORAGE_KEY, next);
            setTheme(next);
          }}
          className="inline-flex min-w-0 items-center justify-center text-fg-strong transition-[opacity,color] duration-150 ease-out hover:opacity-90"
        >
          <ThemeMatrixIcon className="size-4 sm:size-6" />
        </button>
      </div>
    </div>
  );
}
