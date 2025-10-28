import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: string;

    // 🧩 Font sizes
    font: {
      size: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        body: string;
        label: string;
        small: string;
        lg: string;
      };
    };

    // 🧩 Border radius
    radius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };

    // Core colors
    TEXT: string;
    TEXT_MUTED: string;
    BACKGROUND: string;
    SIDEBAR: string;
    BORDER: string;
    SURFACE: string;
    HOVER_BG: string;

    // CTA + Semantic colors
    CTA_COLOR: string;
    CTA_COLOR_LIGHT: string;
    CTA_COLOR_HOVER: string;
    CTA_COLOR_ALERT: string;
    CTA_COLOR_ALERT_HOVER: string;
    ERROR_COLOR: string;
    CTA_WARN: string;
    CTA_WARN_HOVER: string;
    CTA_ERROR: string;
    CTA_SUCCESS: string;
    CTA_GREEN: string;

    // Neutral shades
    BLACK: string;
    WHITE: string;
    WHITE_HOVER: string;
    LIGHT_GREY: string;
    GREY: string;
    GREY_DISABLED: string;
    BG_GREY: string;
    BG_GREY_HOVER: string;
    BTN_HOVER: string;
    SIDE_BAR_ITEM_HOVER: string;
    DARKISH_GREEN: string;
    YELLOW: string;

    // 🌈 Content Layout Shades
    CONTENT_BG: string;
    CONTENT_SURFACE: string;
    CONTENT_CARD: string;
    CONTENT_BORDER: string;
    CONTENT_SHADOW: string;
    CONTENT_GRADIENT: string;

    // 🧭 Header styling
    HEADER_BG: string;
    HEADER_BORDER: string;
    HEADER_SHADOW: string;

    // 🧩 Utility helper
    spacing: (factor: number) => string;
  }
}
