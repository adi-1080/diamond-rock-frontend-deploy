import { ArrowLeft, Share2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SMEAllStocks from "./SMEAllStocks";
import SMELocked from "./SMELocked";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const SMEZone = () => {
  const [activeTab, setActiveTab] = useState("All Stocks");

  return (
    <SidebarAndNavbar>
      <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-5 pb-2 bg-gray-100 rounded-t-xl">
        <div className="flex items-center py-3 mb-2">
          <Link
            to="/marketHome"
            className="pl-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Link>
          <h1 className="text-2xl ml-2">SME Zone</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        <nav className="border-b mb-6">
          <div className="flex gap-8">
            {[
              "All Stocks",
              "Gainers",
              "Losers",
              "Results",
              "Deliveries",
              "Technicals",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`pb-4 px-1 relative ${
                  activeTab === category
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category}
                {activeTab === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] h-auto p-6 pb-2 bg-white rounded-b-xl">
        {activeTab === "All Stocks" && <SMEAllStocks data={data} />}
        {activeTab !== "All Stocks" && <SMELocked tab={activeTab} />}
      </div>
    </SidebarAndNavbar>
  );
};

const data = {
  "1D": [
    {
      name: "Reliance Industries",
      marketCap: 1800000000,
      ltp: 2450.55,
      changePercent: 1.2,
    },
    {
      name: "Tata Consultancy Services",
      marketCap: 1500000000,
      ltp: 3685.3,
      changePercent: -0.8,
    },
    {
      name: "HDFC Bank",
      marketCap: 1200000000,
      ltp: 1525.2,
      changePercent: 0.5,
    },
    {
      name: "Infosys",
      marketCap: 1100000000,
      ltp: 1498.75,
      changePercent: -0.3,
    },
    {
      name: "ICICI Bank",
      marketCap: 1050000000,
      ltp: 920.4,
      changePercent: 1.0,
    },
    {
      name: "Hindustan Unilever",
      marketCap: 980000000,
      ltp: 2405.75,
      changePercent: -0.6,
    },
    {
      name: "Kotak Mahindra Bank",
      marketCap: 870000000,
      ltp: 1789.25,
      changePercent: 0.7,
    },
    {
      name: "State Bank of India",
      marketCap: 860000000,
      ltp: 562.9,
      changePercent: -0.4,
    },
    {
      name: "Bharti Airtel",
      marketCap: 800000000,
      ltp: 870.15,
      changePercent: 0.9,
    },
    {
      name: "Asian Paints",
      marketCap: 750000000,
      ltp: 3305.6,
      changePercent: 0.2,
    },
  ],
  "1W": [
    {
      name: "Reliance Industries",
      marketCap: 1800000000,
      ltp: 2450.55,
      changePercent: 2.5,
    },
    {
      name: "Tata Consultancy Services",
      marketCap: 1500000000,
      ltp: 3685.3,
      changePercent: -1.4,
    },
    {
      name: "HDFC Bank",
      marketCap: 1200000000,
      ltp: 1525.2,
      changePercent: 1.2,
    },
    {
      name: "Infosys",
      marketCap: 1100000000,
      ltp: 1498.75,
      changePercent: -0.7,
    },
    {
      name: "ICICI Bank",
      marketCap: 1050000000,
      ltp: 920.4,
      changePercent: 2.0,
    },
    {
      name: "Hindustan Unilever",
      marketCap: 980000000,
      ltp: 2405.75,
      changePercent: -1.1,
    },
    {
      name: "Kotak Mahindra Bank",
      marketCap: 870000000,
      ltp: 1789.25,
      changePercent: 0.9,
    },
    {
      name: "State Bank of India",
      marketCap: 860000000,
      ltp: 562.9,
      changePercent: -0.8,
    },
    {
      name: "Bharti Airtel",
      marketCap: 800000000,
      ltp: 870.15,
      changePercent: 1.5,
    },
    {
      name: "Asian Paints",
      marketCap: 750000000,
      ltp: 3305.6,
      changePercent: 0.6,
    },
  ],
  "1M": [
    {
      name: "Reliance Industries",
      marketCap: 1800000000,
      ltp: 2450.55,
      changePercent: 5.0,
    },
    {
      name: "Tata Consultancy Services",
      marketCap: 1500000000,
      ltp: 3685.3,
      changePercent: -2.3,
    },
    {
      name: "HDFC Bank",
      marketCap: 1200000000,
      ltp: 1525.2,
      changePercent: 3.8,
    },
    {
      name: "Infosys",
      marketCap: 1100000000,
      ltp: 1498.75,
      changePercent: -1.9,
    },
    {
      name: "ICICI Bank",
      marketCap: 1050000000,
      ltp: 920.4,
      changePercent: 4.5,
    },
    {
      name: "Hindustan Unilever",
      marketCap: 980000000,
      ltp: 2405.75,
      changePercent: -2.0,
    },
    {
      name: "Kotak Mahindra Bank",
      marketCap: 870000000,
      ltp: 1789.25,
      changePercent: 1.4,
    },
    {
      name: "State Bank of India",
      marketCap: 860000000,
      ltp: 562.9,
      changePercent: -1.5,
    },
    {
      name: "Bharti Airtel",
      marketCap: 800000000,
      ltp: 870.15,
      changePercent: 3.2,
    },
    {
      name: "Asian Paints",
      marketCap: 750000000,
      ltp: 3305.6,
      changePercent: 1.0,
    },
  ],
  "3M": [
    {
      name: "Reliance Industries",
      marketCap: 1800000000,
      ltp: 2450.55,
      changePercent: 1.2,
    },
    {
      name: "Tata Consultancy Services",
      marketCap: 1500000000,
      ltp: 3685.3,
      changePercent: -0.8,
    },
    {
      name: "HDFC Bank",
      marketCap: 1200000000,
      ltp: 1525.2,
      changePercent: 0.5,
    },
    {
      name: "Infosys",
      marketCap: 1100000000,
      ltp: 1498.75,
      changePercent: -0.3,
    },
    {
      name: "ICICI Bank",
      marketCap: 1050000000,
      ltp: 920.4,
      changePercent: 1.0,
    },
    {
      name: "Hindustan Unilever",
      marketCap: 980000000,
      ltp: 2405.75,
      changePercent: -0.6,
    },
    {
      name: "Kotak Mahindra Bank",
      marketCap: 870000000,
      ltp: 1789.25,
      changePercent: 0.7,
    },
    {
      name: "State Bank of India",
      marketCap: 860000000,
      ltp: 562.9,
      changePercent: -0.4,
    },
    {
      name: "Bharti Airtel",
      marketCap: 800000000,
      ltp: 870.15,
      changePercent: 0.9,
    },
    {
      name: "Asian Paints",
      marketCap: 750000000,
      ltp: 3305.6,
      changePercent: 0.2,
    },
  ],
  "6M": [
    {
      name: "Reliance Industries",
      marketCap: 1800000000,
      ltp: 2450.55,
      changePercent: 2.5,
    },
    {
      name: "Tata Consultancy Services",
      marketCap: 1500000000,
      ltp: 3685.3,
      changePercent: -1.4,
    },
    {
      name: "HDFC Bank",
      marketCap: 1200000000,
      ltp: 1525.2,
      changePercent: 1.2,
    },
    {
      name: "Infosys",
      marketCap: 1100000000,
      ltp: 1498.75,
      changePercent: -0.7,
    },
    {
      name: "ICICI Bank",
      marketCap: 1050000000,
      ltp: 920.4,
      changePercent: 2.0,
    },
    {
      name: "Hindustan Unilever",
      marketCap: 980000000,
      ltp: 2405.75,
      changePercent: -1.1,
    },
    {
      name: "Kotak Mahindra Bank",
      marketCap: 870000000,
      ltp: 1789.25,
      changePercent: 0.9,
    },
    {
      name: "State Bank of India",
      marketCap: 860000000,
      ltp: 562.9,
      changePercent: -0.8,
    },
    {
      name: "Bharti Airtel",
      marketCap: 800000000,
      ltp: 870.15,
      changePercent: 1.5,
    },
    {
      name: "Asian Paints",
      marketCap: 750000000,
      ltp: 3305.6,
      changePercent: 0.6,
    },
  ],
  "1Y": [
    {
      name: "Reliance Industries",
      marketCap: 1800000000,
      ltp: 2450.55,
      changePercent: 5.0,
    },
    {
      name: "Tata Consultancy Services",
      marketCap: 1500000000,
      ltp: 3685.3,
      changePercent: -2.3,
    },
    {
      name: "HDFC Bank",
      marketCap: 1200000000,
      ltp: 1525.2,
      changePercent: 3.8,
    },
    {
      name: "Infosys",
      marketCap: 1100000000,
      ltp: 1498.75,
      changePercent: -1.9,
    },
    {
      name: "ICICI Bank",
      marketCap: 1050000000,
      ltp: 920.4,
      changePercent: 4.5,
    },
    {
      name: "Hindustan Unilever",
      marketCap: 980000000,
      ltp: 2405.75,
      changePercent: -2.0,
    },
    {
      name: "Kotak Mahindra Bank",
      marketCap: 870000000,
      ltp: 1789.25,
      changePercent: 1.4,
    },
    {
      name: "State Bank of India",
      marketCap: 860000000,
      ltp: 562.9,
      changePercent: -1.5,
    },
    {
      name: "Bharti Airtel",
      marketCap: 800000000,
      ltp: 870.15,
      changePercent: 3.2,
    },
    {
      name: "Asian Paints",
      marketCap: 750000000,
      ltp: 3305.6,
      changePercent: 1.0,
    },
  ],
  "2Y": [
    {
      name: "Reliance Industries",
      marketCap: 1800000000,
      ltp: 2450.55,
      changePercent: 1.2,
    },
    {
      name: "Tata Consultancy Services",
      marketCap: 1500000000,
      ltp: 3685.3,
      changePercent: -0.8,
    },
    {
      name: "HDFC Bank",
      marketCap: 1200000000,
      ltp: 1525.2,
      changePercent: 0.5,
    },
    {
      name: "Infosys",
      marketCap: 1100000000,
      ltp: 1498.75,
      changePercent: -0.3,
    },
    {
      name: "ICICI Bank",
      marketCap: 1050000000,
      ltp: 920.4,
      changePercent: 1.0,
    },
    {
      name: "Hindustan Unilever",
      marketCap: 980000000,
      ltp: 2405.75,
      changePercent: -0.6,
    },
    {
      name: "Kotak Mahindra Bank",
      marketCap: 870000000,
      ltp: 1789.25,
      changePercent: 0.7,
    },
    {
      name: "State Bank of India",
      marketCap: 860000000,
      ltp: 562.9,
      changePercent: -0.4,
    },
    {
      name: "Bharti Airtel",
      marketCap: 800000000,
      ltp: 870.15,
      changePercent: 0.9,
    },
    {
      name: "Asian Paints",
      marketCap: 750000000,
      ltp: 3305.6,
      changePercent: 0.2,
    },
  ],
  "5Y": [
    {
      name: "Reliance Industries",
      marketCap: 1800000000,
      ltp: 2450.55,
      changePercent: 2.5,
    },
    {
      name: "Tata Consultancy Services",
      marketCap: 1500000000,
      ltp: 3685.3,
      changePercent: -1.4,
    },
    {
      name: "HDFC Bank",
      marketCap: 1200000000,
      ltp: 1525.2,
      changePercent: 1.2,
    },
    {
      name: "Infosys",
      marketCap: 1100000000,
      ltp: 1498.75,
      changePercent: -0.7,
    },
    {
      name: "ICICI Bank",
      marketCap: 1050000000,
      ltp: 920.4,
      changePercent: 2.0,
    },
    {
      name: "Hindustan Unilever",
      marketCap: 980000000,
      ltp: 2405.75,
      changePercent: -1.1,
    },
    {
      name: "Kotak Mahindra Bank",
      marketCap: 870000000,
      ltp: 1789.25,
      changePercent: 0.9,
    },
    {
      name: "State Bank of India",
      marketCap: 860000000,
      ltp: 562.9,
      changePercent: -0.8,
    },
    {
      name: "Bharti Airtel",
      marketCap: 800000000,
      ltp: 870.15,
      changePercent: 1.5,
    },
    {
      name: "Asian Paints",
      marketCap: 750000000,
      ltp: 3305.6,
      changePercent: 0.6,
    },
  ],
};

export default SMEZone;
