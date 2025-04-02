import React from 'react';
import { ChevronRight } from 'lucide-react';

const BondsTable = () => {
  const usBonds = [
    { symbol: 'US01Y', name: '1 year', price: 4.055, change: 1.00, yield: 4.238 },
    { symbol: 'US02Y', name: '2 years', price: 99.688, change: -0.14, yield: 4.291 },
    { symbol: 'US05Y', name: '5 years', price: 99.563, change: -0.33, yield: 4.347 },
    { symbol: 'US10Y', name: '10 years', price: 98.094, change: -0.44, yield: 4.493 },
    { symbol: 'US20Y', name: '20 years', price: 98.406, change: -0.68, yield: 4.750 },
    { symbol: 'US30Y', name: '30 years', price: 96.906, change: -0.85, yield: 4.694 },
  ];

  const major10YBonds = [
    { symbol: 'US10Y', name: 'USA', price: 98.094, change: -0.44, yield: 4.493 },
    { symbol: 'EU10Y', name: 'European Union', price: 101.191, change: 0.05, yield: 2.364 },
    { symbol: 'GB10Y', name: 'United Kingdom', price: 98.229, change: 0.02, yield: 4.481 },
    { symbol: 'DE10Y', name: 'Germany', price: 101.194, change: 0.05, yield: 2.364 },
    { symbol: 'FR10Y', name: 'France', price: 99.266, change: -0.03, yield: 3.087 },
    { symbol: 'IT10Y', name: 'Italy', price: 103.328, change: -0.09, yield: 3.482 },
  ];

  

  const BondRow = ({ flag, name, symbol, price, change, yield: yieldValue }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6">
          {flag === 'us' ? (
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-xs">🇺🇸</span>
            </div>
          ) : flag === 'eu' ? (
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-xs">🇪🇺</span>
            </div>
          ) : flag === 'uk' ? (
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-xs">🇬🇧</span>
            </div>
          ) : flag === 'de' ? (
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-xs">🇩🇪</span>
            </div>
          ) : flag === 'fr' ? (
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-xs">🇫🇷</span>
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
              <span className="text-xs">🇮🇹</span>
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-gray-500">{symbol}</div>
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <div>
          <div className="text-sm text-right">
            {price.toFixed(3)}
            <span className="text-xs text-gray-500 ml-1">% OF PAR</span>
          </div>
          <div className={`text-xs text-right ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </div>
        </div>
        <div className="text-sm font-medium w-16 text-right">
          {yieldValue.toFixed(3)}%
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 px-0 bg-white">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 px-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">US bonds</h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-xs text-gray-500 flex justify-between mb-2">
            <span>SYMBOL</span>
            <div className="flex space-x-8">
              <span className="w-24 text-right">PRICE & CHG</span>
              <span className="w-16 text-right">YIELD</span>
            </div>
          </div>
          {usBonds.map((bond) => (
            <BondRow
              key={bond.symbol}
              flag="us"
              name={bond.name}
              symbol={bond.symbol}
              price={bond.price}
              change={bond.change}
              yield={bond.yield}
            />
          ))}
          <div className="mt-4">
            <a href="#" className="text-blue-600 text-sm flex items-center">
              See all US bonds
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 px-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Major 10Y bonds</h2>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-xs text-gray-500 flex justify-between mb-2">
            <span>SYMBOL</span>
            <div className="flex space-x-8">
              <span className="w-24 text-right">PRICE & CHG</span>
              <span className="w-16 text-right">YIELD</span>
            </div>
          </div>
          {major10YBonds.map((bond) => (
            <BondRow
              key={bond.symbol}
              flag={bond.symbol.toLowerCase().slice(0, 2)}
              name={bond.name}
              symbol={bond.symbol}
              price={bond.price}
              change={bond.change}
              yield={bond.yield}
            />
          ))}
          <div className="mt-4">
            <a href="#" className="text-blue-600 text-sm flex items-center">
              See all major 10Y bonds
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondsTable;