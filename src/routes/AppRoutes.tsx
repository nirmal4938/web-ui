// src/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import MainLayout from "@layouts/MainLayout";
import NoAuthLayout from "@layouts/NoAuthLayout";

// Pages
import Home from "@pages/Home";
import Teams from "@pages/Teams";
import NotFound from "@pages/NotFound";
import RegisterModalPage from "@pages/Register/RegisterModalPage";
import LoginPage from "@pages/Login/LoginPage";
import AboutPage from "@pages/About/AboutPage";
import ContactPage from "@pages/Contact/ContactPage";
import HomePage from "@pages/Home/HomePage";
import TermsPage from "@pages/policies/TermsPage";
import PrivacyPage from "@pages/policies/PrivacyPage";
import RefundPolicyPage from "@pages/policies/RefundPolicyPage";
import ShippingPolicyPage from "@pages/policies/ShippingPolicyPage";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./ProtectedRoute";

// Redux selector
import { selectIsAuthenticated } from "@state/selectors/authSelectors";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Info Pages --- */}
        {[
          { path: "/terms", element: <TermsPage /> },
          { path: "/privacy", element: <PrivacyPage /> },
          { path: "/refund-policy", element: <RefundPolicyPage /> },
          { path: "/shipping-policy", element: <ShippingPolicyPage /> },
          { path: "/home-page", element: <HomePage /> },
          { path: "/about-us", element: <AboutPage /> },
          { path: "/contact", element: <ContactPage /> },
          {path: "/login", element: <LoginPage/>},
          {path: "/register", element: <RegisterModalPage />}
        ].map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<NoAuthLayout>{element}</NoAuthLayout>}
          />
        ))}

        {/* --- Auth Pages --- */}
        {/* <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <NoAuthLayout>
                <LoginPage />
              </NoAuthLayout>
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <NoAuthLayout>
                <RegisterModalPage />
              </NoAuthLayout>
            </PublicRoute>
          }
        /> */}

        {/* --- Protected Routes --- */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <Teams />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* --- Fallback --- */}
        <Route
          path="*"
          element={
            <NoAuthLayout>
              <NotFound />
            </NoAuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
