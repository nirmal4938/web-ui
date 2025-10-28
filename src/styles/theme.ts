// src/styles/theme.ts

const base = {
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: (factor: number) => `${factor * 8}px`,
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

const colorModes = {
  light: {
    // 🎨 Brand & Accent
    primary: "#007bff",
    primaryDark: "#0056b3",
    secondary: "#6c757d",

    // 🎨 Text
    text: "#1F2937",
    textPrimary: "#111827",
    textMuted: "#6B7280",
    activeText: "#FFFFFF",
    upgradeText: "#F9FAFB",

    // 🎨 Backgrounds
    background: "#F9FAFB",
    sidebar: "#FFFFFF",
    sidebarHover: "#F3F4F6",
    sidebarActive: "#E0E7FF",
    activeBg: "#E0E7FF",
    hoverBg: "#F3F4F6",
    upgradeBg: "#E0E7FF",
    inputBg: "#F3F4F6",

    // 🎨 Border & Divider
    border: "#E5E7EB",
    borderMuted: "#D1D5DB",
    divider: "#E0E0E0",

    // 🎨 Status
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
  dark: {
    primary: "#60A5FA",
    primaryDark: "#1E3A8A",
    secondary: "#9CA3AF",

    text: "#F9FAFB",
    textPrimary: "#FFFFFF",
    textMuted: "#9CA3AF",
    activeText: "#FFFFFF",
    upgradeText: "#E0F2FE",

    background: "#1F2937",
    sidebar: "#111827",
    sidebarHover: "#374151",
    sidebarActive: "#2563EB",
    activeBg: "#2563EB",
    hoverBg: "#374151",
    upgradeBg: "#1E40AF",
    inputBg: "#374151",

    border: "#4B5563",
    borderMuted: "#6B7280",
    divider: "#374151",

    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
  },
};

export const getTheme = (mode: "light" | "dark") => ({
  mode,
  colors: colorModes[mode],
  ...base,
});

export type AppTheme = ReturnType<typeof getTheme>;
