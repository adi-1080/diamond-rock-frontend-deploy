import React, { useState } from "react";
import { ArrowLeft, Star, Share2, Info } from "lucide-react";
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
import AreaHistogramChart from "../../components/charts/AreaHistogramChart";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const PricesPage = () => {
  const [activeTab, setActiveTab] = useState("prices");
  const [timeframe, setTimeframe] = useState("1D");
  const [chartLow, setChartLow] = useState(0);
  const [chartHigh, setChartHigh] = useState(0);

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

  let navigate = useNavigate();

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"];

  const chartData = Array.from({ length: 100 }, (_, i) => ({
    time: i,
    price: 1278 + Math.sin(i / 10) * 5 + Math.random() * 2,
  }));

  return (
    <SidebarAndNavbar>
      <div className="bg-white w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-start">
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
            </div>

            <div className="h-64">
              {/* <ResponsiveContainer width="100%" height="100%">
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
              </ResponsiveContainer> */}
              <AreaHistogramChart
                period={timeframe}
                setChartLow={setChartLow}
                setChartHigh={setChartHigh}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <div>
                {timeframe} Low: {chartLow}
              </div>
              <div>
                {timeframe} High: {chartHigh}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-medium">Overview</h2>
                <button className="text-blue-600 text-sm">View More</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Sector</div>
                    <a href="#" className="text-sm text-blue-600">
                      Crude Oil
                    </a>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Market Cap</div>
                    <div className="text-sm">17,29,505 Cr</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Enterprise Value (EV)
                    </div>
                    <div className="text-sm">20,65,842 Cr</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Price-Earning Ratio (PE)
                    </div>
                    <div className="text-sm">25.00</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Dividend Yield</div>
                    <div className="text-sm">0.39</div>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Industry</div>
                    <a href="#" className="text-sm text-blue-600">
                      Refineries
                    </a>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="text-sm">Large Cap</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Book Value / Share
                    </div>
                    <div className="text-sm">626.66</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">PEG Ratio</div>
                    <div className="text-sm">2.09</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-medium">Performance</h2>
                <button className="text-blue-600 text-sm">View More</button>
              </div>
              <div className="space-y-3">
                {[
                  { period: "1 Day", value: -0.5 },
                  { period: "1 Week", value: 3.5 },
                  { period: "1 Month", value: 2.2 },
                  { period: "6 Month", value: 11.7 },
                  { period: "1 Year", value: 11.2 },
                  { period: "2 Year", value: 9.8 },
                  { period: "5 Year", value: 78.2 },
                  { period: "10 Year", value: 458.8 },
                ].map((item, index) => (
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

          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-base font-medium mb-2">About Company</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Reliance Industries Limited (RIL) is an Indian multinational
              conglomerate company, headquartered in Mumbai. RIL's diverse
              businesses include energy, petrochemicals, natural gas, retail,
              telecommunications, mass media, and textiles. Reliance is one of
              the most profitable companies in India, the largest publicly
              traded company in India by market capitalisation, and the largest
              company in India as measured by revenue. It is also the tenth
              largest employer in India with over 236,000 employees.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg text-center">
            <a
              href="#"
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

export default PricesPage;
