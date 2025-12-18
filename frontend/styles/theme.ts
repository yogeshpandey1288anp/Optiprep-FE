/* =======================
   TYPOGRAPHY TOKENS
======================= */

export const typography = {
  fontFamily:
    "var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, sans-serif",

  size: {
    xs: "12px",
    sm: "13px",
    base: "14px",
    md: "15px",
    lg: "16px",
  },

  lineHeight: {
    tight: "1.3",
    normal: "1.45",
    relaxed: "1.6",
  },

  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
};

/* =======================
   LIGHT THEME
======================= */

export const lightTheme = {
  background: "#F7FAFC",
  card: "#FFFFFF",
  text: "#1A1A1A",
  border: "#E2E8F0",
  brand: "#522463",

  font: typography,

  mutedText: "#64748B",
  tableHeaderBg: "#F1EAFE",
  hoverBg: "#F8FAFC",

  success: "#16A34A",
  warning: "#D97706",
  error: "#DC2626",
};

/* =======================
   DARK THEME
======================= */

export const darkTheme = {
  background: "#1A1023",
  card: "#24102F",
  text: "#FFFFFF",
  border: "#3A2547",
  brand: "#BE8EFF",

  font: typography,

  mutedText: "#B6AFC3",
  tableHeaderBg: "#2A1738",
  hoverBg: "#2F1D3F",

  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
};
