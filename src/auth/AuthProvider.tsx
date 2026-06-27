// ===================================================================================
// src/auth/AuthProvider.tsx
// Enterprise Authentication Provider
// SyncWare SaaS v2
// ===================================================================================

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

interface Props {
  children: React.ReactNode;
}

const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/home-page',
  '/',
  '/auth/success',
];

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { bootstrap, initialized, isAuthenticated, loading } = useAuth();

  const [bootstrapping, setBootstrapping] = useState(true);

  ////////////////////////////////////////////////////////////////////////////
  // Bootstrap authentication once
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        await bootstrap();
      } finally {
        if (mounted) {
          setBootstrapping(false);
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  ////////////////////////////////////////////////////////////////////////////
  // Redirect unauthenticated users
  ////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (bootstrapping || loading || !initialized) {
      return;
    }

    const currentPath = location.pathname;

    const isPublic = PUBLIC_ROUTES.some(route => currentPath.startsWith(route));

    if (!isAuthenticated && !isPublic) {
      navigate('/login', {
        replace: true,
        state: {
          from: location,
        },
      });
    }
  }, [bootstrapping, loading, initialized, isAuthenticated, location, navigate]);

  ////////////////////////////////////////////////////////////////////////////
  // Loading Screen
  ////////////////////////////////////////////////////////////////////////////

  if (bootstrapping || loading || !initialized) {
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
            border: '4px solid #ddd',
            borderTop: '4px solid #0d6efd',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />

        <p
          style={{
            fontSize: 15,
            color: '#666',
          }}
        >
          Initializing Session...
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
  // Ready
  ////////////////////////////////////////////////////////////////////////////

  return <>{children}</>;
};

export default AuthProvider;
