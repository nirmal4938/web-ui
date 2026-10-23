import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import GisPlotAllotment from './pages/GisPlotAllotment';

export const MelaAppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GisPlotAllotment />} />
      <Route path="/allotments" element={<GisPlotAllotment />} />
      <Route
        path="*"
        element={
          <div className="p-6 text-center text-red-400">404 - Mela Resource Not Found</div>
        }
      />
    </Routes>
  );
};
