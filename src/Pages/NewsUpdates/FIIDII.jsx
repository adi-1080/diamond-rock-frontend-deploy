import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function FIIDII() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        {cardsData.map((data, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">{data.indice}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">
                {data.price.toLocaleString()}
              </span>
              {data.movement >= 0 ? (
                <span className="text-green-500 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />+{data.movement} (
                  {data.movementPercent}%)
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  {data.movement} ({data.movementPercent}%)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-6">
          FII / DII Activity: Net Buy/(Sell)
        </h2>
        <div className="space-y-6">
          {fiiDiiData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="w-1/3">{item.category}</div>
              <div className="w-1/3">
                <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full ${
                      item.value > 0
                        ? "bg-green-500 rounded-r-full"
                        : "bg-red-500 rounded-l-full"
                    }`}
                    style={{
                      width: `${Math.abs(item.value) / 100}%`,
                      left: item.value < 0 ? "auto" : "50%",
                      right: item.value < 0 ? "50%" : "auto",
                    }}
                  />
                </div>
              </div>
              <div
                className={`w-1/3 text-right ${
                  item.value > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.value > 0 ? "+" : ""}
                {item.value.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

let cardsData = [
  { indice: "NIFTY", price: 23249.5, movement: 86.4, movementPercent: 0.4 },
  { indice: "INDIA VIX", price: 17.39, movement: -1.25, movementPercent: 6.7 },
  { indice: "SENSEX", price: 76759.81, movement: 226.85, movementPercent: 0.3 },
];

let fiiDiiData = [
  { category: "FII Cash Market (Provisional)", value: -4582.95 },
  { category: "DII Cash Market (Provisional)", value: 2165.89 },
  { category: "FII Index Futures", value: 165.78 },
  { category: "FII Index Options", value: 21593.1 },
  { category: "FII Stock Futures", value: 2868.08 },
  { category: "FII Stock Options", value: 4345.71 },
];
