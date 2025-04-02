import React, { useEffect, useState } from "react";
import { ArrowLeft, Share2 } from "lucide-react";

const stockData = [
  {
    name: "Impex Ferro Tech Ltd.",
    logo: "🏭",
    ltp: {
      "1D": { price: 3.04, change: 0.1, changePercent: 3.4 },
      "1W": { price: 3.1, change: 0.15, changePercent: 4.2 },
      "1M": { price: 2.95, change: -0.05, changePercent: -1.8 },
      "3M": { price: 2.8, change: 0.3, changePercent: 8.5 },
      "6M": { price: 2.75, change: 0.35, changePercent: 9.2 },
      "1Y": { price: 2.5, change: 0.6, changePercent: 15.4 },
      "2Y": { price: 2.3, change: 0.8, changePercent: 20.1 },
      "5Y": { price: 2.0, change: 1.1, changePercent: 30.5 },
    },
    lastUpdate: "03:31:09 pm",
  },
  {
    name: "Maithan Alloys Ltd.",
    logo: "✈️",
    ltp: {
      "1D": { price: 979.3, change: 13.65, changePercent: 1.4 },
      "1W": { price: 965.5, change: 25.45, changePercent: 2.8 },
      "1M": { price: 950.2, change: 40.75, changePercent: 4.5 },
      "3M": { price: 920.1, change: 70.85, changePercent: 7.2 },
      "6M": { price: 900.5, change: 90.45, changePercent: 9.1 },
      "1Y": { price: 850.3, change: 140.65, changePercent: 14.2 },
      "2Y": { price: 800.2, change: 190.75, changePercent: 19.3 },
      "5Y": { price: 700.1, change: 290.85, changePercent: 29.4 },
    },
    lastUpdate: "03:53:06 pm",
  },
  {
    name: "Jainam Ferro Alloys (I) Ltd.",
    logo: "🏢",
    ltp: {
      "1D": { price: 201.0, change: 0.0, changePercent: 0.0 },
      "1W": { price: 200.5, change: 0.5, changePercent: 0.2 },
      "1M": { price: 199.0, change: 2.0, changePercent: 1.0 },
      "3M": { price: 195.0, change: 6.0, changePercent: 3.0 },
      "6M": { price: 190.0, change: 11.0, changePercent: 5.5 },
      "1Y": { price: 180.0, change: 21.0, changePercent: 10.5 },
      "2Y": { price: 170.0, change: 31.0, changePercent: 15.5 },
      "5Y": { price: 150.0, change: 51.0, changePercent: 25.5 },
    },
    lastUpdate: "03:15:17 pm",
  },
];

const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "2Y", "5Y"];
const exchanges = ["NSE", "BSE"];

const SectorsIndustries = (props) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [selectedExchange, setSelectedExchange] = useState("NSE");
  const [industData, setIndustData] = useState({name: "", ltp: 0, market_cap: 0, chg_per: 0, stocks: 0});
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    const getIndustData = () => {
      console.log("tabData in sector industry component: ", props.tabData);
      let ltp = 0;
      let market_cap = 0;
      let chg_per = 0;
      for(let i=0; i<props.tabData.length; i++) {
        ltp += props.tabData[i]["LTP"];
        market_cap += props.tabData[i]["Market Cap(Rs. Cr.)"];
        chg_per += props.tabData[i]["Chg%"]
      }
      setIndustData({
        name: props.industryName.split("_")[0][0].toUpperCase() + props.industryName.split("_")[0].slice(1),
        stocks: props.tabData.length,
        ltp: ltp,
        market_cap: market_cap,
        chg_per: chg_per,
      });
    }

    getIndustData();
    console.log("industData in sector industry page: ", industData);
  }, []);

  return (
    <div className="max-w-full mx-auto bg-white">
      {/* Date and Toggles */}
      <div className="p-2 pt-4 flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">{currentDate}</div>
      </div>

      {/* Table Content */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock Name
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Stocks
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Market Cap
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              LTP
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Chg%
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr className="hover:bg-gray-50 cursor-pointer">
            <td className="px-6 py-4 font-medium">
              <div className="flex items-center gap-2">
                <span>🖥️</span>
                <div>
                  <div className="text-sm font-light text-black">
                    {industData["name"]}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-right font-light">
              {industData["stocks"]}
            </td>
            <td
              className={`px-6 py-4 text-right font-light`}
              >
              {industData["market_cap"]}
            </td>
            <td
              className={`px-6 py-4 text-right`}
            >
              {industData["ltp"]}
            </td>
            <td className={`px-6 py-4 text-right text-black text-sm ${industData["chg_per"] && (industData["chg_per"] < 0 ? "text-red-500": (industData["chg_per"] > 0 ? "text-green-500" : "text-black"))}`}>
              {industData["chg_per"] && (industData["chg_per"] < 0 ? "▼" : (industData["chg_per"] > 0 ? "▲" : ""))}{" "}{industData["chg_per"] ? Math.abs(industData["chg_per"]).toFixed(1) : "NaN"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SectorsIndustries;
