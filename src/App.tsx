import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const MelaAppRoutes = lazy(() =>
  import('./apps/mela/MelaAppRoutes').then(({ MelaAppRoutes: melaRoutes }) => ({
    default: melaRoutes,
  })),
);

const App = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';

  if (hostname.includes('mela2026')) {
    return (
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              role="status"
              style={{
                display: 'grid',
                minHeight: '100vh',
                placeItems: 'center',
                background: '#f1f5f9',
                color: '#64748b',
              }}
            >
              Loading Mela GIS Portal…
            </div>
          }
        >
          <MelaAppRoutes />
        </Suspense>
      </BrowserRouter>
    );
  }

  return <AppRoutes />;
};

export default App;
