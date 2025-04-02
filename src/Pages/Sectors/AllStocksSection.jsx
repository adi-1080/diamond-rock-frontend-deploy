import React, { act, useEffect, useState } from "react";

const AllStocksSection = (props) => {
  const options = {
    MCAP: {
      th: ["Stock Name", "Market Cap (Rs. Cr.)", "LTP", "Chg%"],
      td: [
        ["🏭 Impex Ferro Tech Ltd.", "17.29", "640.20", "▲0.7%"],
        ["🏭 Impex Ferro Tech Ltd.", "17.29", "640.20", "▲0.7%"],
        ["🏭 Impex Ferro Tech Ltd.", "17.29", "640.20", "▲0.7%"],
        ["🏭 Impex Ferro Tech Ltd.", "17.29", "640.20", "▲0.7%"],
      ],
    },
    DEBT: {
      th: [
        "Stock Name",
        "Statement",
        "Period Ending",
        "Total Debt",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    EV: {
      th: [
        "Stock Name",
        "Statement",
        "Period Ending",
        "Enterprise Value (Rs. Cr.)",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    SALES: {
      th: [
        "Stock Name",
        "Statement",
        "TTM Ending",
        "Net Sales (Rs. Cr.)",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    PAT: {
      th: [
        "Stock Name",
        "Statement",
        "TTM Ending",
        "Profit After Tax (Rs. Cr.)",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▼0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    PE: {
      th: [
        "Stock Name",
        "Statement",
        "TTM Ending",
        "Price Earning Ratio (TTM)",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    PEG: {
      th: ["Stock Name", "Statement", "TTM Ending", "PEG Ratio", "LTP", "Chg%"],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    "P/BV": {
      th: [
        "Stock Name",
        "Statement",
        "TTM Ending",
        "Price to Book Value (TTM)",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    "D/E": {
      th: [
        "Stock Name",
        "Statement",
        "Year Ending",
        "Debt Equity Ratio",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    ROE: {
      th: [
        "Stock Name",
        "Statement",
        "Year Ending",
        "Return of Equity (%)",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
    ROCE: {
      th: [
        "Stock Name",
        "Statement",
        "Year Ending",
        "Return on Capital Employed (%)",
        "LTP",
        "Chg%",
      ],
      td: [
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
        [
          "🏭Impex Ferro Tech Ltd.",
          "Consolidated",
          "2004-09",
          "17.29",
          "640.20",
          "▲0.7%",
        ],
      ],
    },
  };

  const [activeOption, setActiveOption] = useState("MCAP");

  useEffect(() => {
    console.log("tabData in all stocks section: ", props.tabData);
  }, [props.tabData]);

  return (
    <>
      {/* options */}
      <div className="flex justify-center">
        <div className="options inline-flex justify-center items-center bg-gray-100 rounded-lg px-1">
          {Object.keys(options).map((option, index) => {
            return (
              <div
                key={index}
                className={`flex justify-center items-center cursor-pointer text-xs px-4 py-1 my-1 rounded ${
                  activeOption === option ? "bg-white shadow-sm" : "bg-gray-100"
                }`}
                onClick={() => {
                  setActiveOption(option);
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>

      {/* data table */}
      <table className="mt-5 w-full text-sm">
        {/* table heading */}
        <thead className="bg-gray-50">
          <tr>
            {options[activeOption]["th"].map((heading, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        {/* table body */}
        <tbody className="divide-y divide-gray-200">
          {
            (activeOption === "MCAP") ? 
            (props.tabData.map((stock, index) => {
              console.log("mcap h yeh!!!");
              return (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                  <td className={"px-6 py-4 text-left border-t font-sans last:border-b-0"}>
                    {Math.abs(stock["Stock Name"]).toFixed(2)}
                  </td>
                  <td className={"px-6 py-4 text-left border-t font-sans last:border-b-0"}>
                    {Math.abs(stock["Market Cap(Rs. Cr.)"]).toFixed(2)}
                  </td>
                  <td className={"px-6 py-4 text-left border-t font-sans last:border-b-0"}>
                    {Math.abs(stock["LTP"]).toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 text-left border-t font-sans last:border-b-0 ${stock["Chg%"] && stock["Chg%"] < 0 ? "text-red-500" : "text-green-500"}`}>
                    {stock["Chg%"] && stock["Chg%"] < 0 ? "▼" : "▲"}{" "}{stock["Chg%"] ? Math.abs(stock["Chg%"]).toFixed(1) : "NaN"}
                  </td>
              </tr>
              )
            }))
            :
            (options[activeOption]["td"].map((data, index) => {
              console.log("yeh mcap nhi h!!!");
              return <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                {data.map((text, idx) => {
                  const isPositive = text.includes("▲");
                  const isNegative = text.includes("▼");
                  return (
                    <td
                      key={idx}
                      className={`px-6 py-4 text-left border-t font-sans last:border-b-0 ${
                        isPositive ? "text-emerald-600" : ""
                      } ${isNegative ? "text-red-600" : ""}`}
                    >
                      {text}
                    </td>
                  );
                })}
              </tr>
            }))
          }
        </tbody>
      </table>
    </>
  );
};

export default AllStocksSection;
