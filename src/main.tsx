import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "@store/index";
// import { getTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { defaultTheme } from "./theme/theme";
import RegisterModalPage from "./pages/Register/RegisterModalPage";
import RegisterPage from "./pages/Register/RegisterPage";
// import { ThemeProviderWithMode } from "@context/ThemeProviderWithMode";

// const theme = getTheme("light");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
     <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
        <App/>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
