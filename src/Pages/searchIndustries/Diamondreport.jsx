import React from "react";
import { FiCopy, FiFileText } from "react-icons/fi";
import { RiFileTextLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";
import StockHeader from "../../components/StockHeader";

const earningsData = [
  {
    date: "16 Jan 2025",
    quarter: "Q3 FY25",
    id: 1,
  },
  {
    date: "14 Oct 2024",
    quarter: "Q2 FY25",
    id: 2,
  },
  {
    date: "19 Jul 2024",
    quarter: "Q1 FY25",
    id: 3,
  },
  {
    date: "22 Apr 2024",
    quarter: "Q4 FY24",
    id: 4,
  },
  {
    date: "19 Jan 2024",
    quarter: "Q3 FY24",
    id: 5,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 6,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 7,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 8,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 9,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 10,
  },
  {
    date: "27 Oct 2023",
    quarter: "Q2 FY24",
    id: 11,
  },
];
const Diamondreport = () => {
  const { ticker } = useParams();

  return (
    <SidebarAndNavbar>
      <div className="min-h-screen bg-gray-50">
        <StockHeader ticker={ticker} defaultActiveTab={"diamond-report"} />

        {/* Main Section */}
        <div className="max-w-full mx-auto">
          <div className="space-y">
            {earningsData.map((item, index) => (
              <div key={item.id}>
                <div className="flex bg-white gap-3 items-center px-5 py-3 hover:bg-gray-100 transition-colors">
                  <div className="h-10 w-10 bg-[#E41B93] flex items-center justify-center">
                    <RiFileTextLine className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] text-gray-600 mb-0.5">
                      {item.date}
                    </div>
                    <div className="text-[15px] text-gray-900 font-medium mb-0.5">
                      Reliance Industries Limited - Earnings Call {item.quarter}
                    </div>
                    <div className="text-[13px] text-gray-500">
                      Concall Analysis
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-gray-200 rounded transition-colors">
                      <FiCopy className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-gray-200 rounded transition-colors">
                      <FiFileText className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {index !== earningsData.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default Diamondreport;
