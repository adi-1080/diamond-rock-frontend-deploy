import React from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Bulk from "./Bulk";
import Block from "./Block";
import Insider from "./Insider";
import SAST from "./SAST";
import { ArrowLeft } from "lucide-react";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

export default function Deals() {

  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "bulk";

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
          <h1 className="text-2xl ml-2">Deals</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b mb-6">
          <div className="flex space-x-8">
            <TabLink
              to="/deals"
              label="Bulk"
              active={currentPath === "deals" || currentPath === "bulk"}
            />
            <TabLink
              to="/deals/block"
              label="Block"
              active={currentPath === "block"}
            />
            <TabLink
              to="/deals/insider"
              label="Insider"
              active={currentPath === "insider"}
            />
            <TabLink
              to="/deals/sast"
              label="SAST"
              active={currentPath === "sast"}
            />
          </div>
        </div>
      </div>

      <div className="shadow-lg h-auto p-6 pb-2 bg-white rounded-b-xl">
        <div className="overflow-y-auto bg-white rounded-lg p-0">
          {/* Content Area */}
          <Routes>
            <Route index element={<Bulk />} />
            <Route path="block" element={<Block />} />
            <Route path="insider" element={<Insider />} />
            <Route path="sast" element={<SAST />} />
          </Routes>
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
