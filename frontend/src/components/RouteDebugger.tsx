import React from 'react';
import { useLocation } from 'react-router-dom';

const RouteDebugger: React.FC = () => {
  const location = useLocation();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>Current Route: <span className="text-yellow-400">{location.pathname}</span></div>
      <div>Search: <span className="text-blue-400">{location.search || 'none'}</span></div>
      <div>Hash: <span className="text-green-400">{location.hash || 'none'}</span></div>
    </div>
  );
};

export default RouteDebugger;