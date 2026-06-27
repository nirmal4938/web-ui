// src/AppRoutes.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import MainLayout from '@layouts/MainLayout';
import NoAuthLayout from '@layouts/NoAuthLayout';

// Pages
import Home from '@pages/Home';
import Teams from '@pages/Teams';
import NotFound from '@pages/NotFound';
import RegisterModalPage from '@pages/Register/RegisterModalPage';
import LoginPage from '@pages/Login/LoginPage';
import AboutPage from '@pages/About/AboutPage';
import ContactPage from '@pages/Contact/ContactPage';
import HomePage from '@pages/Home/HomePage';
import TermsPage from '@pages/policies/TermsPage';
import PrivacyPage from '@pages/policies/PrivacyPage';
import RefundPolicyPage from '@pages/policies/RefundPolicyPage';
import ShippingPolicyPage from '@pages/policies/ShippingPolicyPage';

// Guards
// Auth
import ProtectedRoute from '@/auth/ProtectedRoute';
import PermissionGuard from '@/auth/PermissionGuard';
import RoleGuard from '@/auth/RoleGuard';
import BusinessGuard from '@/auth/BusinessGuard';

// Pages
import Unauthorized from '@/auth/Unauthorized';

// Redux selector
import { selectIsAuthenticated } from '@state/selectors/authSelectors';

// Cricket Pages
import PlayersPage from '@/pages/cricket/PlayersPage';
import SearchPlayersPage from '@/pages/cricket/SearchPlayersPage';
import TournamentsPage from '@/pages/cricket/TournamentsPage';

// Election Pages (you’ll create these soon)
// import ElectionDashboardPage from "@/pages/election/ElectionDashboardPage";
import ElectionDashboardPage from '@/pages/election/ElectionDashboardPage';
import CandidateListPage from '@/pages/election/CandidateListPage';
import VoterListPage from '@pages/election/VoterListingPage';
import VotingBoothPage from '@/pages/election/VotingBoothPage';
import ResultDashboardPage from '@/pages/election/ResultDashboardPage';
import ElectionAdminPage from '@/pages/election/ResultDashboardPage';

// Others
import AuthSuccessPage from '@/pages/Login/AuthSuccessPage';
import Footer from '@/components/layout/Footer';
import { Download } from 'lucide-react';
import Button from '@/components/atoms/Button/Button';
import QuestionListPage from '@/pages/Questions/QuestionListPage';
import { SCQ } from '@/pages/Questions/SCQPage';
import { MCQ } from '@/pages/Questions/MCQPage';
import { NAT } from '@/pages/Questions/NATPage';
import { MatrixMatch } from '@/pages/Questions/MatrixMatchPage';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Pages --- */}
        {[
          { path: '/terms', element: <TermsPage /> },
          { path: '/privacy', element: <PrivacyPage /> },
          { path: '/refund-policy', element: <RefundPolicyPage /> },
          { path: '/shipping-policy', element: <ShippingPolicyPage /> },
          { path: '/home-page', element: <HomePage /> },
          { path: '/about-us', element: <AboutPage /> },
          { path: '/contact', element: <ContactPage /> },
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterModalPage /> },
        ].map(({ path, element }) => (
          <Route key={path} path={path} element={<NoAuthLayout>{element}</NoAuthLayout>} />
        ))}

        <Route
          path="/auth/success"
          element={
            <NoAuthLayout>
              <AuthSuccessPage />
            </NoAuthLayout>
          }
        />

        <Route
          path="/unauthorized"
          element={
            <NoAuthLayout>
              <Unauthorized />
            </NoAuthLayout>
          }
        />

        {/* --- Protected Routes --- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <RoleGuard roles={['platform.super_admin']}>
                <MainLayout>
                  <Teams />
                </MainLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* --- Fallback --- */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <MainLayout>
                <NotFound />
              </MainLayout>
            ) : (
              <NoAuthLayout>
                <NotFound />
              </NoAuthLayout>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
