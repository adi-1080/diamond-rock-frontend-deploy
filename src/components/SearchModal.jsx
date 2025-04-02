import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { setTickers, fetchWatchlistApiData } from "../redux/slice/watchlistApiSlice";
import  symbols from "../js-data/symbols";
// const mockStocks = [
//   { symbol: '^NSEI', name: 'NIFTY 50 INDEX', type: 'index', exchange: 'NSE' },
//   { symbol: '^BSESN', name: 'BSE SENSEX', type: 'index', exchange: 'BSE' },
//   { symbol: '^DJI', name: 'Dow Jones Industrial Average', type: 'index', exchange: 'DJI' },
//   { symbol: '^IXIC', name: 'NASDAQ Composite', type: 'index', exchange: 'NASDAQ' },
//   { symbol: '^RUT', name: 'Russell 2000', type: 'index', exchange: 'NASDAQ' },
//   { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', exchange: 'NASDAQ' },
//   { symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', exchange: 'NASDAQ' },
// ];

function SearchModal({ isOpen, onClose, stockTickers, indexTickers, cryptoTickers, futureTickers, forexTickers, setStockTickers, setIndexTickers, setFutureTickers, setCryptoTickers ,setForexTickers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const dispatch = useDispatch();
  const tickers = useSelector((state) => state.watchlistApiData.tickers); // Get current watchlist
  const symbolList = symbols;
  if (!isOpen) return null;

  const filteredStocks = symbolList.filter(stock => {
    const matchesSearch = 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'indices') return matchesSearch && stock.type === 'index';
    if (activeTab === 'stocks') return matchesSearch && stock.type === 'stock';
    if (activeTab === 'crypto') return matchesSearch && stock.type === 'crypto';
    if (activeTab === 'futures') return matchesSearch && stock.type === 'futures';
    if (activeTab === 'forex') return matchesSearch && stock.type === 'forex';
    return matchesSearch;
  });

  const handleStockSelect = (asset) => {
   
    switch (asset.type){
      case "stock":
        if (!stockTickers.includes(asset.name)) 
              setStockTickers([...stockTickers, asset.name]);
            
              break;
      case "index":
        if (!indexTickers.includes(asset.name)) 
          setIndexTickers([...indexTickers, asset.name]);
              break;
      case "crypto":
        if (!cryptoTickers.includes(asset.name)) 
          setCryptoTickers([...cryptoTickers, asset.name]);
              break;
      case "futures":
        if (!futureTickers.includes(asset.name)) 
          setFutureTickers([...futureTickers, asset.name]);
                  break;
      case "forex":
        if (!forexTickers.includes(asset.name)) 
          setForexTickers([...forexTickers, asset.name]);
              break;
    }
    onClose(); // Close modal after selection
  };

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Symbol</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mt-4 border-b border-gray-200">
            {['all', 'stocks', 'indices','forex','futures','crypto'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium capitalize ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4 max-h-[400px] overflow-y-auto">
            {filteredStocks.map((stock) => (
              <div
                key={stock.name}
                className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer rounded-lg"
                onClick={() => handleStockSelect(stock)
              }
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {stock.icon}
                  </div>
                  <div>
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-sm text-gray-500">{stock.description}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{stock.market}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;