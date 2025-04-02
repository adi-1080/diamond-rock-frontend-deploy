import React, { useState } from "react";
import { ArrowLeft, Star, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const StocksPage = () => {
  const [activeTab, setActiveTab] = useState("stocks");
  const [selectedTab, setSelectedTab] = useState("All");
  //   const currentDate = format(new Date(), "EEE, dd MMM yyyy");
  const sections = ["All", "Gainers", "Losers"];

  const stockData = {
    All: [
      {
        name: "Reliance Industries Ltd.",
        marketCap: "16,35,523",
        closePrice: "1,204.00",
        priceChange: -10.55,
        percentage: "▼0.9%",
        logo: null,
      },
      {
        name: "Tata Consultancy Services Ltd.",
        marketCap: "13,14,198",
        closePrice: "3,629.55",
        priceChange: -46.05,
        percentage: "▼1.3%",
        logo: null,
      },
      {
        name: "HDFC Bank Ltd.",
        marketCap: "12,85,928",
        closePrice: "1,682.35",
        priceChange: 5.25,
        percentage: "▲0.3%",
        logo: null,
      },
      {
        name: "Bharti Airtel Ltd.",
        marketCap: "10,02,284",
        closePrice: "1,641.40",
        priceChange: 40.1,
        percentage: "▲2.5%",
        logo: null,
      },
      {
        name: "ICICI Bank Ltd.",
        marketCap: "8,65,140",
        closePrice: "1,224.15",
        priceChange: 5.8,
        percentage: "▲0.5%",
        logo: null,
      },
      {
        name: "Infosys Ltd.",
        marketCap: "7,33,207",
        closePrice: "1,767.70",
        priceChange: 3.6,
        percentage: "▲0.2%",
        logo: null,
      },
      {
        name: "State Bank Of India",
        marketCap: "6,35,790",
        closePrice: "710.90",
        priceChange: -5.5,
        percentage: "▼0.8%",
        logo: null,
      },
      {
        name: "Hindustan Unilever Ltd.",
        marketCap: "5,30,867",
        closePrice: "2,259.30",
        priceChange: 17.85,
        percentage: "▲0.8%",
        logo: null,
      },
      {
        name: "Bajaj Finance Ltd.",
        marketCap: "5,29,009",
        closePrice: "8,488.80",
        priceChange: 133.85,
        percentage: "▲1.6%",
        logo: null,
      },
      {
        name: "ITC Ltd.",
        marketCap: "5,06,943",
        closePrice: "404.85",
        priceChange: 2.95,
        percentage: "▲0.7%",
        logo: null,
      },
      {
        name: "HCL Technologies Ltd.",
        marketCap: "4,44,105",
        closePrice: "1,636.10",
        priceChange: -7.95,
        percentage: "▼0.5%",
        logo: null,
      },
      {
        name: "Larsen & Toubro Ltd.",
        marketCap: "4,43,872",
        closePrice: "3,225.90",
        priceChange: -31.8,
        percentage: "▼1.0%",
        logo: null,
      },
    ],

    Gainers: [
      {
        name: "Bajaj Finance Ltd.",
        marketCap: "5,29,009",
        closePrice: "8,488.80",
        priceChange: 133.85,
        percentage: "▲1.6%",
        logo: null,
      },
      {
        name: "Bharti Airtel Ltd.",
        marketCap: "10,02,284",
        closePrice: "1,641.40",
        priceChange: 40.1,
        percentage: "▲2.5%",
        logo: null,
      },
      {
        name: "Hindustan Unilever Ltd.",
        marketCap: "5,30,867",
        closePrice: "2,259.30",
        priceChange: 17.85,
        percentage: "▲0.8%",
        logo: null,
      },
      {
        name: "ICICI Bank Ltd.",
        marketCap: "8,65,140",
        closePrice: "1,224.15",
        priceChange: 5.8,
        percentage: "▲0.5%",
        logo: null,
      },
      {
        name: "HDFC Bank Ltd.",
        marketCap: "12,85,928",
        closePrice: "1,682.35",
        priceChange: 5.25,
        percentage: "▲0.3%",
        logo: null,
      },
      {
        name: "Infosys Ltd.",
        marketCap: "7,33,207",
        closePrice: "1,767.70",
        priceChange: 3.6,
        percentage: "▲0.2%",
        logo: null,
      },
      {
        name: "ITC Ltd.",
        marketCap: "5,06,943",
        closePrice: "404.85",
        priceChange: 2.95,
        percentage: "▲0.7%",
        logo: null,
      },
      {
        name: "Bajaj Finance Ltd.",
        marketCap: "5,29,009",
        closePrice: "8,488.80",
        priceChange: 133.85,
        percentage: "▲1.6%",
        logo: null,
      },
      {
        name: "Bharti Airtel Ltd.",
        marketCap: "10,02,284",
        closePrice: "1,641.40",
        priceChange: 40.1,
        percentage: "▲2.5%",
        logo: null,
      },
      {
        name: "Hindustan Unilever Ltd.",
        marketCap: "5,30,867",
        closePrice: "2,259.30",
        priceChange: 17.85,
        percentage: "▲0.8%",
        logo: null,
      },
      {
        name: "ICICI Bank Ltd.",
        marketCap: "8,65,140",
        closePrice: "1,224.15",
        priceChange: 5.8,
        percentage: "▲0.5%",
        logo: null,
      },
      {
        name: "HDFC Bank Ltd.",
        marketCap: "12,85,928",
        closePrice: "1,682.35",
        priceChange: 5.25,
        percentage: "▲0.3%",
        logo: null,
      },
    ],

    Losers: [
      {
        name: "Tata Consultancy Services Ltd.",
        marketCap: "13,14,198",
        closePrice: "3,629.55",
        priceChange: -46.05,
        percentage: "▼1.3%",
        logo: null,
      },
      {
        name: "Larsen & Toubro Ltd.",
        marketCap: "4,43,872",
        closePrice: "3,225.90",
        priceChange: -31.8,
        percentage: "▼1.0%",
        logo: null,
      },
      {
        name: "Reliance Industries Ltd.",
        marketCap: "16,35,523",
        closePrice: "1,204.00",
        priceChange: -10.55,
        percentage: "▼0.9%",
        logo: null,
      },
      {
        name: "HCL Technologies Ltd.",
        marketCap: "4,44,105",
        closePrice: "1,636.10",
        priceChange: -7.95,
        percentage: "▼0.5%",
        logo: null,
      },
      {
        name: "State Bank Of India",
        marketCap: "6,35,790",
        closePrice: "710.90",
        priceChange: -5.5,
        percentage: "▼0.8%",
        logo: null,
      },
      {
        name: "Tata Consultancy Services Ltd.",
        marketCap: "13,14,198",
        closePrice: "3,629.55",
        priceChange: -46.05,
        percentage: "▼1.3%",
        logo: null,
      },
      {
        name: "Larsen & Toubro Ltd.",
        marketCap: "4,43,872",
        closePrice: "3,225.90",
        priceChange: -31.8,
        percentage: "▼1.0%",
        logo: null,
      },
      {
        name: "Reliance Industries Ltd.",
        marketCap: "16,35,523",
        closePrice: "1,204.00",
        priceChange: -10.55,
        percentage: "▼0.9%",
        logo: null,
      },
      {
        name: "HCL Technologies Ltd.",
        marketCap: "4,44,105",
        closePrice: "1,636.10",
        priceChange: -7.95,
        percentage: "▼0.5%",
        logo: null,
      },
      {
        name: "State Bank Of India",
        marketCap: "6,35,790",
        closePrice: "710.90",
        priceChange: -5.5,
        percentage: "▼0.8%",
        logo: null,
      },
      {
        name: "Tata Consultancy Services Ltd.",
        marketCap: "13,14,198",
        closePrice: "3,629.55",
        priceChange: -46.05,
        percentage: "▼1.3%",
        logo: null,
      },
      {
        name: "Larsen & Toubro Ltd.",
        marketCap: "4,43,872",
        closePrice: "3,225.90",
        priceChange: -31.8,
        percentage: "▼1.0%",
        logo: null,
      },
    ],
  };
  const currentDate = "Tue, 25 Feb 2025";
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

        <div className="p-1 bg-white w-[100%] flex justify-between">
          <div className="pt-6 text-sm text-gray-600">{currentDate}</div>
          <div className="flex justify-start mt-5">
            <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
              {sections.map((section) => (
                <button
                  key={section}
                  className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                    selectedTab === section
                      ? "bg-white shadow-sm"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(section)}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <StockTable stocks={stockData[selectedTab]} />
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default StocksPage;

const StockTable = ({ stocks }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="mt-5 w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Company Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Market Cap (Rs. Cr)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Close Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price Change
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.map((stock, index) => (
            <tr key={index} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-6 py-4 flex items-center whitespace-nowrap border-t last:border-b-0">
                <img
                  src={stock.logo || "/default-logo.png"}
                  onError={(e) => (e.target.style.display = "none")}
                  alt=""
                  className="w-6 h-6 sm:w-8 sm:h-8 mr-4"
                />
                <span className="leading-none">{stock.name}</span>
              </td>
              <td className="px-6 py-4 text-left border-t last:border-b-0">
                {stock.marketCap}
              </td>
              <td className="px-6 py-4 text-left border-t last:border-b-0">
                {stock.closePrice}
              </td>
              <td
                className={`px-6 py-4 text-left border-t last:border-b-0 font-normal whitespace-nowrap ${
                  stock.priceChange >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {stock.priceChange >= 0
                  ? `+${stock.priceChange}`
                  : stock.priceChange}
              </td>
              <td
                className={`px-6 py-4 text-left border-t last:border-b-0 font-normal whitespace-nowrap ${
                  stock.percentage.includes("▲")
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {stock.percentage.includes("▲")
                  ? `▲ ${stock.percentage.replace("▲", "")}`
                  : `▼ ${stock.percentage.replace("▼", "")}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
