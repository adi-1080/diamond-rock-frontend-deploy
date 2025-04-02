import React from 'react';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  Lightbulb, 
  FileText, 
  Building2, 
  Building, 
  Wallet, 
  Warehouse, 
  Briefcase,
  Search,
  FileClock,
  ChevronRight, 
  Lock, 
  ChevronUp,
  BarChart2,
  Bell, 
  ChevronDown, 
  Download
} from 'lucide-react';

// Analytics Dashboard - Single File Component
const AnalyticsMain = () => {
  // Sidebar Items
  const sidebarItems = [
    { icon: <Search className="w-5 h-5" />, label: 'Analytics Home', path: '/' },
    { icon: <Lightbulb className="w-5 h-5" />, label: 'Scans', path: '/scans' },
    { icon: <LineChart className="w-5 h-5" />, label: 'Chart Patterns', path: '/chart-patterns', pro: true },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Trading Strategies', path: '/trading-strategies' },
    { icon: <Lightbulb className="w-5 h-5" />, label: 'Investment Ideas', path: '/investment-ideas' },
    { icon: <FileText className="w-5 h-5" />, label: 'Edge Reports', path: '/edge-reports' },
    { icon: <PieChart className="w-5 h-5" />, label: 'Sector Rotation', path: '/sector-rotation', pro: true },
    { icon: <Building2 className="w-5 h-5" />, label: 'Sector Analytics', path: '/sector-analytics', pro: true },
    { icon: <Building className="w-5 h-5" />, label: 'Market Breadth', path: '/market-breadth' },
    { icon: <Wallet className="w-5 h-5" />, label: 'Investor Portfolios', path: '/investor-portfolios' },
    { icon: <Warehouse className="w-5 h-5" />, label: 'Investment Themes', path: '/investment-themes' },
    { icon: <FileClock className="w-5 h-5" />, label: 'Edge Insights', path: '/edge-insights' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Company Filings', path: '/company-filings' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Business Houses', path: '/business-houses' }
  ];

  // Stock Scan Items
  const scanItems = [
    { 
      icon: <TrendingUp className="w-4 h-4" />, 
      iconBg: "bg-green-600", 
      title: "Closing Above Previous High", 
      count: 83 
    },
    { 
      icon: <BarChart2 className="w-4 h-4" />, 
      iconBg: "bg-blue-600", 
      title: "Higher Delivery Quantity", 
      count: 54 
    },
    { 
      icon: <ChevronUp className="w-4 h-4" />, 
      iconBg: "bg-blue-600", 
      title: "High Delivery Percentage", 
      count: 10 
    },
    { 
      icon: <LineChart className="w-4 h-4" />, 
      iconBg: "bg-blue-500", 
      title: "Increase in FII Shareholding", 
      count: 256,
      locked: true
    },
    { 
      icon: <ChevronUp className="w-4 h-4" />, 
      iconBg: "bg-green-500", 
      title: "White Marubozu", 
      count: 3 
    },
    { 
      icon: <TrendingUp className="w-4 h-4" />, 
      iconBg: "bg-blue-800", 
      title: "High Return on Equity", 
      count: 315 
    }
  ];

  // Chart Pattern Data
  const patternData = [
    {
      stockCode: 'ALKYL',
      stockName: 'Alkyl Amines Chemicals Ltd.',
      type: 'Falling Channel',
      pattern: 'falling-channel',
      patternVisual: 'purple-down',
      publishedOn: '24 Mar 2025',
      pricePoint: '1,721.55',
      ltp: '1,618.15'
    },
    {
      stockCode: 'HAP',
      stockName: 'Hatsun Agro Product Ltd.',
      type: 'Falling Wedge',
      pattern: 'falling-wedge',
      patternVisual: 'green-down',
      publishedOn: '21 Mar 2025',
      pricePoint: '922.85',
      ltp: '964.15'
    },
    {
      stockCode: 'TORNTPOWER',
      stockName: 'Torrent Power Ltd.',
      type: 'Symmetrical Triangle',
      pattern: 'symmetrical-triangle',
      patternVisual: 'purple-side',
      publishedOn: '19 Mar 2025',
      pricePoint: '1,376.12',
      ltp: '1,486.85'
    }
  ];

  // Scan Card Component
  const ScanCard = ({ icon, iconBg, title, count, locked }) => (
    <div className="border rounded-md hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex flex-col gap-3">
          <div className={`${iconBg} w-8 h-8 rounded-md flex items-center justify-center text-white`}>
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{count} Stocks</p>
            {locked && <Lock className="w-4 h-4 text-blue-600" />}
          </div>
        </div>
      </div>
    </div>
  );

  // Pattern Visual Component
  const PatternVisual = ({ type }) => {
    if (type === 'purple-down') {
      return <div className="w-20 h-8 bg-gradient-to-br from-purple-200 to-purple-300 rounded"></div>;
    } else if (type === 'green-down') {
      return <div className="w-20 h-8 bg-gradient-to-br from-green-200 to-green-300 rounded"></div>;
    } else if (type === 'purple-side') {
      return <div className="w-20 h-8 bg-gradient-to-r from-purple-200 to-purple-300 rounded"></div>;
    }
    return null;
  };

  // Selected class for sidebar
  const selectedClass = "bg-blue-50 text-blue-800";

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b p-2 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl font-bold text-blue-800 mr-6">StockEdge</div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search for Stocks, MFs, Scans and more"
              className="pl-10 pr-4 py-2 w-80 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="flex items-center gap-1 text-blue-600 border border-blue-600 rounded-md px-3 py-1.5">
              <span>New</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1.5">Register</button>
          
          <button className="text-blue-600 p-1.5 rounded-md hover:bg-gray-100">
            <Download className="w-5 h-5" />
          </button>
          
          <button className="text-blue-600 p-1.5 rounded-md hover:bg-gray-100 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              1
            </span>
          </button>
          
          <button className="text-blue-600 p-1.5 rounded-md hover:bg-gray-100">
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
              <div className="bg-blue-600 rounded-sm"></div>
              <div className="bg-blue-600 rounded-sm"></div>
              <div className="bg-blue-600 rounded-sm"></div>
              <div className="bg-blue-600 rounded-sm"></div>
            </div>
          </button>
          
          <button className="bg-red-500 text-white rounded-full w-8 h-8 p-0 flex items-center justify-center">
            <span>N</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r h-screen flex flex-col overflow-y-auto bg-white">
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold">Analytics</h1>
          </div>
          
          <div className="px-2 py-2 flex-1 overflow-y-auto">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-100 ${index === 0 ? selectedClass : 'text-gray-700'}`}
              >
                <div className="text-gray-500">{item.icon}</div>
                <span>{item.label}</span>
                {item.pro && <span className="text-xs bg-blue-100 text-blue-800 px-1.5 rounded ml-auto">Pro</span>}
              </a>
            ))}
          </div>
          
          <div className="p-2 mt-auto">
            <button className="w-full p-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors">
              <div className="flex items-center justify-center">
                <span>🔆</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto py-4 px-6">
          <div className="space-y-8">
            {/* Stock Scan Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Stocks Scan</h2>
                <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                  View All <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {scanItems.map((item, index) => (
                  <ScanCard
                    key={index}
                    icon={item.icon}
                    iconBg={item.iconBg}
                    title={item.title}
                    count={item.count}
                    locked={item.locked}
                  />
                ))}
              </div>
            </div>

            {/* Chart Patterns Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Chart Patterns</h2>
                <a href="#" className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                  View All <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">To View Recent Chart Patterns,</span>
                  <a href="#" className="text-blue-600 text-sm font-medium">SUBSCRIBE</a>
                </div>
                <div className="text-sm text-gray-700">To Pro Plan</div>
              </div>
              
              <div className="bg-white border rounded-md overflow-hidden">
                <div className="flex border-b">
                  <button className="px-4 py-2 rounded-none border-b-2 border-blue-600 text-blue-800">Recent</button>
                  <button className="px-4 py-2 rounded-none text-gray-500">Past</button>
                </div>
                
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-64">Stock Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600 w-36">Pattern</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Published On</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Price Point</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">LTP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patternData.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-2 font-medium">
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs font-bold rounded">{row.stockCode}</span>
                            {row.stockName}
                          </div>
                        </td>
                        <td className="p-4">{row.type}</td>
                        <td className="p-4">
                          <PatternVisual type={row.patternVisual} />
                        </td>
                        <td className="p-4">{row.publishedOn}</td>
                        <td className="p-4">{row.pricePoint}</td>
                        <td className="p-4">{row.ltp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsMain;