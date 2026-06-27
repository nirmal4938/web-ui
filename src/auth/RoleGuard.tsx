// ===================================================================================
// src/auth/RoleGuard.tsx
// Enterprise Role Guard
// SyncWare SaaS v2
// ===================================================================================

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

interface RoleGuardProps {
  children: React.ReactNode;

  /**
   * Single required role
   * Example:
   * role="mobile.owner"
   */
  role?: string;

  /**
   * Multiple accepted roles
   * Example:
   * roles={["platform.super_admin","platform.admin"]}
   */
  roles?: string[];

  /**
   * Minimum role level
   * Example:
   * minimumLevel={50}
   */
  minimumLevel?: number;

  /**
   * Redirect path
   */
  redirectTo?: string;

  /**
   * Hide instead of redirect
   */
  hideIfUnauthorized?: boolean;

  /**
   * Optional fallback component
   */
  fallback?: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  role,
  roles = [],
  minimumLevel,
  redirectTo = '/unauthorized',
  hideIfUnauthorized = false,
  fallback = null,
}) => {
  const location = useLocation();

  const { initialized, loading, isAuthenticated, role: currentRole, hasRole } = useAuth();

  ////////////////////////////////////////////////////////////////////////////
  // Wait for bootstrap
  ////////////////////////////////////////////////////////////////////////////

  if (!initialized || loading) {
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Not logged in
  ////////////////////////////////////////////////////////////////////////////

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Role Validation
  ////////////////////////////////////////////////////////////////////////////

  let authorized = true;

  // Single role
  if (role) {
    authorized = hasRole(role);
  }

  // Multiple roles
  if (authorized && roles.length > 0) {
    authorized = hasRole(...roles);
  }

  // Role hierarchy
  if (authorized && minimumLevel !== undefined && currentRole) {
    authorized = currentRole.level >= minimumLevel;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Success
  ////////////////////////////////////////////////////////////////////////////

  if (authorized) {
    return <>{children}</>;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Hide Component
  ////////////////////////////////////////////////////////////////////////////

  if (hideIfUnauthorized) {
    return <>{fallback}</>;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Redirect
  ////////////////////////////////////////////////////////////////////////////

  return <Navigate to={redirectTo} replace state={{ from: location }} />;
};

export default RoleGuard;
