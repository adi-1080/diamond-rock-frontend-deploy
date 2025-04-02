import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Code, BarChart2, Maximize } from 'lucide-react';

const GDPChart = () => {
  const data = [
    { year: '2013', gdp: 17 },
    { year: '2014', gdp: 18 },
    { year: '2015', gdp: 19 },
    { year: '2016', gdp: 20 },
    { year: '2017', gdp: 21 },
    { year: '2018', gdp: 22 },
    { year: '2019', gdp: 23 },
    { year: '2020', gdp: 23 },
    { year: '2021', gdp: 24 },
    { year: '2022', gdp: 26 },
    { year: '2023', gdp: 27.72 }
  ];

  return (
    <div className="w-full h-[50vh] flex flex-col p-4 mt-8 ">
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 20, right: 50, bottom: 50, left: 20 }}
          >
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666' }}
              dy={10}
            />
            <YAxis 
              domain={[16, 28]}
              ticks={[16, 18, 20, 22, 24, 26]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666' }}
              tickFormatter={(value) => `${value}T`}
              orientation="right"
            />
            <Line
              type="monotone"
              dataKey="gdp"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex space-x-2">
          <button className="px-4 py-1 rounded-md bg-gray-100 text-sm hover:bg-gray-200">5Y</button>
          <button className="px-4 py-1 rounded-md bg-gray-100 text-sm hover:bg-gray-200">10Y</button>
          <button className="px-4 py-1 rounded-md bg-gray-100 text-sm hover:bg-gray-200">All</button>
        </div>
        
        <div className="flex space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Code className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <BarChart2 className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GDPChart;