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

// Cricket Pages
import PlayersPage from "@/pages/cricket/PlayersPage";
import SearchPlayersPage from "@/pages/cricket/SearchPlayersPage";
import TournamentsPage from "@/pages/cricket/TournamentsPage";

// Election Pages (you’ll create these soon)
// import ElectionDashboardPage from "@/pages/election/ElectionDashboardPage";
import ElectionDashboardPage from "@/pages/election/ElectionDashboardPage";
import CandidateListPage from '@/pages/election/CandidateListPage';
import VoterListPage from '@pages/election/VoterListingPage';
import VotingBoothPage from "@/pages/election/VotingBoothPage";
import ResultDashboardPage from "@/pages/election/ResultDashboardPage";
import ElectionAdminPage from "@/pages/election/ResultDashboardPage";

// Others
import AuthSuccessPage from "@/pages/Login/AuthSuccessPage";
import Footer from "@/components/layout/Footer";
import { Download } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import QuestionListPage from "@/pages/Questions/QuestionListPage";

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Routes>

        {/* --- Public Pages --- */}
        {[
          { path: "/terms", element: <TermsPage /> },
          { path: "/privacy", element: <PrivacyPage /> },
          { path: "/refund-policy", element: <RefundPolicyPage /> },
          { path: "/shipping-policy", element: <ShippingPolicyPage /> },
          { path: "/home-page", element: <HomePage /> },
          { path: "/about-us", element: <AboutPage /> },
          { path: "/contact", element: <ContactPage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterModalPage /> },
        ].map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<NoAuthLayout>{element}</NoAuthLayout>}
          />
        ))}

        <Route
          path="/auth/success"
          element={
            <NoAuthLayout>
              <AuthSuccessPage />
            </NoAuthLayout>
          }
        />

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

        {/* 🏏 Cricket Routes */}
        <Route
          path="/cricket/players"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout
                footer={
                  <Footer
                    leftContent={<div>Showing 24 Players</div>}
                    centerContent={<div>© 2025 Cricket CRM Portal</div>}
                    rightContent={
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Add Player
                        </Button>
                        <Button variant="ghost" size="sm" icon={<Download size={14} />}>
                          Export CSV
                        </Button>
                      </div>
                    }
                  />
                }
              >
                <PlayersPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cricket/players/search"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <SearchPlayersPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cricket/tournaments"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <TournamentsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* 🗳️ Election Routes */}
        <Route
          path="/election"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <ElectionDashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/election/candidates"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <CandidateListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/election/voters"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <VoterListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/election/voting/v2"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <VotingBoothPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/election/results"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <ResultDashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/election/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout>
                <ElectionAdminPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />


        <Route
  path="/questions"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <MainLayout>
        <QuestionListPage />
      </MainLayout>
    </ProtectedRoute>
  }
/>

{/* <Route
  path="/questions/topics"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <MainLayout>
        <QuestionTopicsPage />
      </MainLayout>
    </ProtectedRoute>
  }
/> */}

{/* <Route
  path="/questions/difficulty"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <MainLayout>
        <QuestionDifficultyPage />
      </MainLayout>
    </ProtectedRoute>
  }
/> */}


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
