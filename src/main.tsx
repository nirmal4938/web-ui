// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/theme/theme";
import { GlobalStyle } from "@theme/GlobalStyles"; // 👈 import this
import { store, persistor } from "@/state/store/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <>
            <GlobalStyle /> {/* 👈 add this line */}
            <App />
          </>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
