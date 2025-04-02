import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";
import { Info, Star, Share2, ArrowLeft } from "lucide-react";

const TechnicalsPage = () => {
  const [activeTab, setActiveTab] = useState("technicals");
  const [activeSubTab, setActiveSubTab] = useState("levels");
  const [activeIndicator, setActiveIndicator] = useState("PD");
  let navigate = useNavigate();

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

  const subTabs = ["Performance", "Levels", "Indicators"];

  const levelIndicators = [
    "PD",
    "W",
    "M",
    "52W",
    "AT",
    "SMA",
    "WSMA",
    "EMA",
    "WEMA",
    "PIVOT",
    "BB",
    "PSAR",
    "WPSAR",
    "SUPR",
    "WSUPR",
    "ICHK",
  ];
  const performanceData = [
    { period: "1 Day", value: -0.39, barWidth: 1 },
    { period: "1 Week", value: 0.9, barWidth: 2 },
    { period: "1 Month", value: -3.58, barWidth: 3 },
    { period: "3 Month", value: 0.42, barWidth: 2 },
    { period: "6 Month", value: -18.05, barWidth: 15 },
    { period: "1 Year", value: -16.32, barWidth: 14 },
    { period: "2 Year", value: 0.91, barWidth: 2 },
    { period: "5 Year", value: 66.87, barWidth: 25 },
    { period: "10 Year", value: 468.01, barWidth: 100 },
  ];

  return (
    <SidebarAndNavbar>
      <div className="w-full bg-white">
        <div className="bg-white border-b">
          {/* Header Section */}
          <div className="bg-white ">
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

            {/* Tabs Section */}
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
        </div>

        {/* subTabs Section */}
        <div className="flex justify-center items-center py-3 border-b">
          <div className="options inline-flex bg-gray-100 rounded-lg px-1">
            {subTabs.map((subTab) => (
              <button
                key={subTab}
                onClick={() => setActiveSubTab(subTab.toLowerCase())}
                className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                  activeSubTab.toLowerCase() === subTab.toLowerCase()
                    ? "bg-white shadow-sm"
                    : "bg-gray-100"
                }`}
              >
                {subTab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Based on Active subTab */}
        {activeSubTab === "performance" && (
          <div className="px-6 py-4">
            {performanceData.map((item, index) => (
              <div
                key={item.period}
                className={`flex items-center py-2 hover:bg-gray-50 ${
                  index !== performanceData.length - 1 ? "border-b" : null
                }`}
              >
                <div className="w-24 flex items-center gap-2">
                  <span className="text-blue-500">+</span>
                  <span>{item.period}</span>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1 h-6 flex items-center">
                    {item.value !== 0 && (
                      <div
                        className={`h-1 ${
                          item.value >= 0
                            ? "bg-green-500 ml-auto"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(Math.abs(item.barWidth), 100)}%`,
                          marginLeft: item.value >= 0 ? "auto" : "0",
                        }}
                      />
                    )}
                  </div>
                  <div className="w-20 text-right">
                    <span
                      className={`${
                        item.value >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.value >= 0 ? "+" : ""}
                      {item.value}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === "levels" && (
          <div className="px-4 py-2">
            <div className="flex justify-between items-center gap-2 mb-4 overflow-x-auto p-2">
              <label className="flex items-center gap-2 min-w-fit">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                <span className="text-gray-700">Price Level</span>
              </label>

              <div className="options inline-flex bg-gray-100 rounded-lg px-1">
                {levelIndicators.map((indicator) => (
                  <button
                    key={indicator}
                    onClick={() => setActiveIndicator(indicator)}
                    className={`flex justify-center items-center cursor-pointer text-xs px-3 py-1 my-1 rounded ${
                      activeIndicator === indicator
                        ? "bg-white shadow-sm"
                        : "bg-gray-100"
                    }`}
                  >
                    {indicator}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-0 bg-white">
              <div className="flex justify-between py-3 px-2">
                <span>Day High</span>
                <span>1,240.00</span>
              </div>
              <div className="flex justify-between py-3 px-2 bg-gray-50">
                <span>Prev Day Close</span>
                <span>1,233.00</span>
              </div>
              <div className="flex justify-between py-3 px-2 bg-pink-50">
                <span>Day Open</span>
                <span>1,228.70</span>
              </div>
              <div className="flex justify-between py-3 px-2 bg-red-50">
                <div className="flex justify-between w-full">
                  <span>LTP</span>
                  <div className="flex items-center gap-4">
                    <span>1,228.15</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-3 px-2">
                <span>Day Low</span>
                <span>1,222.15</span>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === "indicators" && (
          <div className="p-6">
            <div className="text-sm text-gray-500 mb-4">Fri, 21 Feb 2025</div>

            <div className="space-y-4">
              {[
                {
                  name: "Relative Strength Index (Daily)",
                  value: 44.04,
                  zone: "Neutral",
                },
                {
                  name: "Relative Strength Index (Weekly)",
                  value: 39.33,
                  zone: "Neutral",
                },
                {
                  name: "Commodity Channel Index",
                  value: -46.55,
                  zone: "Neutral",
                },
                { name: "Money Flow Index", value: 46.96, zone: "Neutral" },
                { name: "Rate Of Change", value: -3.92, zone: "Negative" },
                { name: "Stochastic %K", value: 37.24, zone: "Neutral" },
                { name: "William %R", value: -64.18, zone: "Neutral" },
              ].map((indicator) => (
                <div
                  key={indicator.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {indicator.name}
                    <Info size={16} className="text-gray-400" />
                  </div>
                  <div className="flex items-center gap-6">
                    <span>{indicator.value}</span>
                    <span
                      className={
                        indicator.zone === "Neutral"
                          ? "text-yellow-500"
                          : indicator.zone === "Negative"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {indicator.zone}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SidebarAndNavbar>
  );
};

export default TechnicalsPage;
