// ===================================================================================
// src/auth/ProtectedRoute.tsx
// Enterprise Protected Route
// SyncWare SaaS v2
// ===================================================================================

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;

  redirectTo?: string;

  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
  requireAuth = true,
}) => {
  const location = useLocation();

  const { loading, initialized, isAuthenticated } = useAuth();

  ////////////////////////////////////////////////////////////////////////////
  // Wait for bootstrap
  ////////////////////////////////////////////////////////////////////////////

  if (!initialized || loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            border: '4px solid #e5e5e5',
            borderTop: '4px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin .8s linear infinite',
          }}
        />

        <p
          style={{
            color: '#666',
            fontSize: 15,
          }}
        >
          Verifying Session...
        </p>

        <style>
          {`
            @keyframes spin{
              from{transform:rotate(0deg);}
              to{transform:rotate(360deg);}
            }
          `}
        </style>
      </div>
    );
  }

  ////////////////////////////////////////////////////////////////////////////
  // Not Logged In
  ////////////////////////////////////////////////////////////////////////////

  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  ////////////////////////////////////////////////////////////////////////////
  // Logged In
  ////////////////////////////////////////////////////////////////////////////

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
