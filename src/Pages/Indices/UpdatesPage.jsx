import React, { useState } from "react";
import { ArrowLeft, Star, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const UpdatesPage = () => {
  const [activeTab, setActiveTab] = useState("updates");
  const [activeTab2, setActiveTab2] = useState("News");
  // const [timeframe, setTimeframe] = useState('1D');

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

  const tabs2 = ["News", "Announcements", "Corp. Actions", "Feeds"];
  // const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', '2Y', '5Y', '10Y'];
  const tabContent = {
    News: [
      { date: "Feb 20, 2025", content: "Breaking news update!" },
      { date: "Feb 19, 2025", content: "Tech company releases new AI model." },
      { date: "Feb 18, 2025", content: "Stock market surges to new highs." },
      {
        date: "Fri, 14 Feb 2025",
        content:
          "India January WPI Inflation At 2.31% Vs 2.37 % (MoM), Food Inflation At 7.47% Vs 8.89% (MoM)",
      },
      {
        date: "Fri, 04 Oct 2024",
        content:
          "India's service sector growth slowed to a 10-month low in September with the PMI at 57.7, down from 60.9 in August.",
      },
      {
        date: "Thu, 03 Oct 2024",
        content:
          "SEBI announced stringent conditions for exchanges, brokers, and traders on trading in equity index derivatives contracts. The measures were largely in line with proposals made by SEBI in the Jul. 30 consultation paper.",
      },
      {
        date: "Tue, 17 Sept 2024",
        content: "India August WPI Inflation At 1.31% Vs 2.04% (MoM)",
      },
      {
        date: "Fri, 13 Sept 2024",
        content:
          "CPI inflation (rural and urban) fell to 3.65% in August 2024, compared to 6.83% in August 2023",
      },
      {
        date: "Fri, 13 Sept 2024",
        content: "India IIP grew 4.8% in July, compared to 4.2% in June",
      },
    ],
    Announcements: [],
    "Corp. Actions": [],
    Feeds: [],
  };

  return (
    <SidebarAndNavbar>
      <div className="bg-white w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button>
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
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

        <div className=" self-start p-4">
          <div className="flex justify-start justify-between mb-6">
            <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
              {tabs2.map((tab2) => (
                <button
                  key={tab2}
                  className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                    activeTab2 === tab2 ? "bg-white shadow-sm" : "bg-gray-100"
                  }`}
                  onClick={() => setActiveTab2(tab2)}
                >
                  {tab2}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {tabContent[activeTab2].length > 0 ? (
              tabContent[activeTab2].map((item, index) => (
                <div key={index} className="border-b py-3">
                  <p className="text-sm text-gray-500">📅 {item.date}</p>
                  <p className="text-black text-md mt-1">{item.content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-20">
                No {activeTab2} found
              </p>
            )}
          </div>
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default UpdatesPage;
