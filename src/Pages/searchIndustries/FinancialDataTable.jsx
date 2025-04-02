import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FinancialDataTable = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [showChart, setShowChart] = useState(null);
  const [highlightedBar, setHighlightedBar] = useState(null);
  const [expandedDropdowns, setExpandedDropdowns] = useState({});
  
  const toggleRow = (rowId) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  const toggleDropdown = (rowId) => {
    setExpandedDropdowns(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  const toggleChart = (rowId) => {
    setShowChart(showChart === rowId ? null : rowId);
  };

  // Format value strings to numbers for chart
  const formatValue = (valueStr) => {
    return parseInt(valueStr.replace(/,/g, ''));
  };

  // Complete data based on the provided information
  const data = [
    {
      id: 1,
      particular: "Shh. Funds",
      values: [
        { year: "2016-03", value: "2,31,556" },
        { year: "2017-03", value: "2,63,709" },
        { year: "2018-03", value: "2,93,506" },
        { year: "2019-03", value: "3,87,112" },
        { year: "2020-03", value: "4,49,166" },
        { year: "2021-03", value: "7,00,172" },
        { year: "2022-03", value: "7,79,485" },
        { year: "2023-03", value: "7,15,872" },
        { year: "2024-03", value: "7,93,481" },
        { year: "2024-09*", value: "8,19,453" },
      ],
      children: [
        {
          id: 'share-capital',
          particular: "Share Capital",
          values: [
            { year: "2016-03", value: "2,948" },
            { year: "2017-03", value: "2,959" },
            { year: "2018-03", value: "5,922" },
            { year: "2019-03", value: "5,926" },
            { year: "2020-03", value: "6,339" },
            { year: "2021-03", value: "6,445" },
            { year: "2022-03", value: "6,765" },
            { year: "2023-03", value: "6,766" },
            { year: "2024-03", value: "6,766" },
            { year: "2024-09*", value: "6,766" },
          ]
        },
        {
          id: 'sh-warrants',
          particular: "Sh. Warrants",
          values: [
            { year: "2016-03", value: "26" },
            { year: "2017-03", value: "20" },
            { year: "2018-03", value: "27" },
            { year: "2019-03", value: "9" },
            { year: "2020-03", value: "19" },
            { year: "2021-03", value: "40,580" },
            { year: "2022-03", value: "434" },
            { year: "2023-03", value: "646" },
            { year: "2024-03", value: "780" },
            { year: "2024-09*", value: "-" },
          ]
        },
        {
          id: 'reserve',
          particular: "Reserve",
          values: [
            { year: "2016-03", value: "2,28,582" },
            { year: "2017-03", value: "2,60,730" },
            { year: "2018-03", value: "2,87,557" },
            { year: "2019-03", value: "3,81,177" },
            { year: "2020-03", value: "4,42,808" },
            { year: "2021-03", value: "6,53,147" },
            { year: "2022-03", value: "7,72,286" },
            { year: "2023-03", value: "7,08,460" },
            { year: "2024-03", value: "7,85,935" },
            { year: "2024-09*", value: "8,12,687" },
          ]
        }
      ]
    },
    {
      id: 2,
      particular: "Non Curr. Liab.",
      values: [
        { year: "2016-03", value: "1,78,931" },
        { year: "2017-03", value: "2,04,861" },
        { year: "2018-03", value: "2,00,376" },
        { year: "2019-03", value: "2,84,916" },
        { year: "2020-03", value: "2,88,752" },
        { year: "2021-03", value: "2,43,065" },
        { year: "2022-03", value: "3,00,976" },
        { year: "2023-03", value: "3,81,258" },
        { year: "2024-03", value: "4,31,893" },
        { year: "2024-09*", value: "4,17,385" },
      ],
      children: []
    },
    {
      id: 3,
      particular: "Curr. Liab.",
      values: [
        { year: "2016-03", value: "1,85,154" },
        { year: "2017-03", value: "2,35,315" },
        { year: "2018-03", value: "3,13,852" },
        { year: "2019-03", value: "3,14,023" },
        { year: "2020-03", value: "4,12,916" },
        { year: "2021-03", value: "2,77,568" },
        { year: "2022-03", value: "3,08,662" },
        { year: "2023-03", value: "3,95,743" },
        { year: "2024-03", value: "3,97,367" },
        { year: "2024-09*", value: "4,42,760" },
      ],
      children: []
    },
    {
      id: 4,
      particular: "Minority Int.",
      values: [
        { year: "2016-03", value: "3,356" },
        { year: "2017-03", value: "2,917" },
        { year: "2018-03", value: "3,539" },
        { year: "2019-03", value: "8,280" },
        { year: "2020-03", value: "12,181" },
        { year: "2021-03", value: "99,260" },
        { year: "2022-03", value: "1,09,499" },
        { year: "2023-03", value: "1,13,009" },
        { year: "2024-03", value: "1,32,307" },
        { year: "2024-09*", value: "1,34,871" },
      ],
      children: []
    },
    {
      id: 5,
      particular: "Equity & Liab.",
      values: [
        { year: "2016-03", value: "5,98,997" },
        { year: "2017-03", value: "7,06,802" },
        { year: "2018-03", value: "8,11,273" },
        { year: "2019-03", value: "9,97,630" },
        { year: "2020-03", value: "11,63,015" },
        { year: "2021-03", value: "13,20,065" },
        { year: "2022-03", value: "14,98,622" },
        { year: "2023-03", value: "16,05,882" },
        { year: "2024-03", value: "17,55,048" },
        { year: "2024-09*", value: "18,14,469" },
      ],
      children: []
    },
    {
      id: 6,
      particular: "Non Curr. Assets",
      values: [
        { year: "2016-03", value: "4,71,212" },
        { year: "2017-03", value: "5,59,989" },
        { year: "2018-03", value: "6,27,487" },
        { year: "2019-03", value: "7,65,577" },
        { year: "2020-03", value: "9,04,755" },
        { year: "2021-03", value: "9,47,054" },
        { year: "2022-03", value: "11,51,603" },
        { year: "2023-03", value: "11,80,586" },
        { year: "2024-03", value: "12,84,948" },
        { year: "2024-09*", value: "13,36,057" },
      ],
      children: []
    },
    {
      id: 7,
      particular: "Curr. Assets",
      values: [
        { year: "2016-03", value: "1,27,785" },
        { year: "2017-03", value: "1,46,813" },
        { year: "2018-03", value: "1,83,786" },
        { year: "2019-03", value: "2,27,386" },
        { year: "2020-03", value: "2,58,260" },
        { year: "2021-03", value: "3,73,011" },
        { year: "2022-03", value: "3,47,019" },
        { year: "2023-03", value: "4,25,296" },
        { year: "2024-03", value: "4,70,100" },
        { year: "2024-09*", value: "4,78,412" },
      ],
      children: []
    }
  ];

  // Prepare chart data for the detailed bar chart
  const getChartData = (rowId) => {
    const row = data.find(d => d.id === rowId);
    if (!row) return [];
    
    return row.values.map(item => ({
      name: item.year,
      value: formatValue(item.value)
    }));
  };

  // Format the y-axis labels
  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  return (
    <div className="w-full max-w-full overflow-auto text-sm"> {/* Global 14px */}
      <div className="sticky top-0 bg-white z-10">
        <div className="min-w-max grid grid-cols-12 border-b py-4">
          <div className="col-span-2 px-4 font-semibold sticky left-0 bg-white z-10">Particulars</div>
          <div className="col-span-1 text-center font-semibold">10 years</div>
          <div className="col-span-9 grid grid-cols-10">
            {data[0].values.map((yearData, index) => (
              <div key={index} className="text-center font-normal">
                <div className={index === 3 ? "text-blue-600" : ""}>
                  {yearData.year}
                </div>
                <div className="text-[11px]">Rs. Cr.</div> {/* Slightly smaller */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-max">
        {data.map((row) => (
          <React.Fragment key={row.id}>
            <div className="border-b hover:bg-gray-50">
              <div className="grid grid-cols-12 py-3">
                <div className="col-span-2 px-4 flex items-center sticky left-0 bg-white z-10">
                  <span className="font-normal">{row.particular}</span>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <button 
                    onClick={() => toggleChart(row.id)}
                    className="h-4 w-16 flex items-center cursor-pointer"
                  >
                    {row.values.map((_, idx) => (
                      <div 
                        key={idx} 
                        className="w-1 mx-px bg-blue-400" 
                        style={{ 
                          height: `${(formatValue(row.values[idx].value) / formatValue(row.values[9].value)) * 16}px`,
                          opacity: highlightedBar === idx ? 1 : (idx < 3 ? 0.3 : (idx < 6 ? 0.6 : 1)),
                          backgroundColor: highlightedBar === idx ? '#2563EB' : '#60A5FA'
                        }}
                        onMouseEnter={() => setHighlightedBar(idx)}
                        onMouseLeave={() => setHighlightedBar(null)}
                      ></div>
                    ))}
                  </button>
                </div>
                <div className="col-span-9 grid grid-cols-10">
                  {row.values.map((yearData, index) => (
                    <div 
                      key={index} 
                      className={`text-center ${index === 3 ? "text-blue-600" : ""}`}
                    >
                      {yearData.value}
                    </div>
                  ))}
                </div>
              </div>
              
              {showChart === row.id && (
                <div className="px-4 py-6 border-t border-gray-200">
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getChartData(row.id)}
                        margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={formatYAxis} />
                        <Tooltip formatter={(value) => value.toLocaleString()} />
                        <Bar 
                          dataKey="value" 
                          fill="#72A0C1"
                          onMouseOver={(data, index) => setHighlightedBar(index)}
                          onMouseOut={() => setHighlightedBar(null)}
                        >
                          {getChartData(row.id).map((entry, index) => (
                            <rect 
                              key={`bar-${index}`} 
                              fill={highlightedBar === index ? '#2563EB' : '#60A5FA'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center mt-2 font-semibold text-[13px]"> {/* Slightly smaller */}
                    {row.particular} - 10 Year Trend (Rs. Cr.)
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown items */}
            {expandedDropdowns[row.id] && row.children && row.children.map((child) => (
              <div key={child.id} className="border-b bg-gray-50">
                <div className="grid grid-cols-12 py-3">
                  <div className="col-span-2 px-4 pl-12 flex items-center sticky left-0 bg-gray-50 z-10">
                    <span>{child.particular}</span>
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <button 
                      className="h-4 w-16 flex items-center cursor-pointer"
                    >
                      {child.values.map((_, idx) => {
                        const value = child.values[idx].value === "-" ? 0 : formatValue(child.values[idx].value);
                        const maxValue = child.values.reduce((max, item) => {
                          const itemValue = item.value === "-" ? 0 : formatValue(item.value);
                          return Math.max(max, itemValue);
                        }, 0);
                        
                        return (
                          <div 
                            key={idx} 
                            className="w-1 mx-px bg-blue-400" 
                            style={{ 
                              height: maxValue > 0 ? `${(value / maxValue) * 16}px` : "0px",
                              opacity: 0.7,
                            }}
                          ></div>
                        );
                      })}
                    </button>
                  </div>
                  <div className="col-span-9 grid grid-cols-10">
                    {child.values.map((yearData, index) => (
                      <div 
                        key={index} 
                        className={`text-center ${index === 3 ? "text-blue-600" : ""}`}
                      >
                        {yearData.value}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FinancialDataTable;