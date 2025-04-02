import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const deliveryData = [
  { date: '21 Feb', delivered: 62.3, traded: 100000 },
  { date: '20 Feb', delivered: 69.7, traded: 120000 },
  { date: '19 Feb', delivered: 55.1, traded: 90000 },
  { date: '18 Feb', delivered: 54.6, traded: 85000 },
  { date: '17 Feb', delivered: 54.3, traded: 95000 },
];

const Deliveries = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Delivery Analysis</h2>
      <div className="bg-white rounded-lg shadow p-4">
        <LineChart width={800} height={400} data={deliveryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="delivered" stroke="#8884d8" name="Delivery %" />
          <Line type="monotone" dataKey="traded" stroke="#82ca9d" name="Traded Quantity" />
        </LineChart>
      </div>
    </div>
  );
};

export default Deliveries;