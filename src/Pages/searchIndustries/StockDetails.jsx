import React, { useState, useEffect } from "react";
import { Info, Maximize2 } from "lucide-react";
import AreaHistogramChart from "../../components/charts/AreaHistogramChart";
import { useParams } from "react-router-dom";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";
import {  useDispatch } from "react-redux";
import { setTicker } from '../../redux/slice/stockEgdePriceChartApiSlice';
import StockHeader from "../../components/StockHeader";

const StockDetails = () => {
  const dispatch = useDispatch();
  const [timeframe, setTimeframe] = useState("1D");
  const [chartLow, setChartLow] = useState(0);
  const [chartHigh, setChartHigh] = useState(0);
  const { ticker }= useParams();

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"];

  const chartData = Array.from({ length: 100 }, (_, i) => ({
    time: i,
    price: 1278 + Math.sin(i / 10) * 5 + Math.random() * 2,
  }));

  useEffect(() => {
    dispatch(setTicker(ticker));
  }, [ticker]);

  return (
    <SidebarAndNavbar>
      <div className="min-h-screen bg-white">
        <StockHeader defaultActiveTab="prices" ticker={ticker} />

        <div className="p-4 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]">
            <div className="flex justify-between items-center">
              <div className="options inline-flex justify-center items-center bg-gray-100 rounded-lg px-1 mb-5">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`flex justify-center items-center cursor-pointer text-sm px-4 py-1 my-1 rounded ${
                      timeframe === tf ? "bg-white shadow-sm" : "bg-gray-100"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="hover:bg-gray-200 p-2 rounded-xl cursor-pointer">
                <a href="/innerChart/RELIANCE.NS">
                  <Maximize2 className="w-5 h-5 text-gray-700" size={20} />
                </a>
              </div>
            </div>

            <div className="h-64">
              {/* <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" hide />
                      <YAxis domain={["auto", "auto"]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#ef4444"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer> */}
              <AreaHistogramChart
                period={timeframe}
                setChartLow={setChartLow}
                setChartHigh={setChartHigh}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <div>
                {timeframe} Low: {chartLow}
              </div>
              <div>
                {timeframe} High: {chartHigh}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-medium">Overview</h2>
                <button className="text-blue-600 text-sm">View More</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Sector</div>
                    <a href="#" className="text-sm text-blue-600">
                      Crude Oil
                    </a>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Market Cap</div>
                    <div className="text-sm">17,29,505 Cr</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Enterprise Value (EV)
                    </div>
                    <div className="text-sm">20,65,842 Cr</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Price-Earning Ratio (PE)
                    </div>
                    <div className="text-sm">25.00</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Dividend Yield</div>
                    <div className="text-sm">0.39</div>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Industry</div>
                    <a href="#" className="text-sm text-blue-600">
                      Refineries
                    </a>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Category</div>
                    <div className="text-sm">Large Cap</div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">
                      Book Value / Share
                    </div>
                    <div className="text-sm">626.66</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">PEG Ratio</div>
                    <div className="text-sm">2.09</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-medium">Performance</h2>
                <button className="text-blue-600 text-sm">View More</button>
              </div>
              <div className="space-y-3">
                {[
                  { period: "1 Day", value: -0.5 },
                  { period: "1 Week", value: 3.5 },
                  { period: "1 Month", value: 2.2 },
                  { period: "6 Month", value: 11.7 },
                  { period: "1 Year", value: 11.2 },
                  { period: "2 Year", value: 9.8 },
                  { period: "5 Year", value: 78.2 },
                  { period: "10 Year", value: 458.8 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 text-sm text-gray-500">
                      {item.period}
                    </div>
                    <div className="flex-grow relative h-2 bg-gray-100 rounded">
                      <div
                        className={`absolute h-full rounded ${
                          item.value >= 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(Math.abs(item.value) / 5, 100)}%`,
                          left: item.value < 0 ? "auto" : "0",
                          right:
                            item.value < 0
                              ? "0\
                        "
                              : "auto",
                        }}
                      />
                    </div>
                    <div
                      className={`w-16 text-right text-sm ${
                        item.value >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.value > 0 ? "▲" : "▼"} {Math.abs(item.value)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)]">
            <h2 className="text-base font-medium mb-2">About Company</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Reliance Industries Limited (RIL) is an Indian multinational
              conglomerate company, headquartered in Mumbai. RIL's diverse
              businesses include energy, petrochemicals, natural gas, retail,
              telecommunications, mass media, and textiles. Reliance is one of
              the most profitable companies in India, the largest publicly
              traded company in India by market capitalisation, and the largest
              company in India as measured by revenue. It is also the tenth
              largest employer in India with over 236,000 employees.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)] text-center">
            <a
              href="/innerChart/RELIANCE.NS"
              className="text-blue-600 text-sm flex items-center justify-center"
            >
              <Info className="w-4 h-4 mr-1" />
              Interactive Advanced Chart
            </a>
          </div>
        </div>
      </div>
    </SidebarAndNavbar>
  );
};

export default StockDetails;
