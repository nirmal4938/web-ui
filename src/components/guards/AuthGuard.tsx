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
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

export default AuthGuard;
