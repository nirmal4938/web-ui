// ===================================================================================
// src/auth/BusinessGuard.tsx
// Enterprise Business Guard
// SyncWare SaaS v2
// ===================================================================================

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface BusinessGuardProps {
  children: React.ReactNode;

  /**
   * Exact business id
   */
  businessId?: string;

  /**
   * Business slug
   */
  businessSlug?: string;

  /**
   * Allowed category keys
   * Example:
   * ["mobile","garments"]
   */
  category?: string | string[];

  /**
   * Allow Platform Super Admin
   */
  allowPlatform?: boolean;

  /**
   * Redirect path
   */
  redirectTo?: string;

  /**
   * Hide component instead of redirect
   */
  hideIfUnauthorized?: boolean;

  /**
   * Optional fallback component
   */
  fallback?: React.ReactNode;
}

const BusinessGuard: React.FC<BusinessGuardProps> = ({
  children,
  businessId,
  businessSlug,
  category,
  allowPlatform = true,
  redirectTo = '/unauthorized',
  hideIfUnauthorized = false,
  fallback = null,
}) => {
  const location = useLocation();

  const { initialized, loading, isAuthenticated, scope, business } = useAuth();

  ////////////////////////////////////////////////////////////////////////////
  // Wait for auth bootstrap
  ////////////////////////////////////////////////////////////////////////////

  if (!initialized || loading) {
    return null;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Login required
  ////////////////////////////////////////////////////////////////////////////

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Platform users bypass business validation
  ////////////////////////////////////////////////////////////////////////////

  if (allowPlatform && scope === 'platform') {
    return <>{children}</>;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Business session required
  ////////////////////////////////////////////////////////////////////////////

  if (!business) {
    if (hideIfUnauthorized) {
      return <>{fallback}</>;
    }

    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Business ID validation
  ////////////////////////////////////////////////////////////////////////////

  if (businessId && business.id !== businessId) {
    if (hideIfUnauthorized) {
      return <>{fallback}</>;
    }

    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Business Slug validation
  ////////////////////////////////////////////////////////////////////////////

  if (businessSlug && business.slug !== businessSlug) {
    if (hideIfUnauthorized) {
      return <>{fallback}</>;
    }

    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Category validation
  ////////////////////////////////////////////////////////////////////////////

  if (category) {
    const allowedCategories = Array.isArray(category) ? category : [category];

    const businessCategory = business.category?.key;

    if (!allowedCategories.includes(businessCategory)) {
      if (hideIfUnauthorized) {
        return <>{fallback}</>;
      }

      return <Navigate to={redirectTo} replace state={{ from: location }} />;
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  // Authorized
  ////////////////////////////////////////////////////////////////////////////

  return <>{children}</>;
};

export default BusinessGuard;
