
import React from 'react';
import { X, ArrowDownIcon, ArrowUpIcon, ChevronDown, ChevronUp , ChevronRight} from 'lucide-react';
import { useState } from 'react';

// const watchlistData = [
//     { symbol: 'SPX', last: 5998.23, change: -103.02, changePercent: -1.69, type: 'index' },
//     { symbol: 'NDQ', last: 21175.17, change: -598.84, changePercent: -2.75, type: 'index' },
//     { symbol: 'DJI', last: 44318.94, change: -105.31, changePercent: -0.24, type: 'index' },
//     { symbol: 'VIX', last: 18.51, change: 3.66, changePercent: 24.65, type: 'index' },
//     { symbol: 'DXY', last: 107.269, change: -0.196, changePercent: -0.18, type: 'index' },
//     { symbol: 'AAPL', last: 225.12, change: 2.34, changePercent: 1.05, type: 'stock' },
//     { symbol: 'TSLA', last: 397.15, change: -9.34, changePercent: -2.32, type: 'stock' },
//     { symbol: 'NFLX', last: 971.89, change: -5.74, changePercent: -0.58, type: 'stock' },
//   ];

//   const stocksData = [
//     { symbol: 'AAPL', name: 'Apple Inc.', price: '226.80', change: '-5.13', changePercent: '29.41M' },
//     { symbol: 'TSLA', name: 'Tesla, Inc.', price: '238.39', change: '-9.24', changePercent: '66.48M' },
//     { symbol: 'NFLX', name: 'Netflix, Inc.', price: '870.03', change: '-2.37', changePercent: '3M' },
//   ];
  
//   const indicesData = [
//     { symbol: 'SPX', name: 'S&P 500 Index', price: '5,645.78', change: '-2.16', changePercent: '1.56B' },
//     { symbol: 'DJI', name: 'Dow Jones Industrial Average', price: '42,299.08', change: '-1.17', changePercent: '-' },
//     { symbol: 'NDX', name: 'US 100 Index', price: '19,551.07', change: '-3.22', changePercent: '-' },
//   ];
  
//   const cryptoData = [
//     { symbol: 'BTC', name: 'Bitcoin', price: '67,890.45', change: '+2.34', changePercent: '28.5B' },
//     { symbol: 'ETH', name: 'Ethereum', price: '3,456.78', change: '+1.56', changePercent: '15.2B' },
//   ];
  
//   const futuresData = [
//     { symbol: 'ES', name: 'E-mini S&P 500', price: '5,650.25', change: '-1.89', changePercent: '2.1M' },
//     { symbol: 'NQ', name: 'E-mini NASDAQ 100', price: '19,567.50', change: '-2.45', changePercent: '890K' },
//   ];
  
//   const forexData = [
//     { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: '1.0845', change: '-0.15', changePercent: '125.3B' },
//     { symbol: 'GBP/USD', name: 'British Pound/US Dollar', price: '1.2634', change: '-0.28', changePercent: '85.7B' },
//   ];

const MarketTable = ({ title, data, isVisible, onToggle }) => (
  <div className="bg-white rounded-lg shadow-md">
    <div className="flex items-center cursor-pointer mb-2 py-2 bg-gray-100" onClick={onToggle}>
      {isVisible ? <ChevronDown className="w-5 h-5 mr-2" /> : <ChevronRight className="w-5 h-5 mr-2" />}
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
    {isVisible && (
      <div className="overflow-x-auto">
        {data?.length > 0 ? (
          <table className="w-full table-fixed">
            <tbody>
              {data.map((item) => (
                <tr key={item.symbol} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-2 font-semibold">{item.symbol}</td>
                  <td className="px-2 py-2">{item.name}</td>
                  <td className="px-2 text-right py-2">
                    {item.currencySymbol}
                    {item.last.toFixed(2)}
                  </td>
                  <td
                    className={`text-right px-2 py-2 flex items-center justify-end ${
                      parseFloat(item.change) >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {parseFloat(item.change) >= 0 ? (
                      <ArrowUpIcon className="w-4 h-4 inline mr-1" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline mr-1" />
                    )}
                    {Math.abs(parseFloat(item.change)).toFixed(2)}%
                  </td>
                  <td
                    className={`text-right px-2 py-2 ${
                      parseFloat(item.changePercent) >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.changePercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500">Loading...</div>
        )}
      </div>
    )}
  </div>
);


export default function WatchlistModal({
  isModalOpen,
  onClose,
  isSearchModalOpen,
  onSearchClose,
  stockData,
  indexData,
  cryptoData,
  futureData,
  forexData,
}) {
  const [activeTab, setActiveTab] = useState("Price");
  const [showIndices, setShowIndices] = useState(true);
  const [showStocks, setShowStocks] = useState(true);
  const [showCryptos, setShowCryptos] = useState(true);
  const [showFutures, setShowFutures] = useState(true);
  const [showForex, setShowForex] = useState(true);

  const isLoading =
    !stockData.length &&
    !indexData.length &&
    !cryptoData.length &&
    !futureData.length &&
    !forexData.length;

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white w-full h-full p-6 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center pb-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Watchlist</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg hover:bg-black"
              onClick={onSearchClose}
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600" onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-8">Financial Markets Dashboard</h1>
          {isLoading ? (
            <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>
          ) : (
            <div className="grid">
              <table className="w-full table-fixed text-gray-500">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pl-3">Tickers</th>
                    <th className="text-left py-2 pl-2">Name</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Change</th>
                    <th className="text-right py-2 pr-2">Change %</th>
                  </tr>
                </thead>
              </table>
              <MarketTable title="Stocks" data={stockData} isVisible={showStocks} onToggle={() => setShowStocks(!showStocks)} />
              <MarketTable title="Indices" data={indexData} isVisible={showIndices} onToggle={() => setShowIndices(!showIndices)} />
              <MarketTable title="Cryptocurrencies" data={cryptoData} isVisible={showCryptos} onToggle={() => setShowCryptos(!showCryptos)} />
              <MarketTable title="Futures" data={futureData} isVisible={showFutures} onToggle={() => setShowFutures(!showFutures)} />
              <MarketTable title="Forex" data={forexData} isVisible={showForex} onToggle={() => setShowForex(!showForex)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
