import React from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

const StockLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StockLayout;