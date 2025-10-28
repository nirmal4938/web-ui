// // src/theme/index.ts
// import type { DefaultTheme } from "styled-components";

// const base = {
//   typography: {
//     family: "'Inter', 'Manrope', sans-serif",
//     size: {
//       xs: "0.75rem",
//       sm: "0.875rem",
//       base: "1rem",
//       lg: "1.125rem",
//       xl: "1.25rem",
//       h2: "1.6rem",
//       label: "0.9rem",
//     },
//     weight: {
//       normal: 400,
//       medium: 500,
//       bold: 700,
//     },
//   },
//   radius: {
//     sm: "4px",
//     md: "8px",
//     lg: "12px",
//   },
//   spacing: (factor: number) => `${factor * 8}px`,
//   breakpoints: {
//     sm: "480px",
//     md: "768px",
//     lg: "1024px",
//     xl: "1280px",
//   },
// };

// const colorModes = {
//   light: {
//     primary: "#007bff",
//     secondary: "#6c757d",
//     text: "#111827",
//     textMuted: "#6B7280",
//     background: "#F9FAFB",
//     sidebar: "#FFFFFF",
//     border: "#E5E7EB",
//     success: "#10B981",
//     warning: "#F59E0B",
//     error: "#EF4444",
//   },
//   dark: {
//     primary: "#60A5FA",
//     secondary: "#9CA3AF",
//     text: "#F9FAFB",
//     textMuted: "#9CA3AF",
//     background: "#1F2937",
//     sidebar: "#111827",
//     border: "#4B5563",
//     success: "#34D399",
//     warning: "#FBBF24",
//     error: "#F87171",
//   },
// };

// // unified function to get light/dark
// export const getTheme = (mode: "light" | "dark" = "light"): DefaultTheme => ({
//   mode,
//   colors: colorModes[mode],
//   ...base,
// });

// export type AppTheme = ReturnType<typeof getTheme>;
