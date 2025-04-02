import React, { useState } from "react";
import { Calendar } from "lucide-react";

export default function Upcoming() {
  const subTabs1 = ["Corp. Actions", "Events"];
  const subTabs2 = ["All", "Bonus", "Dividends", "Rights", "Split/Conso"];
  const [subTab1, setSubTab1] = useState("Corp. Actions");
  const [subTab2, setSubTab2] = useState("All");

  return (
    <div className="px-4 py-3">
      {/* Sub Tabs */}
      <div className="flex justify-start justify-between mb-6">
        <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
          {subTabs1.map((tab1) => (
            <button
              key={tab1}
              className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                subTab1 === tab1 ? "bg-white shadow-sm" : "bg-gray-100"
              }`}
              onClick={() => setSubTab1(tab1)}
            >
              {tab1}
            </button>
          ))}
        </div>
        <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
          {subTabs2.map((tab2) => (
            <button
              key={tab2}
              className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                subTab2 === tab2 ? "bg-white shadow-sm" : "bg-gray-100"
              }`}
              onClick={() => setSubTab2(tab2)}
            >
              {tab2}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        {upcomingActions.map((action, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-[0px_0px_4px_rgba(0,0,0,0.2)] hover:shadow-[0px_0px_12px_rgba(0,0,0,0.2)] transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {action.symbol}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{action.company}</h3>
                <p className="text-sm text-gray-500">{action.details}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {action.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const upcomingActions = [
  {
    company: "Accelya Solutions India Ltd.",
    symbol: "ACCELYA",
    details: "Interim Dividend 500% @ Rs. 50 per share",
    date: "30 Jan 2025",
  },
  {
    company: "Balkrishna Industries Ltd.",
    symbol: "BKT",
    details: "Interim Dividend 200% @ Rs. 4 per share",
    date: "30 Jan 2025",
  },
  {
    company: "Coforge Ltd.",
    symbol: "COFORGE",
    details: "Interim Dividend 190% @ Rs. 19 per share",
    date: "30 Jan 2025",
  },
  {
    company: "Housing & Urban Development Corporation Ltd.",
    symbol: "HUDCO",
    details: "Interim Dividend 20.5% @ Rs. 2.05 per share",
    date: "30 Jan 2025",
  },
];
