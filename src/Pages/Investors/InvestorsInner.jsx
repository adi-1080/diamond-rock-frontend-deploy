import { ArrowLeft, Share2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

const InvestorsInner = () => {
  const [activeSubTab, setActiveSubTab] = useState("Deals");
  const subTabs = ["Deals", "Shareholding"];
  const { investorName } = useParams(); // Get investor name from URL

  return (
    <SidebarAndNavbar>
      <div className="shadow-[0px_0px_15px_rgba(0,0,0,0.05),0px_-10px_25px_rgba(0,0,0,0.05)] h-auto p-5 pb-2 bg-gray-100 rounded-t-xl">
        <div className="flex items-center py-3 mb-2">
          <Link to="/investors" className="pl-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Link>
          <h1 className="text-2xl ml-2">{investorName}</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full ml-auto">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="shadow-[0px_15px_15px_rgba(0,0,0,0.1),0px_-10px_25px_rgba(0,0,0,0)] h-auto p-6 pb-2 bg-white rounded-b-xl">
        <div className="flex justify-center">
          <div className="inline-flex justify-center items-center bg-gray-100 rounded-lg px-1 mb-5">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                  activeSubTab === tab ? "bg-white shadow-sm" : "bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-10">
          <h1 className="font-bold text-xl pb-4">{`Gain insights into this Investor's ${activeSubTab}`}</h1>
          <button className="bg-blue-700 text-white px-5 py-3 hover:bg-blue-600 rounded-md text-xl">
            Subscribe
          </button>
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default InvestorsInner;
