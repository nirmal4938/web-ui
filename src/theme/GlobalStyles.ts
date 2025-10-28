// src/theme/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Manrope';
    src: url('/src/assets/fonts/static/Manrope-Regular.ttf') format('truetype');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('/src/assets/fonts/static/Manrope-Medium.ttf') format('truetype');
    font-weight: 500;
  }
  @font-face {
    font-family: 'Manrope';
    src: url('/src/assets/fonts/static/Manrope-Bold.ttf') format('truetype');
    font-weight: 700;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: ${({ theme }) => theme.fontFamily};
    background-color: ${({ theme }) => theme.BG_GREY};
    color: ${({ theme }) => theme.BLACK};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button, input {
    font-family: inherit;
  }
`;
