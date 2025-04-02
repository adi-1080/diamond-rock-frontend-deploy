import React, { useState } from "react";
import LineNCandleChartMH from "../components/charts/LineNCandleChartMH";
import { AdvancesDeclines } from "../sections/AdvancesDeclines";
import { Deals } from "../sections/Deals";
import { FIIDIIActivity } from "../sections/FIIDIIactivity";
import { IndicesCard } from "../sections/IndicesCard";
import { IPOInsights } from "../sections/IPOinsights";
import { IPOListing } from "../sections/IPOlistings";
import { MarketEvents } from "../sections/MarketEvents";
import { NewsAndUpdates } from "../sections/NewsAndUpdates";
import { NiftyCard } from "../sections/Niftycard";
import { SectoralPerformance } from "../sections/SectoralPerformance";
import GlobalIndices from "../sections/GlobalIndices";
import GlobalTrendingStocks from "../sections/GlobalTrendingStocks";
import { TrendingNow } from "../sections/TrendingNow";
import { TrendingStocksComponent } from "../sections/TrendingStocksComponent";
import EconomicHeatmap from "../components/EconomicIndHeatmap";
import SidebarAndNavbar from "../components/SidebarAndNavbar";

function MarketHome() {
  return (
    <SidebarAndNavbar>
      <div className="max-w-[1600px] mx-auto bg-white pt-0 p-4 rounded-lg">
        <div className="pt-4 py-2 mb-4">
          <LineNCandleChartMH />
          <div className="flex justify-between items-center">
            <h1 className="text-lg mb-3 font-medium">Indices</h1>
            <a
              href="/indices"
              className="text-blue-600 hover:underline text-sm"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] pb-3 rounded-lg">
              <NiftyCard />
            </div>
            {/* <div className="border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
                  <IndicesCard />
                </div> */}
            <div className="border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
              <AdvancesDeclines />
            </div>
          </div>
        </div>
        <EconomicHeatmap />

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <GlobalIndices />
          </div>
          <div className="col-span-2 border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <GlobalTrendingStocks />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <TrendingNow />
          </div>
          <div className="col-span-2 border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <TrendingStocksComponent />
          </div>
        </div>

        <div className="p-4 mb-4 border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
          <NewsAndUpdates />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <MarketEvents />
          </div>
          <div className="col-span-2 border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <Deals />
          </div>
        </div>
        <div className="grid  grid-cols-2 gap-4 mb-6">
          <div className="border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <FIIDIIActivity />
          </div>
          <div className="border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <SectoralPerformance />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <IPOInsights />
          </div>
          <div className="border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
            <IPOListing />
          </div>
        </div>
      </div>
    </SidebarAndNavbar>
  );
}

export default MarketHome;
