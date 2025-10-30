// src/components/guards/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  redirectTo?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  isAuthenticated,
  children,
  redirectTo = "/",
}) => {
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
