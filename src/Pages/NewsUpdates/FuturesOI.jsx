import React, { useState } from "react";
import { BarChart2 } from "lucide-react";

export default function FuturesOI() {
  const subTabs1 = ["Gross", "Net", "Participants"];
  const subTabs2 = ["Index", "Stocks"];
  const [subTab1, setSubTab1] = useState("Gross");
  const [subTab2, setSubTab2] = useState("Index");

  const futuresData = {
    Gross: {
      Index: [
        { category: "Client", long: 3.8, short: 1.5, netContracts: 229849 },
        { category: "DII", long: 0.099, short: 0.062, netContracts: 37454 },
        { category: "FII", long: 1.1, short: 3.3, netContracts: -224190 },
        { category: "Pro", long: 0.053, short: 0.096, netContracts: -43113 },
      ],
      Stocks: [
        { category: "Client", long: 4.2, short: 2.1, netContracts: 210500 },
        { category: "DII", long: 0.15, short: 0.09, netContracts: 40200 },
        { category: "FII", long: 1.3, short: 3.5, netContracts: -230100 },
        { category: "Pro", long: 0.06, short: 0.11, netContracts: -45200 },
      ],
    },
    Net: {
      Index: [
        { category: "Client", long: 3.0, short: 1.0, netContracts: 200000 },
        { category: "DII", long: 0.08, short: 0.05, netContracts: 30000 },
        { category: "FII", long: 1.0, short: 2.8, netContracts: -210000 },
        { category: "Pro", long: 0.04, short: 0.08, netContracts: -40000 },
      ],
      Stocks: [
        { category: "Client", long: 3.5, short: 1.8, netContracts: 190000 },
        { category: "DII", long: 0.12, short: 0.07, netContracts: 35000 },
        { category: "FII", long: 1.2, short: 3.0, netContracts: -220000 },
        { category: "Pro", long: 0.05, short: 0.095, netContracts: -42000 },
      ],
    },
    Participants: {
      Index: [
        { category: "Client", long: 4.5, short: 2.2, netContracts: 250000 },
        { category: "DII", long: 0.17, short: 0.11, netContracts: 45000 },
        { category: "FII", long: 1.5, short: 3.8, netContracts: -240000 },
        { category: "Pro", long: 0.08, short: 0.13, netContracts: -50000 },
      ],
      Stocks: [
        { category: "Client", long: 4.8, short: 2.5, netContracts: 260000 },
        { category: "DII", long: 0.2, short: 0.15, netContracts: 50000 },
        { category: "FII", long: 1.8, short: 4.2, netContracts: -250000 },
        { category: "Pro", long: 0.09, short: 0.15, netContracts: -55000 },
      ],
    },
  };

  // Calculate the max value to normalize bar widths properly
  const getMaxValue = () =>
    Math.max(
      ...futuresData[subTab1][subTab2].map((item) =>
        Math.max(item.long, item.short)
      )
    );

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

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Gross Open Interest</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-400 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">Long</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pink-400 rounded-sm mr-2"></div>
              <span className="text-sm text-gray-600">Short</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {futuresData[subTab1][subTab2].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="w-24">{item.category}</div>
              <div className="flex-1 px-4">
                <div className="relative h-8">
                  {/* Long Bar */}
                  <div
                    className="absolute top-0 left-1/2 h-full bg-emerald-400 rounded-r"
                    style={{
                      width: `${(item.long / getMaxValue()) * 45}%`,
                      maxWidth: "45%",
                    }}
                  >
                    <span
                      className={`absolute ${
                        item.long > getMaxValue() * 0.15
                          ? "left-2"
                          : "left-full ml-1"
                      } top-1/2 -translate-y-1/2 text-sm ${
                        item.long > getMaxValue() * 0.15
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {item.long}L
                    </span>
                  </div>
                  {/* Short Bar */}
                  <div
                    className="absolute top-0 right-1/2 h-full bg-pink-400 rounded-l"
                    style={{
                      width: `${(item.short / getMaxValue()) * 45}%`,
                      maxWidth: "45%",
                    }}
                  >
                    <span
                      className={`absolute ${
                        item.short > getMaxValue() * 0.15
                          ? "right-2"
                          : "right-full mr-1"
                      } top-1/2 -translate-y-1/2 text-sm ${
                        item.short > getMaxValue() * 0.15
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {item.short}L
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`w-24 text-right ${
                  item.netContracts > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.netContracts > 0 ? "+" : ""}
                {item.netContracts.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
