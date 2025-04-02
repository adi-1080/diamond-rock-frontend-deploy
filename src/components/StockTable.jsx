import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchStockScreenerOverviewApiData } from '../redux/slice/stockScreenerOverviewApiSlice';
import { useEffect } from 'react';


export function StockTable() {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState('ticker');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const stockTableApiData = useSelector(state => state.stockScreenerOverviewApiData.data) || [];
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const stockData = stockTableApiData
   ? Object.entries(stockTableApiData).map(([ticker, stock]) => {
       return {
         ticker: ticker, // Extracting "AAPL", "TSLA", etc.
         companyName: stock.companyName || "-", // Handle missing values safely
         currentPrice: stock.currentPrice || "-",
         marketCap: stock.marketCap || "-",
         recommendationKey: stock.recommendationKey || "-",
         regularMarketChange: stock.regularMarketChange || "-",
         regularMarketChangePercent: stock.regularMarketChangePercent || "-",
         volume: stock.volume || "-",
         sector: stock.sector || "-",
         fullTimeEmployees: stock.fullTimeEmployees || "-",
         epsTrailingTwelveMonths: stock.epsTrailingTwelveMonths || "-",
         volXPrice: parseFloat(stock.volume) * parseFloat(stock.currentPrice) || "-",
         pIe: parseFloat(stock.currentPrice) / parseFloat(stock.epsTrailingTwelveMonths) || "-",
       };
     })
   : [];
  const filteredStocks = stockData? stockData.filter(stock => 
    stock.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  ): [];

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === bValue) return 0;
    const comparison = aValue < bValue ? -1 : 1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const formatNumber = (num, decimals = 2) => {
    if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
    return num.toFixed(decimals);
  };

  useEffect(() => {
     dispatch(fetchStockScreenerOverviewApiData());
 
   }, []);

  

  return (
    <div className="overflow-auto bg-white-900 rounded-lg max-h-[70vh] scroll-custom border">
      <table className="w-full text-sm text-left text-white-200 border max-w-full">
        <thead className="text-xs uppercase bg-white-800">
          <tr>
            <th className="px-4 py-3 text-xs border border-gray-200 relative flex items-center">TICKER
              <span className='px-2'>
                <input
                  type="text"
                  placeholder="Search.."
                  className="px-2 py-2 bg-white-800 text-gray-500 rounded-sm border border-gray-300 focus:outline-none w-40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </span>
            </th>
            {[ 
              { key: 'price', label: 'PRICE' },
              { key: 'marketCap', label: 'MKT CAP' },
             {key:'RecommendationKey',label:"Technical Rating"},
              {key:'regularMarketChangePercent',label:"Change"},
              {key:'volume',label:"Volume"},
              {key:'sector',label:"Sector"},
              {key:'fullTimeEmployees',label:"Employees"},
              {key:'epsTrailingTwelveMonths',label:"EPS"},
              {key:'volXPrice',label:"Vol x Price"},
              {key:'pIe',label:"P/E"}
             
            ].map(({ key, label }) => (
              <th
                key={key}
                className="px-4 py-3 cursor-pointer hover:bg-white-700 border border-gray-200"
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center gap-1 text-xs">
                  {label.split(' ').map((word) => (
                    <div key={word}>{word}</div>
                  ))}
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock) => (
            <tr key={stock.ticker} className="border-b border-gray-200 hover:bg-white-800">
              <td className="px-4 py-3">
                <div>
                  <div className="text-sm">{stock.ticker}</div>
                  {/* <div className="text-xs text-white-400">{stock.companyName}</div> */}
                </div>
              </td>
             <td className="text-sm px-4 py-3">{stock.currentPrice.toFixed(2)} {"USD"}</td>
              <td className="text-sm px-4 py-3">{formatNumber(stock.marketCap)}</td>
              <td className="text-sm px-4 py-3">{stock.recommendationKey}</td>
              <td className="text-sm px-4 py-3">{stock.regularMarketChangePercent.toFixed(2)}%</td>
              <td className="text-sm px-4 py-3">{formatNumber(stock.volume)}</td>
              <td className="text-sm px-4 py-3">{stock.sector}</td>
              <td className="text-sm px-4 py-3">{formatNumber(stock.fullTimeEmployees)}</td>
              <td className="text-sm px-4 py-3">{stock.epsTrailingTwelveMonths.toFixed(2)}</td>
              <td className="text-sm px-4 py-3">{formatNumber(stock.volXPrice)}</td>
              <td className="text-sm px-4 py-3">{stock.pIe.toFixed(2)}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
