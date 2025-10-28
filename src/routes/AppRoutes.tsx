// src/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Teams from "@pages/Teams";
import NotFound from "@pages/NotFound";
import MainLayout from "@layouts/MainLayout";
import NoAuthLayout from "@layouts/NoAuthLayout";
import RegisterModalPage from "@pages/Register/RegisterModalPage";
import LoginPage from "@pages/Login/LoginPage";
import AuthGuard from "@components/guards/AuthGuard";
import AboutPage from "@pages/About/AboutPage";
import ContactPage from "@pages/Contact/ContactPage";
import HomePage from "@/pages/Home/HomePage";
import TermsPage from "@/pages/policies/TermsPage";
import PrivacyPage from "@/pages/policies/PrivacyPage";
import RefundPolicyPage from "@/pages/policies/RefundPolicyPage";
import ShippingPolicyPage from "@/pages/policies/ShippingPolicyPage";

// ⚡ Replace with Redux, Zustand, or Context in production
const isAuthenticated = false;

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* --- Public / No Auth Routes --- */}
            <Route
        path="/terms"
        element={
          <NoAuthLayout>
            <TermsPage />
          </NoAuthLayout>
        }
      />
            <Route
        path="/privacy"
        element={
          <NoAuthLayout>
            <PrivacyPage />
          </NoAuthLayout>
        }
      />
            <Route
        path="/refund-policy"
        element={
          <NoAuthLayout>
            <RefundPolicyPage />
          </NoAuthLayout>
        }
      />
            <Route
        path="/shipping-policy"
        element={
          <NoAuthLayout>
            <ShippingPolicyPage />
          </NoAuthLayout>
        }
      />
      
            <Route
        path="/home-page"
        element={
          <NoAuthLayout>
            <HomePage />
          </NoAuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <NoAuthLayout>
            <RegisterModalPage />
          </NoAuthLayout>
        }
      />
      <Route
        path="/home-page"
        element={
          <NoAuthLayout>
            <HomePage />
          </NoAuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <NoAuthLayout>
            <LoginPage />
          </NoAuthLayout>
        }
      />
      <Route
        path="/about-us"
        element={
          <NoAuthLayout>
            <AboutPage />
          </NoAuthLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <NoAuthLayout>
            <ContactPage />
          </NoAuthLayout>
        }
      />

      {/* --- Protected Routes --- */}
      <Route
        path="/"
        element={
          <AuthGuard isAuthenticated={isAuthenticated}>
            <MainLayout>
              <Home />
            </MainLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/teams"
        element={
          <AuthGuard isAuthenticated={isAuthenticated}>
            <MainLayout>
              <Teams />
            </MainLayout>
          </AuthGuard>
        }
      />

      {/* --- Fallback Route --- */}
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

export default AppRoutes;
