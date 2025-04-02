import { TrendingDown, TrendingUp } from "lucide-react";
import React, { useState } from "react";

const SMEAllStocks = ({ data }) => {
  const [activeSubTab, setActiveSubTab] = useState("1D");
  const subTabs = ["1D", "1W", "1M", "3M", "6M", "1Y", "2Y", "5Y"];
  const heads = [
    { name: "Stock Name", align: "left" },
    { name: "Market Cap (Lakh Rs.)", align: "right" },
    { name: "LTP", align: "right" },
    { name: "Change %", align: "right" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Fri, 24 Jan 2025</span>
        <div className="ml-auto flex bg-gray-100 rounded-lg">
          {subTabs.map((tab) => (
            <button
              className={`px-2 m-1 py-1 text-sm rounded ${
                tab === activeSubTab ? "bg-white shadow-sm" : "bg-gray-100"
              }`}
              onClick={() => setActiveSubTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto bg-white rounded-lg px-0 py-0">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {heads.map((head) => (
                <th
                  className={`px-6 py-3 text-${head.align} text-xs font-medium text-gray-500 uppercase`}
                >
                  {head.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data[activeSubTab].map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{item.name}</td>
                <td className="px-6 py-4 font-medium text-right">
                  {item.marketCap / 100000}
                </td>
                <td className="px-6 py-4 font-medium text-right">{item.ltp}</td>
                <td
                  className={`px-6 py-4 font-medium text-right ${
                    item.changePercent > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <div className="flex items-center justify-end">
                    {item.changePercent}
                    {item.changePercent > 0 ? (
                      <TrendingUp size={16} className="ml-1 text-green-600" />
                    ) : (
                      <TrendingDown size={16} className="ml-1 text-red-600" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SMEAllStocks;
