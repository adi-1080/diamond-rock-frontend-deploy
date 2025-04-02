// src/components/ui/Tabs.jsx
import React from 'react';

const Tabs = ({ children, className }) => {
  return <div className={`w-full ${className}`}>{children}</div>;
};

const TabsList = ({ children, className }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

const TabsTrigger = ({ children, onClick, isActive, className }) => {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive ? 'bg-green-500 text-white' : 'bg-white text-gray-700'
      } hover:bg-green-300 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Tabs, TabsList, TabsTrigger };
