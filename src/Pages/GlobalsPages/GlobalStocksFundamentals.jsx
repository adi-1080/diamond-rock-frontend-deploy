import React, { useState } from "react";
import { ArrowLeft, Star, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const GlobalStocksFundamentals = () => {
  const [activeTab, setActiveTab] = useState("fundamentals");

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
  };

  let navigate = useNavigate();

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

        <div className="p-4 space-y-4">Enter data here</div>
      </div>
    </SidebarAndNavbar>
  );
};

export default GlobalStocksFundamentals;
