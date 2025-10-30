// src/components/guards/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
  redirectTo = "/home-page",
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
