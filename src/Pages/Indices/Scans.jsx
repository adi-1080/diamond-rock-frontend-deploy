import React, { useState } from "react";
import { ArrowLeft, Star, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const Scans = () => {
  const [activeTab, setActiveTab] = useState("scans");
  const [selectedTab, setSelectedTab] = useState("Technical");
  const [subTab, setSubTab] = useState("All Scans");
  const [expandedIndex, setExpandedIndex] = useState(null);

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

  const CallSymbol = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="3" y="14" fontSize="10" fill="blue" fontWeight="bold">
        C
      </text>
      <line x1="8" y1="5" x2="8" y2="12" stroke="green" strokeWidth="1.5" />
      <rect x="10" y="5" width="3" height="7" fill="#D3D3D3" />
    </svg>
  );

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

        <div className="self-start">
          <div className="flex justify-start justify-between m-4 mb-2">
            <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
              {["Technical", "Fundamental"].map((tab2) => (
                <button
                  key={tab2}
                  className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                    selectedTab === tab2 ? "bg-white shadow-sm" : "bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(tab2)}
                >
                  {tab2}
                </button>
              ))}
            </div>
          </div>

          {selectedTab === "Technical" && (
            <>
              <div className="rounded p-2 flex flex-col">
                {/* Sticky Header (Filters + Date) */}
                <div className="p-2 border-t flex justify-between">
                  <div className="text-gray-600 text-sm flex items-center">
                    📅 Thu, 20 Feb 2025
                  </div>
                  <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
                    {["All Scans", "NSE", "BSE"].map((tab2) => (
                      <button
                        key={tab2}
                        className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                          subTab === tab2 ? "bg-white shadow-sm" : "bg-gray-100"
                        }`}
                        onClick={() => setSubTab(tab2)}
                      >
                        {tab2}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto space-y-2">
                  <ul className="space-y-2">
                    {scanData.map((item, index) => (
                      <li key={index} className="p-2 bg-white flex flex-col">
                        <button
                          onClick={() =>
                            setExpandedIndex(
                              expandedIndex === index ? null : index
                            )
                          }
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <CallSymbol />
                              <span className="font-bold">{item.title}</span>
                            </div>
                            <span className="text-blue-500 cursor-pointer px-2 border border-2 rounded-full border-blue-500">
                              ℹ
                            </span>
                          </div>
                        </button>
                        {expandedIndex === index && (
                          <div className="mt-2 bg-gray-100 p-2 text-sm overflow-y-auto max-h-60">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="border-b">
                                  <th className="p-2 text-left">Stock Name</th>
                                  <th className="p-2 text-left">
                                    Open Interest
                                  </th>
                                  <th className="p-2 text-left">
                                    Strike Price
                                  </th>
                                  <th className="p-2 text-left">
                                    Traded Contracts
                                  </th>
                                  <th className="p-2 text-left">Expiry</th>
                                  <th className="p-2 text-left">Close</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="p-2 font-semibold">
                                    {item.stockName}
                                  </td>
                                  <td className="p-2">{item.openInterest}</td>
                                  <td className="p-2">{item.strikePrice}</td>
                                  <td className="p-2">
                                    {item.tradedContracts}
                                  </td>
                                  <td className="p-2 text-gray-500">
                                    {item.expiry}
                                  </td>
                                  <td className="p-2">{item.close}</td>
                                </tr>
                                <tr>
                                  <td className="p-2 text-gray-500">NIFTY</td>
                                  <td colSpan="6" className="text-green-600">
                                    {item.change} ▲ {item.percentage}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {selectedTab === "Fundamental" && (
            <div className="flex-1 flex items-center justify-center p-4 text-center text-gray-500 min-h-[calc(100vh-150px)]">
              No Scans Found
            </div>
          )}
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default Scans;

const scanData = [
  {
    title: "Banking Stocks Surge in Open Interest",
    stockName: "Bank Nifty",
    openInterest: "4,20,500",
    strikePrice: "45,000.00",
    tradedContracts: "12,340",
    expiry: "27 Feb 2025",
    close: "2.05",
    change: "+3,80,450",
    percentage: "950.3%",
  },
  {
    title: "IT Sector Sees Strong Call Buying",
    stockName: "TCS",
    openInterest: "3,89,100",
    strikePrice: "3,500.00",
    tradedContracts: "9,780",
    expiry: "28 Mar 2025",
    close: "1.75",
    change: "+3,00,600",
    percentage: "860.7%",
  },
  {
    title: "Metal Stocks Witness High Call Interest",
    stockName: "Tata Steel",
    openInterest: "2,78,200",
    strikePrice: "140.00",
    tradedContracts: "8,245",
    expiry: "20 Apr 2025",
    close: "0.95",
    change: "+2,30,150",
    percentage: "720.5%",
  },
  {
    title: "Auto Stocks Show Increased Call Activity",
    stockName: "Maruti Suzuki",
    openInterest: "1,98,450",
    strikePrice: "10,500.00",
    tradedContracts: "5,890",
    expiry: "13 Mar 2025",
    close: "1.25",
    change: "+1,50,375",
    percentage: "580.2%",
  },
  {
    title: "Pharma Stocks Gain Open Interest",
    stockName: "Sun Pharma",
    openInterest: "3,50,600",
    strikePrice: "1,250.00",
    tradedContracts: "7,630",
    expiry: "10 May 2025",
    close: "1.85",
    change: "+2,80,450",
    percentage: "830.6%",
  },
  {
    title: "FMCG Stocks See Sudden Call Buying",
    stockName: "HUL",
    openInterest: "2,45,750",
    strikePrice: "2,500.00",
    tradedContracts: "6,430",
    expiry: "5 Jun 2025",
    close: "1.35",
    change: "+2,10,350",
    percentage: "690.3%",
  },
  {
    title: "Energy Sector Call Interest Rises",
    stockName: "Reliance",
    openInterest: "5,10,000",
    strikePrice: "2,900.00",
    tradedContracts: "14,200",
    expiry: "15 Jul 2025",
    close: "2.15",
    change: "+4,70,000",
    percentage: "920.8%",
  },
  {
    title: "Telecom Stocks See High Activity",
    stockName: "Bharti Airtel",
    openInterest: "3,78,600",
    strikePrice: "980.00",
    tradedContracts: "9,120",
    expiry: "30 Aug 2025",
    close: "1.55",
    change: "+3,30,400",
    percentage: "870.1%",
  },
  {
    title: "Infra Stocks Show Increasing Call Activity",
    stockName: "L&T",
    openInterest: "2,90,450",
    strikePrice: "3,000.00",
    tradedContracts: "7,210",
    expiry: "25 Sep 2025",
    close: "1.40",
    change: "+2,60,000",
    percentage: "800.4%",
  },
  {
    title: "Retail Stocks Show Call Buying Interest",
    stockName: "DMart",
    openInterest: "1,75,300",
    strikePrice: "4,200.00",
    tradedContracts: "4,860",
    expiry: "12 Oct 2025",
    close: "1.20",
    change: "+1,40,000",
    percentage: "600.8%",
  },
  {
    title: "Finance Sector Sees Bullish Call Options",
    stockName: "Bajaj Finance",
    openInterest: "3,60,700",
    strikePrice: "7,000.00",
    tradedContracts: "10,320",
    expiry: "18 Nov 2025",
    close: "2.00",
    change: "+3,10,500",
    percentage: "860.2%",
  },
  {
    title: "PSU Stocks Gain Momentum in Call Buying",
    stockName: "SBI",
    openInterest: "4,50,900",
    strikePrice: "750.00",
    tradedContracts: "11,540",
    expiry: "22 Dec 2025",
    close: "2.25",
    change: "+4,00,000",
    percentage: "890.9%",
  },
  {
    title: "Midcap Stocks Show Increased Call Volume",
    stockName: "Motherson",
    openInterest: "2,30,800",
    strikePrice: "220.00",
    tradedContracts: "5,940",
    expiry: "8 Jan 2026",
    close: "1.10",
    change: "+1,95,000",
    percentage: "710.5%",
  },
  {
    title: "Chemical Stocks See Growing Call Positions",
    stockName: "UPL",
    openInterest: "1,95,600",
    strikePrice: "650.00",
    tradedContracts: "4,750",
    expiry: "5 Feb 2026",
    close: "1.05",
    change: "+1,70,000",
    percentage: "680.3%",
  },
  {
    title: "Real Estate Stocks See High Call Open Interest",
    stockName: "DLF",
    openInterest: "3,20,400",
    strikePrice: "540.00",
    tradedContracts: "8,620",
    expiry: "28 Feb 2026",
    close: "1.60",
    change: "+2,80,900",
    percentage: "870.7%",
  },
];
