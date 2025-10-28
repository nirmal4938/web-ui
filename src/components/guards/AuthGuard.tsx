// src/components/guards/AuthGuard.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
  isAuthenticated: boolean; 
  redirectTo?: string;     
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  isAuthenticated,
  redirectTo = "/home-page",
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
