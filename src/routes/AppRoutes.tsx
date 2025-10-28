import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import Teams from "@pages/Teams";
import NotFound from "@pages/NotFound";
import MainLayout from "@layouts/MainLayout";
import NoAuthLayout from "@layouts/NoAuthLayout";
import RegisterModalPage from "@pages/Register/RegisterModalPage";
import AuthGuard from "@components/guards/AuthGuard";
import LoginPage from "@/pages/Login/LoginPage";

// Simulated auth state (replace with your Redux or Context auth)
const isAuthenticated = false;

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public / No Auth routes */}
      <Route
        path="/register"
        element={
          <NoAuthLayout>
            <RegisterModalPage />
          </NoAuthLayout>
        }
      />
      <Route path="/login" element={<NoAuthLayout><LoginPage /></NoAuthLayout>} />

      {/* Protected routes */}
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

      {/* Fallback */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
