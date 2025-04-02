import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: '1M', USA: 4.3, UK: 4.5, Germany: 2.1, France: 2.5, Italy: 2.6 },
  { name: '2Y', USA: 4.2, UK: 4.1, Germany: 2.0, France: 2.3, Italy: 2.3 },
  { name: '4Y', USA: 4.3, UK: 4.0, Germany: 2.0, France: 2.5, Italy: 2.4 },
  { name: '6Y', USA: 4.3, UK: 4.1, Germany: 2.1, France: 2.7, Italy: 3.0 },
  { name: '8Y', USA: 4.4, UK: 4.3, Germany: 2.2, France: 2.9, Italy: 3.3 },
  { name: '10Y', USA: 4.5, UK: 4.4, Germany: 2.3, France: 3.1, Italy: 3.5 },
  { name: '12Y', USA: 4.6, UK: 4.6, Germany: 2.4, France: 3.3, Italy: 3.8 },
  { name: '15Y', USA: 4.7, UK: 4.8, Germany: 2.6, France: 3.4, Italy: 4.0 },
  { name: '20Y', USA: 4.8, UK: 5.0, Germany: 2.6, France: 3.5, Italy: 4.0 },
  { name: '25Y', USA: 4.7, UK: 5.1, Germany: 2.6, France: 3.6, Italy: 4.0 },
  { name: '30Y', USA: 4.7, UK: 5.2, Germany: 2.6, France: 3.7, Italy: 4.1 }
];

const TenorScaleChart = () => {
  return (
    <div className="w-full h-96 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(value) => `${value.toFixed(3)}%`}
            domain={[2, 5.5]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value) => `${value.toFixed(3)}%`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="USA"
            stroke="#4169E1"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="UK"
            stroke="#FFA500"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Germany"
            stroke="#20B2AA"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="France"
            stroke="#FFD700"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Italy"
            stroke="#800080"
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TenorScaleChart;