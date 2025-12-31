"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mode, setMode] = useState<ThemeMode>("light");
    const [mounted, setMounted] = useState(false);

    /* -------- LOAD SAVED THEME -------- */
    useEffect(() => {
        const saved = localStorage.getItem("theme") as ThemeMode | null;
        if (saved) setMode(saved);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const next = mode === "light" ? "dark" : "light";
        setMode(next);
        localStorage.setItem("theme", next);
    };

    if (!mounted) return null; // prevent hydration flash

    const theme = mode === "light" ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}

/* ---------------- HOOKS ---------------- */

export function useThemeContext() {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useThemeContext must be used inside ThemeContextProvider");
    }
    return ctx;
}

/* ✅ ALIAS — THIS FIXES YOUR ERRORS */
export const useTheme = useThemeContext;
