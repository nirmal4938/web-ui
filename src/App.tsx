import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { MelaAppRoutes } from './apps/mela/MelaAppRoutes';

const App = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname.toLowerCase() : '';

  if (hostname.includes('mela2026')) {
    return (
      <BrowserRouter>
        <MelaAppRoutes />
      </BrowserRouter>
    );
  }

  return <AppRoutes />;
};

export default App;
