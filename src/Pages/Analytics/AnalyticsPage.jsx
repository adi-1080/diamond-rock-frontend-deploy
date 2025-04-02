import React, { useState } from 'react';
import SidebarAndNavbar from "../../components/SidebarAndNavbar";

import { 
  Search, 
  Bell, 
  Download, 
  Grid, 
  User, 
  ChevronDown, 
  ChevronRight,
  Info,
  Lock
} from 'lucide-react';

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('Recent');



  //Stock scan 
  const stockScans = [
    { id: 1, title: 'Closing Above Previous High', icon: '📈', count: 42 },
    { id: 2, title: 'Higher Delivery Quantity', icon: '📊', count: 42 },
    { id: 3, title: 'High Delivery Percentage', icon: '📊', count: 9 },
    { id: 4, title: 'Increase in FII Shareholding', icon: '🌐', count: 255, locked: true },
    { id: 5, title: 'White Marubozu', icon: '📈', count: 11 },
    { id: 6, title: 'Close Crossing All Time High', icon: '📈', count: 1, locked: true }
  ];

  //Chart patterns
  const chartPatterns = [
    { id: 1, name: 'Alkyl Amines Chemicals Ltd.', type: 'Falling Channel', publishedOn: '24 Mar 2025', pricePoint: '1,721.55', ltp: '1,683.55' },
    { id: 2, name: 'Hatsun Agro Product Ltd.', type: 'Falling Wedge', publishedOn: '21 Mar 2025', pricePoint: '922.85', ltp: '890.65' },
    { id: 3, name: 'Torrent Power Ltd.', type: 'Symmetrical Triangle', publishedOn: '19 Mar 2025', pricePoint: '1,376.12', ltp: '1,505.20' }
  ];

  //Trading strategies
  const tradingStrategies = [
    { id: 1, name: 'Cannon', type: 'Momentum', strategy: 'One Day Bullish Strategies', icon: '🔵', arrow: 'up', count: 2 },
    { id: 2, name: 'Armour', type: 'Momentum', strategy: 'One Day Bearish Strategies', icon: '⚪', arrow: 'down', count: 2, locked: true },
    { id: 3, name: 'Surfing', type: 'Momentum', strategy: 'Positional Bullish Strategies', icon: '🔵', arrow: 'up', count: 1, locked: true },
    { id: 4, name: 'Shield', type: 'Continuation', strategy: 'One Day Bearish Strategies', icon: '🔴', arrow: 'down', count: 2, locked: true },
    { id: 5, name: 'Raven', type: 'Continuation', strategy: 'Swing Bearish Strategies', icon: '🔴', arrow: 'down', count: 2, locked: true }
  ];

  //Investment ideas
  const investmentIdeas = [
    { id: 1, name: 'Relaxo Footwears Ltd.', edgeScore: '20 / 30', keyLevel: '720.00', gap: '9.43%', ltp: '795.00' },
    { id: 2, name: 'Berger Paints India Ltd.', edgeScore: '23 / 30', keyLevel: '485.00', gap: '9.43%', ltp: '535.50' },
    { id: 3, name: 'Axis Bank Ltd.', edgeScore: '22 / 30', keyLevel: '1,050.00', gap: '9.48%', ltp: '1,160.00', locked: true }
  ];

  //Edge reports 
  const edgeReports = {
    caseStudies: [
      { id: 1, name: 'Central Depository Services (India) Limited', date: '21 Mar 2025', locked: true },
      { id: 2, name: 'Voltas Limited', date: '20 Mar 2025', locked: true },
      { id: 3, name: 'Blue Star Limited', date: '20 Mar 2025', locked: true },
      { id: 4, name: 'Whirlpool Of India Limited', date: '20 Mar 2025', locked: true }
    ],
    stocksToWatch: [
      { id: 1, name: 'Weekly Technical Stocks2Watch', date: '29 Mar 2025', locked: true },
      { id: 2, name: 'Weekly Technical Stocks2Watch', date: '22 Mar 2025', locked: true },
      { id: 3, name: 'Weekly Technical Stocks2Watch', date: '15 Mar 2025', locked: true },
      { id: 4, name: 'Weekly Technical Stocks2Watch', date: '8 Mar 2025', locked: true }
    ],
    concallAnalysis: [
      { id: 1, name: 'Schaeffler India Limited', title: 'Earnings Call Q4 FY24', locked: true },
      { id: 2, name: 'Avanti Feeds Limited', title: 'Earnings Call Q3 FY25', locked: true },
      { id: 3, name: 'Narayana Hrudayalaya Limited', title: 'Earnings Call Q3 FY25', locked: true },
      { id: 4, name: 'Aditya Birla Fashion And Retail Limited', title: 'Earnings Call Q3 FY25', locked: true }
    ]
  };

  

  return (
    <SidebarAndNavbar>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stocks Scan */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Stocks Scan</h2>
              <a href="#" className="text-blue-600 text-sm flex items-center">
                View All <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {stockScans.map((scan) => (
                <div key={scan.id} className="border rounded p-4 flex flex-col">
                  <div className="mb-2 text-lg">{scan.icon}</div>
                  <div className="font-medium mb-2">{scan.title}</div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-gray-600">{scan.count} Stocks</span>
                    {scan.locked && <Lock size={16} className="text-gray-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Patterns */}
<div className="mb-8">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-medium">Chart Patterns</h2>
    <div className="flex items-center">
      <a href="#" className="text-blue-600 text-sm flex items-center mr-2">
        View All <ChevronRight size={16} />
      </a>
      <span className="text-sm text-gray-500">119 Stocks in Recent</span>
    </div>
  </div>

  <div className="bg-white border rounded p-4 mb-4">
    <div className="bg-blue-50 p-3 text-sm mb-4 flex items-center justify-between">
      <div>
        To View Recent Chart Patterns, <a href="#" className="text-blue-600 font-medium">SUBSCRIBE</a> To Pro Plan
      </div>
      <div className="flex">
        <button 
          className={`px-3 py-1 rounded ${activeTab === 'Recent' ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveTab('Recent')}
        >
          Recent
        </button>
        <button 
          className={`px-3 py-1 rounded ${activeTab === 'Past' ? 'bg-gray-200' : ''}`}
          onClick={() => setActiveTab('Past')}
        >
          Past
        </button>
      </div>
    </div>

    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-left font-medium">Stock Name</th>
          <th className="py-3 px-4 text-left font-medium">Type</th>
          <th className="py-3 px-4 text-left font-medium">Pattern</th>
          <th className="py-3 px-4 text-left font-medium">Published On</th>
          <th className="py-3 px-4 text-left font-medium">Price Point</th>
          <th className="py-3 px-4 text-left font-medium">LTP</th>
        </tr>
      </thead>
      <tbody>
        {chartPatterns.map((pattern) => (
          <tr key={pattern.id} className="border-t">
            <td className="py-3 px-4">{pattern.name}</td>
            <td className="py-3 px-4">{pattern.type}</td>
            <td className="py-3 px-4">
              <div className={`h-4 w-16 ${pattern.type.includes('Falling') ? 'bg-purple-200' : 'bg-green-200'} rounded`}></div>
            </td>
            <td className="py-3 px-4">{pattern.publishedOn}</td>
            <td className="py-3 px-4">{pattern.pricePoint}</td>
            <td className="py-3 px-4">{pattern.ltp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

          {/* Trading Strategies */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Trading Strategies</h2>
              <div className="flex items-center">
                <a href="#" className="text-blue-600 text-sm flex items-center">
                  View All <ChevronRight size={16} />
                </a>
                <span className="text-sm text-gray-500 ml-2">9 Stocks</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {tradingStrategies.map((strategy) => (
                <div key={strategy.id} className="border rounded p-4 flex flex-col">
                  <div className="mb-2 flex justify-between">
                    <div className="flex items-center">
                      <span className="w-6 h-6 mr-2 bg-gray-200 flex items-center justify-center rounded-md">{strategy.icon}</span>
                      <span className="text-xs text-gray-500">{strategy.type}</span>
                    </div>
                    <div className={`${strategy.arrow === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {strategy.arrow === 'up' ? '↗' : '↘'}
                    </div>
                  </div>
                  <div className="font-medium mb-2">{strategy.strategy}</div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-gray-600">{strategy.count} Stock{strategy.count !== 1 ? 's' : ''}</span>
                    {strategy.locked && <Lock size={16} className="text-gray-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Ideas */}
<div className="mb-8">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-medium">Investment Ideas</h2>
    <div className="flex items-center">
      <a href="#" className="text-blue-600 text-sm flex items-center">
        View All <ChevronRight size={16} />
      </a>
      <span className="text-sm text-gray-500 ml-2">139 Stocks</span>
    </div>
  </div>

  <div className="bg-white border rounded p-4">
    <div className="bg-blue-50 p-3 text-sm mb-4">
      <a href="#" className="text-blue-600 font-medium">SUBSCRIBE</a> for Strong Fundamentals Stocks & Key levels!
    </div>

    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-left font-medium">Stock Name</th>
          <th className="py-3 px-4 text-left font-medium">Edge Score</th>
          <th className="py-3 px-4 text-left font-medium">Spider Chart</th>
          <th className="py-3 px-4 text-left font-medium">Key Level</th>
          <th className="py-3 px-4 text-left font-medium">Gap</th>
          <th className="py-3 px-4 text-left font-medium">LTP</th>
        </tr>
      </thead>
      <tbody>
        {investmentIdeas.map((idea) => (
          <tr key={idea.id} className="border-t">
            <td className="py-3 px-4">
              <div>
                {idea.name}
                {idea.id <= 2 && (
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    Case Study <span className="ml-1">📄</span>
                  </div>
                )}
              </div>
            </td>
            <td className="py-3 px-4">{idea.edgeScore}</td>
            <td className="py-3 px-4">
              {idea.id <= 2 ? (
                <div className="h-12 w-12 text-purple-500">
                  <svg viewBox="0 0 100 100">
                    <polygon 
                      points="50,10 90,30 90,70 50,90 10,70 10,30" 
                      fill="rgba(168, 85, 247, 0.2)" 
                      stroke="#a855f7" 
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex justify-center items-center h-12 w-12">
                  <Lock size={24} className="text-blue-600" />
                </div>
              )}
            </td>
            <td className="py-3 px-4 text-green-600 font-medium">{idea.keyLevel}</td>
            <td className="py-3 px-4">{idea.gap}</td>
            <td className="py-3 px-4">{idea.ltp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

          {/* Edge Reports */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Edge Reports</h2>
              <a href="#" className="text-blue-600 text-sm flex items-center">
                View All <ChevronRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Case Studies */}
              <div>
                <div className="flex items-center mb-3 bg-orange-100 p-2 rounded">
                  <div className="w-8 h-8 mr-2 bg-orange-200 rounded flex items-center justify-center">
                    📋
                  </div>
                  <span className="font-medium">Case Studies</span>
                  <div className="ml-auto">
                    <a href="#" className="text-blue-600 text-sm">Sample Report &gt;</a>
                  </div>
                </div>
                <div className="border rounded overflow-hidden">
                  {edgeReports.caseStudies.map(report => (
                    <div key={report.id} className="border-b p-3 flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="w-8 h-8 mr-2 bg-gray-100 rounded flex items-center justify-center">
                          {report.id === 1 ? <span>CD</span> : report.id === 2 ? <span>V</span> : report.id === 3 ? <span>⭐</span> : <span>W</span>}
                        </div>
                        <div>
                          <div>{report.name}</div>
                          <div className="text-sm text-gray-500">{report.date}</div>
                        </div>
                      </div>
                      <Lock size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stocks to Watch */}
              <div>
                <div className="flex items-center mb-3 bg-purple-100 p-2 rounded">
                  <div className="w-8 h-8 mr-2 bg-purple-200 rounded flex items-center justify-center">
                    📊
                  </div>
                  <span className="font-medium">Stocks to Watch</span>
                  <div className="ml-auto">
                    <a href="#" className="text-blue-600 text-sm">Sample Report &gt;</a>
                  </div>
                </div>
                <div className="border rounded overflow-hidden">
                  {edgeReports.stocksToWatch.map(report => (
                    <div key={report.id} className="border-b p-3 flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="w-8 h-8 mr-2 bg-gray-100 rounded flex items-center justify-center">
                          <span>📈</span>
                        </div>
                        <div>
                          <div>{report.name}</div>
                          <div className="text-sm text-gray-500">{report.date}</div>
                        </div>
                      </div>
                      <Lock size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Concall Analysis */}
              <div>
                <div className="flex items-center mb-3 bg-red-100 p-2 rounded">
                  <div className="w-8 h-8 mr-2 bg-red-200 rounded flex items-center justify-center">
                    📞
                  </div>
                  <span className="font-medium">Concall Analysis</span>
                  <div className="ml-auto">
                    <a href="#" className="text-blue-600 text-sm">Sample Report &gt;</a>
                  </div>
                </div>
                <div className="border rounded overflow-hidden">
                  {edgeReports.concallAnalysis.map(report => (
                    <div key={report.id} className="border-b p-3 flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="w-8 h-8 mr-2 bg-gray-100 rounded flex items-center justify-center">
                          {report.id === 1 ? <span>S</span> : report.id === 2 ? <span>A</span> : report.id === 3 ? <span>N</span> : <span>AB</span>}
                        </div>
                        <div>
                          <div>{report.name}</div>
                          <div className="text-sm text-gray-500">{report.title}</div>
                        </div>
                      </div>
                      <Lock size={16} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          
        </div>

    </SidebarAndNavbar>
  );
};

export default AnalyticsPage;