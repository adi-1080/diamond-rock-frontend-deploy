import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, TrendingDown, TrendingUp } from "lucide-react";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const GlobalIndicesOuter = () => {
  const [activeTab, setActiveTab] = useState("major");

  return (
    <SidebarAndNavbar defaultActiveMainMenu="globalMarket">
      <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-5 pb-2 bg-gray-100 rounded-t-xl">
        <div className="flex items-center py-3 mb-2">
          <Link
            to="/marketHome"
            className="pl-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Link>
          <h1 className="text-2xl ml-2">Global Indices</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        <nav className="border-b mb-6">
          <div className="flex gap-8">
            {["Major", "Gainers", "Losers"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category.toLowerCase())}
                className={`pb-4 px-1 relative ${
                  activeTab === category.toLowerCase()
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category}
                {activeTab === category.toLowerCase() && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>
      <div className="shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] h-auto p-6 pb-2 bg-white rounded-b-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Fri, 24 Jan 2025</span>
        </div>
        <div className="flex items-center justify-between mb-2"></div>
        <div className="overflow-y-auto bg-white rounded-lg px-0 py-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left  text-xs font-medium text-gray-500 uppercase">
                  Index Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  LTP
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Chg
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Chg%
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Last Update
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data[activeTab].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-right">
                    {item.ltp.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={
                        item.change > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {item.change > 0 ? "+" : ""}
                      {item.change.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end">
                      <span
                        className={
                          item.change > 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {item.change > 0 ? "+" : ""}
                        {item.changePercent.toFixed(2)}%
                      </span>
                      {item.change > 0 ? (
                        <TrendingUp size={16} className="ml-1 text-green-600" />
                      ) : (
                        <TrendingDown size={16} className="ml-1 text-red-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500">
                    04:14:59 pm
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

const data = {
  major: [
    { name: "S&P 500", ltp: 5082.55, change: -35.72, changePercent: -0.7 },
    { name: "Dow Jones", ltp: 39088.2, change: -180.65, changePercent: -0.5 },
    { name: "NASDAQ 100", ltp: 17892.35, change: -152.3, changePercent: -0.8 },
    { name: "FTSE 100", ltp: 7642.1, change: -42.5, changePercent: -0.55 },
    { name: "DAX", ltp: 17890.4, change: -85.3, changePercent: -0.47 },
    { name: "CAC 40", ltp: 7845.2, change: -67.4, changePercent: -0.85 },
    { name: "Nikkei 225", ltp: 39825.5, change: -210.2, changePercent: -0.52 },
    { name: "Hang Seng", ltp: 16542.3, change: -315.8, changePercent: -1.87 },
    {
      name: "Shanghai Composite",
      ltp: 3042.7,
      change: -18.5,
      changePercent: -0.6,
    },
  ],
  gainers: [
    { name: "Russell 2000", ltp: 2035.7, change: 14.5, changePercent: 0.72 },
    { name: "S&P/ASX 200", ltp: 7620.4, change: 32.1, changePercent: 0.42 },
    { name: "KOSPI", ltp: 2654.3, change: 12.8, changePercent: 0.48 },
    { name: "Straits Times", ltp: 3240.1, change: 9.7, changePercent: 0.3 },
  ],
  losers: [
    {
      name: "NASDAQ Composite",
      ltp: 15735.6,
      change: -123.8,
      changePercent: -0.78,
    },
    { name: "Euro Stoxx 50", ltp: 4952.3, change: -38.9, changePercent: -0.78 },
    { name: "Bovespa", ltp: 128945.2, change: -1150.5, changePercent: -0.89 },
    {
      name: "S&P BSE Sensex",
      ltp: 73025.4,
      change: -620.7,
      changePercent: -0.84,
    },
  ],
};

export default GlobalIndicesOuter;
