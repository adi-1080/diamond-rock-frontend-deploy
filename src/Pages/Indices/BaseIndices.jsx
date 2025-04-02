import React, { useState } from "react";
import {
  ArrowLeft,
  Star,
  Share2,
  Info,
  Search,
  ChevronUp,
  Layout,
} from "lucide-react";
import { useState } from "react";
import { Bar } from "recharts";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const BaseIndices = () => {
  const [activeTab, setActiveTab] = useState("prices");

  const tabs = [
    { id: "prices", label: "Prices", url: "/indices/prices" },
    { id: "stocks", label: "Stocks", url: "/indices/stocks" },
    { id: "index breadth", label: "Index Breadth", url: "/indices/index-breadth", },
    { id: "deliveries", label: "Deliveries", url: "/indices/delivery" },
    { id: "updates", label: "Updates", url: "/indices/updates" },
    { id: "technicals", label: "Technicals", url: "/indices/technicals" },
    { id: "futures oi", label: "Futures OI", url: "/indices/futures-oi" },
    { id: "scans", label: "Scans", url: "/indices/scans" },
  ];

  const chartData = Array.from({ length: 100 }, (_, i) => ({
    time: i,
    price: 1278 + Math.sin(i / 10) * 5 + Math.random() * 2,
  }));

  return (
    <SidebarAndNavbar>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-medium">
                    Reliance Industries Ltd.
                  </h1>
                  <span className="text-gray-500 text-sm">NSE: RELIANCE</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">1,278.20</span>
                  <span className="text-red-500 ml-2">-7.00 (-0.5%)</span>
                  <span className="text-gray-500 ml-2">
                    05 Feb 2025, 03:49 PM IST
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-gray-400" />
              <Share2 className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex space-x-6 px-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default BaseIndices;

const data = {
  "1 Day": [
    { name: "Nifty Financial Services", value: -0.75 },
    { name: "Nifty 50", value: -0.14 },
  ],
  "1 Week": [
    { name: "Nifty Financial Services", value: 0.03 },
    { name: "Nifty 50", value: -0.57 },
  ],
  "1 Month": [
    { name: "Nifty Financial Services", value: 1.54 },
    { name: "Nifty 50", value: -1.9 },
  ],
};

function PerformanceTab() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="p-4 w-full max-w-lg mx-auto bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Performance</h2>
      {Object.keys(data).map((timeframe) => (
        <div key={timeframe} className="border-b py-2">
          <button
            className="w-full text-left font-semibold flex justify-between"
            onClick={() =>
              setExpanded(expanded === timeframe ? null : timeframe)
            }
          >
            {expanded === timeframe ? "-" : "+"} {timeframe}
          </button>
          {expanded === timeframe && (
            <div className="mt-2 space-y-2">
              {data[timeframe].map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center"
                >
                  <span>{item.name}</span>
                  <div className="relative w-32 h-4 bg-gray-200 rounded">
                    <div
                      className={`absolute top-0 h-full rounded ${
                        item.value >= 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.abs(item.value) * 10}%` }}
                    ></div>
                  </div>
                  <span
                    className={
                      item.value >= 0 ? "text-green-500" : "text-red-500"
                    }
                  >
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
