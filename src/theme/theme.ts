import type { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
  fontFamily: "'Manrope', sans-serif",

  // 🎨 Core color palette
  TEXT: "#111827",
  TEXT_MUTED: "#6B7280",
  BACKGROUND: "#F9FAFB",
  SIDEBAR: "#FFFFFF",
  BORDER: "#E5E7EB",
  SURFACE: "#FFFFFF",
  HOVER_BG: "#F3F4F6",

  // ✅ CTA + Semantic colors
  CTA_COLOR: "#1F6187",
  CTA_COLOR_LIGHT: "#1f618785",
  CTA_COLOR_HOVER: "#1A5475",
  CTA_COLOR_ALERT: "#ff8400",
  CTA_COLOR_ALERT_HOVER: "#e67802",
  ERROR_COLOR: "rgba(255,0,0,0.5)",
  CTA_WARN: "#D4AC27",
  CTA_WARN_HOVER: "#E3C564",
  CTA_ERROR: "#D43B27",
  CTA_SUCCESS: "#387192",
  CTA_GREEN: "#4caf50",

  // Neutral and utility shades
  BLACK: "#454543",
  WHITE: "#ffffff",
  WHITE_HOVER: "#fdfcfc",
  LIGHT_GREY: "#d0d0d0",
  GREY: "#e1e0e0",
  GREY_DISABLED: "#ececec",
  BG_GREY: "#f6f6f6",
  BG_GREY_HOVER: "#dedede",
  BTN_HOVER: "#1A5475",
  SIDE_BAR_ITEM_HOVER: "#1A5475",
  DARKISH_GREEN: "#1A5475",
  YELLOW: "#fffb44",

  // Content Layout Shades
  CONTENT_BG: "#F9FAFB",
  CONTENT_SURFACE: "#FFFFFF",
  CONTENT_CARD: "#FFFFFF",
  CONTENT_BORDER: "#E5E7EB",
  CONTENT_SHADOW: "0 1px 3px rgba(0,0,0,0.08)",
  CONTENT_GRADIENT: "linear-gradient(135deg, #ffffff 0%, #f6f6f6 100%)",

  // Header styling
  HEADER_BG: "#FFFFFF",
  HEADER_BORDER: "#E5E7EB",
  HEADER_SHADOW: "0 2px 6px rgba(0,0,0,0.05)",
  TEXT_PRIMARY: "#111827",

  // 🧩 Font sizes
  font: {
    size: {
      h1: "2rem",
      h2: "1.75rem",
      h3: "1.5rem",
      h4: "1.25rem",
      h5: "1rem",
      h6: "0.875rem",
      body: "1rem",
      label: "0.875rem",
      small: "0.75rem",
      lg: "1.125rem",
    },
  },

  // 🧩 Border radius
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "9999px",
  },

  // 🧩 Utility helpers
  spacing: (factor: number) => `${factor * 8}px`,
};
