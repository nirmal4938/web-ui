// ===================================================================================
// src/pages/Unauthorized/Unauthorized.tsx
// Enterprise Unauthorized Page
// SyncWare SaaS v2
// ===================================================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8fafc',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          background: '#fff',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,.08)',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            marginBottom: '16px',
          }}
        >
          🚫
        </div>

        <h1
          style={{
            marginBottom: '12px',
            fontSize: '32px',
          }}
        >
          Access Denied
        </h1>

        <p
          style={{
            color: '#666',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}
        >
          You don't have permission to access this resource.
          <br />
          Please contact your administrator if you believe this is incorrect.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '10px 18px',
              cursor: 'pointer',
            }}
          >
            ← Go Back
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '10px 18px',
              cursor: 'pointer',
            }}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 18px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
