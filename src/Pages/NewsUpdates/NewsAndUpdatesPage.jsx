// NewsUpdates.js
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Updates from "./Updates";
import Upcoming from "./Upcoming";
import FIIDII from "./FIIDII";
import FuturesOI from "./FuturesOI";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

export default function NewsUpdates() {
  let [activeSubTab, setActiveSubTab] = useState("Updates");
  let subTabs = ["Updates", "Upcoming", "FII/DII", "Futures OI"];

  return (
    <SidebarAndNavbar >
      <div className="min-h-screen">
        <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-4 pb-2 bg-gray-100 rounded-t-xl pb-7">
          <div className="sticky top-0 z-50 bg-gray-100 ">
            <div className="flex items-center py-3">
              <Link
                to="/marketHome"
                className="pl-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 text-blue-600" />
              </Link>
              <h1 className="text-2xl ml-2">News and Updates</h1>
              <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            <div className="flex  border-b-2">
              {subTabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 text-m whitespace-nowrap border-b-2 ${
                    activeSubTab === tab
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-600 border-gray-100"
                  }`}
                  onClick={() => setActiveSubTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 bg-white shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] rounded-b-xl h-fit">
          {activeSubTab === "Updates" && <Updates />}
          {activeSubTab === "Upcoming" && <Upcoming />}
          {activeSubTab === "FII/DII" && <FIIDII />}
          {activeSubTab === "Futures OI" && <FuturesOI />}
        </div>
      </div>
    </SidebarAndNavbar>
  );
}

function TabLink({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`pb-4 px-1 relative ${
        active ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
      )}
    </Link>
  );
}
