import React from 'react';
import { Routes, Route } from 'react-router-dom';

export const MelaAppRoutes: React.FC = () => {
  return (
    <div className="mela-theme bg-slate-900 min-h-screen text-white">
      {/* Isolated Mela Navbar */}
      <header className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider text-amber-400">🎡 MELA 2026 GIS Portal</h1>
        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
          Live Sync Enabled
        </span>
      </header>

      <Routes>
        <Route
          path="/"
          element={<div className="p-6 text-center">Mela GIS portal is ready for setup.</div>}
        />
        <Route
          path="/allotments"
          element={<div className="p-6">Plot Allotment Status Matrix</div>}
        />
        <Route
          path="*"
          element={
            <div className="p-6 text-center text-red-400">404 - Mela Resource Not Found</div>
          }
        />
      </Routes>
    </div>
  );
};
