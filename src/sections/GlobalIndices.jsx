import React from "react";

const indicesData = [
  { symbol: "^GSPC", name: "S&P 500", change: "5580.94", percent_change: -112.37, volume: -1.97, time: "2.838B" },
  { symbol: "^DJI", name: "Dow Jones Industrial Average", change: "41583.90", percent_change: -715.8, volume: -1.69, time: "532.364M" },
  { symbol: "^IPSA", name: "S&P IPSA", change: "7694.49", percent_change: 40.43, volume: 0.53, time: "1.136B" },
  { symbol: "^XAX", name: "NYSE AMEX COMPOSITE INDEX", change: "5060.48", percent_change: -93.56, volume: -1.82, time: "0" },
  { symbol: "^IXIC", name: "NASDAQ Composite", change: "17322.99", percent_change: -481.04, volume: -2.7, time: "6.28B" },
  {symbol: "^XDE", name: "Euro Currency Index", change: "108.27", percent_change: 0.27, volume: 0.25, time: "0"},
  {symbol: "^N100", name: "Euronext 100 Index", change: "1573.87", percent_change: -16.13, volume: -1.01, time: "0"},
  {symbol: "^BFX", name: "BEL 20", change: "4406.62", percent_change: -28.0, volume: -0.63, time: "0"},
];

export default function TrendingNow() {
  return (
    <div className="bg-white rounded-lg shadow-sm h-[420px] p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-lg">Global Indices</h2>
        <a href="#" className="text-blue-600 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="w-full overflow-y-auto h-[calc(100%-2rem)] scroll-custom">
        <div className="overflow-x-auto scroll-custom2">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="text-gray-700 text-left">
                <th className="px-2 py-2">Symbol</th>
                <th className="px-2 py-2 min-w-[12vw]">Name</th>
                <th className="px-2 py-2">Change</th>
                <th className="px-2 py-2 min-w-[5vw]">% Change</th>
                <th className="px-2 py-2">Volume</th>
                <th className="px-2 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {indicesData.map((stock, index) => (
                <tr key={index}>
                  <td className="px-2 py-2">{stock.symbol.replace("^", "")}</td>
                  <td className="px-2 py-2">{stock.name}</td>
                  <td className={`px-2 py-2 ${stock.percent_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.percent_change >= 0 ?'+':'-'}{stock.change}</td>
                  <td className={`px-2 py-2 ${stock.percent_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.percent_change >= 0 ?'+':'-'}{stock.percent_change}%</td>
                  <td className="px-2 py-2">{stock.volume}</td>
                  <td className="px-2 py-2">{stock.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
