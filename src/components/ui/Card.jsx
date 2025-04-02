// src/components/ui/card.jsx
import React from "react";


export const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`border-b pb-2 mb-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);






















