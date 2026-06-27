// ===================================================================================
// src/auth/PermissionGuard.tsx
// Enterprise Permission Guard
// SyncWare SaaS v2
// ===================================================================================

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

interface PermissionGuardProps {
  children: React.ReactNode;

  /**
   * Require a single permission
   * Example:
   * permission="customer:create"
   */
  permission?: string;

  /**
   * Require ANY permission
   * Example:
   * anyOf={["sale:create","sale:update"]}
   */
  anyOf?: string[];

  /**
   * Require ALL permissions
   * Example:
   * allOf={["sale:create","sale:approve"]}
   */
  allOf?: string[];

  /**
   * Redirect if unauthorized
   */
  redirectTo?: string;

  /**
   * Hide component instead of redirecting
   * Useful for Buttons/Menu Items
   */
  hideIfUnauthorized?: boolean;

  /**
   * Optional fallback UI
   */
  fallback?: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permission,
  anyOf = [],
  allOf = [],
  redirectTo = '/unauthorized',
  hideIfUnauthorized = false,
  fallback = null,
}) => {
  const location = useLocation();

  const {
    initialized,
    loading,
    isAuthenticated,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  } = useAuth();

  ////////////////////////////////////////////////////////////////////////////
  // Wait for authentication bootstrap
  ////////////////////////////////////////////////////////////////////////////

  if (!initialized || loading) {
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////
  // User not logged in
  ////////////////////////////////////////////////////////////////////////////

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  ////////////////////////////////////////////////////////////////////////////
  // Permission evaluation
  ////////////////////////////////////////////////////////////////////////////

  let authorized = true;

  if (permission) {
    authorized = hasPermission(permission);
  }

  if (authorized && anyOf.length > 0) {
    authorized = hasAnyPermission(anyOf);
  }

  if (authorized && allOf.length > 0) {
    authorized = hasAllPermissions(allOf);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Authorized
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

  return (
    <Navigate
      to={redirectTo}
      replace
      state={{
        from: location,
      }}
    />
  );
};

export default PermissionGuard;
