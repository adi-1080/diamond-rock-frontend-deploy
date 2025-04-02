import React, { useState } from "react";
import { ArrowLeft, Star, Share2, Info, Maximize2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const GlobalStocksPrices = () => {
  const [activeTab, setActiveTab] = useState("prices");
  const [timeframe, setTimeframe] = useState("1D");

  const tabs = [
    { id: "prices", label: "Prices", url: "/global-stock/prices" },
    {
      id: "fundamentals",
      label: "Fundamentals",
      url: "/global-stock/fundamentals",
    },
    { id: "financials", label: "Financials", url: "/global-stock/financials" },
  ];
  const data = {
    name: "Apple Inc.",
    ticker: "AAPL",
    sector: "Technology",
    industry: "Consumer Electronics",
    marketCap: "28,57,000 Cr",
    enterpriseValue: "29,20,000 Cr",
    peRatio: 30.2,
    dividendYield: 0.55,
    category: "Large Cap",
    bookValuePerShare: 5.84,
    pegRatio: 2.45,
    performance: [
      { period: "1 Day", value: -10.2 },
      { period: "1 Week", value: 2.1 },
      { period: "1 Month", value: 5.4 },
      { period: "6 Month", value: 15.8 },
      { period: "1 Year", value: 22.3 },
      { period: "2 Year", value: 35.5 },
      { period: "5 Year", value: 290.1 },
      { period: "10 Year", value: 812.6 },
    ],
    about:
      "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. It designs, manufactures, and sells consumer electronics, software, and services. The company is best known for its iPhone, iPad, Mac computers, and ecosystem of digital services including the App Store and Apple Music.",
  };

  let navigate = useNavigate();

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"];

  const chartData = Array.from({ length: 100 }, (_, i) => ({
    time: i,
    price: 1278 + Math.sin(i / 10) * 5 + Math.random() * 2,
  }));

  return (
    <SidebarAndNavbar defaultActiveMainMenu="globalMarket">
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-medium">{data.name}</h1>
                  <span className="text-gray-500 text-sm">{data.ticker}</span>
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
                onClick={() => {
                  setActiveTab(tab.id);
                  navigate(tab.url);
                }}
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

        <div className="p-4 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]">
            <div className="flex justify-between items-center">
              <div className="options inline-flex justify-center items-center bg-gray-100 rounded-lg px-1 mb-5">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                      timeframe === tf ? "bg-white shadow-sm" : "bg-gray-100"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="hover:bg-gray-200 p-2 rounded-xl cursor-pointer">
                <a href={`/innerChart/${data.ticker}`}>
                  <Maximize2 className="w-5 h-5 text-gray-700" size={20} />
                </a>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#ef4444"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <div>1D Low: ₹1,276.70</div>
              <div>1D High: ₹1,290.50</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-medium">Overview</h2>
                <button className="text-blue-600 text-sm">View More</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Sector</div>
                    <a href="#" className="text-sm text-blue-600">
                      {data.sector}
                    </a>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Market Cap</div>
                    <div className="text-sm">{data.marketCap}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Enterprise Value (EV)
                    </div>
                    <div className="text-sm">{data.enterpriseValue}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Price-Earning Ratio (PE)
                    </div>
                    <div className="text-sm">{data.peRatio}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Dividend Yield</div>
                    <div className="text-sm">{data.dividendYield}</div>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Industry</div>
                    <a href="#" className="text-sm text-blue-600">
                      {data.industry}
                    </a>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="text-sm">{data.category}</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Book Value / Share
                    </div>
                    <div className="text-sm">{data.bookValuePerShare}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">PEG Ratio</div>
                    <div className="text-sm">{data.pegRatio}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-medium">Performance</h2>
                <button className="text-blue-600 text-sm">View More</button>
              </div>
              <div className="space-y-3">
                {data.performance.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 text-sm text-gray-500">
                      {item.period}
                    </div>
                    <div className="flex-grow relative h-2 bg-gray-100 rounded">
                      <div
                        className={`absolute h-full rounded ${
                          item.value >= 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(Math.abs(item.value) / 5, 100)}%`,
                          left: item.value < 0 ? "auto" : "0",
                          right:
                            item.value < 0
                              ? "0\
                        "
                              : "auto",
                        }}
                      />
                    </div>
                    <div
                      className={`w-16 text-right text-sm ${
                        item.value >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.value > 0 ? "▲" : "▼"} {Math.abs(item.value)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]">
            <h2 className="text-base font-medium mb-2">About Company</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.about}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)] text-center">
            <a
              href={`/innerChart/${data.ticker}`}
              className="text-blue-600 text-sm flex items-center justify-center"
            >
              <Info className="w-4 h-4 mr-1" />
              Interactive Advanced Chart
            </a>
          </div>
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default GlobalStocksPrices;
