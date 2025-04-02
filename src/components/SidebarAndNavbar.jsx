import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

const SidebarAndNavbar = ({ children, defaultActiveMainMenu="market", defaultIsSidebarExpanded=true }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(defaultIsSidebarExpanded);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex pt-12">
        <Sidebar
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
          defaultActiveMainMenu={defaultActiveMainMenu}
        />
        <main
          className={`flex-1 p-4 pl-10 transition-all duration-300 ${
            isSidebarExpanded ? "ml-[calc(3rem+16rem)]" : "ml-[4.5rem]"
          } max-w-[calc(100vw-${
            isSidebarExpanded ? "calc(3rem+16rem)" : "4.5rem"
          })] overflow-x-hidden`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarAndNavbar;
