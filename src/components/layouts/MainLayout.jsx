import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/bg5.jpg)' }}
    >
      {/* Optional overlay for contrast */}
      <div className="bg-white/30 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;

