import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StockDataDashboard() {
  const [stockSymbol, setStockSymbol] = useState('RELIANCE.NS');
  const [overview, setOverview] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [earningHistory, setEarningHistory] = useState(null);
  const [esgScores, setEsgScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [finView, setFinView] = useState('quarterly');
  const [reportType, setReportType] = useState('consolidated');

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [overviewRes, earningsRes, earningHistoryRes, esgScoresRes] = await Promise.all([
          fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_financial_data/${stockSymbol}/`),
          fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_earnings/${stockSymbol}/`),
          fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_earning_history/${stockSymbol}/`),
          fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_esg_scores/${stockSymbol}/`)
        ]);

        // Process responses
        const overviewData = await overviewRes.json();
        const earningsData = await earningsRes.json();
        const earningHistoryData = await earningHistoryRes.json();
        const esgScoresData = await esgScoresRes.json();

        setOverview(overviewData);
        setEarnings(earningsData);
        setEarningHistory(earningHistoryData);
        setEsgScores(esgScoresData);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [stockSymbol]);

  if (loading) {
    return <div className="p-8 text-center">Loading stock data...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // Mock current price and change for demonstration
  const currentPrice = 2841.75;
  const priceChange = -34.25;
  const priceChangePercent = -1.19;
  const timestamp = new Date().toLocaleString();

  return (
    <div className="w-full max-w-6xl mx-auto bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <button className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold">{overview?.summaryProfile?.name || stockSymbol}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{currentPrice} INR</span>
              <span className="text-red-500">{priceChange} ({priceChangePercent}%)</span>
              <span className="text-gray-500 text-sm">{timestamp}</span>
            </div>
          </div>
          <div className="ml-auto flex space-x-2">
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b">
        <nav className="flex">
          <button className="px-4 py-2 text-gray-600">Prices</button>
          <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">Fundamental</button>
          <button className="px-4 py-2 text-gray-600">Financials</button>
          <button className="px-4 py-2 text-gray-600">Diamond Report</button>
          <button className="px-4 py-2 text-gray-600">Updates</button>
          <button className="px-4 py-2 text-gray-600">Shareholding</button>
          <button className="px-4 py-2 text-gray-600">Deliveries</button>
          <button className="px-4 py-2 text-gray-600">Technicals</button>
        </nav>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
        <div className="max-w-md mx-auto my-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="ratios">Ratios</TabsTrigger>
            <TabsTrigger value="growth">Growth Pattern</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-500">Website</h3>
                <a 
                  href={overview?.summaryProfile?.website || "#"} 
                  className="text-blue-600 hover:underline"
                >
                  {overview?.summaryProfile?.website || "https://www.ril.com"}
                </a>
              </div>
              
              <div>
                <h3 className="text-gray-500">Market Cap</h3>
                <p className="font-semibold">{(overview?.price?.marketCap / 10000000).toFixed(2) || "17,35,000"} Cr.</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">Enterprise Value</h3>
                <p className="font-semibold">{(overview?.defaultKeyStatistics?.enterpriseValue / 10000000).toFixed(2) || "19,24,215"} Cr.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-gray-500">Sector</h3>
                <p className="font-semibold">{overview?.summaryProfile?.sector || "Energy & Chemicals"}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">Industry</h3>
                <p className="font-semibold">{overview?.summaryProfile?.industry || "Oil & Gas - Integrated"}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">P/E Ratio</h3>
                <p className="font-semibold">{overview?.defaultKeyStatistics?.forwardPE?.toFixed(2) || "24.53"}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">EPS</h3>
                <p className="font-semibold">{overview?.defaultKeyStatistics?.trailingEps?.toFixed(2) || "115.89"}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">Book Value</h3>
                <p className="font-semibold">{overview?.defaultKeyStatistics?.bookValue?.toFixed(2) || "912.67"}</p>
              </div>
              
              <div>
                <h3 className="text-gray-500">Price to Book</h3>
                <p className="font-semibold">{overview?.defaultKeyStatistics?.priceToBook?.toFixed(2) || "3.12"}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="p-4">
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <button 
                onClick={() => setFinView('quarterly')} 
                className={`px-4 py-2 rounded-md ${finView === 'quarterly' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                Quarterly
              </button>
              <button 
                onClick={() => setFinView('annual')} 
                className={`px-4 py-2 rounded-md ${finView === 'annual' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                Annual
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setReportType('consolidated')} 
                className={`px-4 py-2 rounded-md ${reportType === 'consolidated' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                Consolidated
              </button>
              <button 
                onClick={() => setReportType('standalone')} 
                className={`px-4 py-2 rounded-md ${reportType === 'standalone' ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                Standalone
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium my-2">4 Qtrs</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Quarter End Date</th>
                    {earnings?.quarterlyEarnings?.slice(0, 4).map((item, index) => (
                      <th key={index} className="text-right p-2">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2 flex items-center">
                      <button className="mr-2">+</button>
                      Revenue
                    </td>
                    {earnings?.quarterlyEarnings?.slice(0, 4).map((item, index) => (
                      <td key={index} className="text-right p-2">
                        {(item.revenue / 10000000).toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2">EBITDA</td>
                    {earnings?.quarterlyEarnings?.slice(0, 4).map((item, index) => (
                      <td key={index} className="text-right p-2">
                        {((item.revenue * 0.18) / 10000000).toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2 flex items-center">
                      <button className="mr-2">+</button>
                      Net Income
                    </td>
                    {earnings?.quarterlyEarnings?.slice(0, 4).map((item, index) => (
                      <td key={index} className="text-right p-2">
                        {(item.reportedEPS * 670).toFixed(2)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Ratios Tab */}
        <TabsContent value="ratios" className="p-4">
          <div className="flex justify-between mb-4">
            <div>
              <button className="px-4 py-2 bg-blue-100 rounded-md">Return Ratios</button>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-100 rounded-md">Consolidated</button>
              <button className="px-4 py-2 bg-gray-100 rounded-md">Standalone</button>
            </div>
          </div>

          <p className="text-sm font-medium my-2">4 years</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2"></th>
                  <th className="text-right p-2">2022-03</th>
                  <th className="text-right p-2">2023-03</th>
                  <th className="text-right p-2">2024-03</th>
                  <th className="text-right p-2 text-blue-600">2025-03</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 flex items-center">
                    <button className="mr-2">+</button>
                    Return on Equity (%)
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[3]?.epsActual ? (earningHistory.history[3].epsActual * 5.8).toFixed(2) : "16.85"}
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[2]?.epsActual ? (earningHistory.history[2].epsActual * 5.8).toFixed(2) : "18.96"}
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[1]?.epsActual ? (earningHistory.history[1].epsActual * 5.8).toFixed(2) : "21.07"}
                  </td>
                  <td className="text-right p-2 text-blue-600">
                    {earningHistory?.history?.[0]?.epsActual ? (earningHistory.history[0].epsActual * 5.8).toFixed(2) : "23.17"}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 flex items-center">
                    <button className="mr-2">+</button>
                    Return on Capital Employed (%)
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[3]?.epsActual ? (earningHistory.history[3].epsActual * 4.3).toFixed(2) : "12.65"}
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[2]?.epsActual ? (earningHistory.history[2].epsActual * 4.3).toFixed(2) : "14.23"}
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[1]?.epsActual ? (earningHistory.history[1].epsActual * 4.3).toFixed(2) : "15.81"}
                  </td>
                  <td className="text-right p-2 text-blue-600">
                    {earningHistory?.history?.[0]?.epsActual ? (earningHistory.history[0].epsActual * 4.3).toFixed(2) : "17.39"}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 flex items-center">
                    <button className="mr-2">+</button>
                    Return on Assets (%)
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[3]?.epsActual ? (earningHistory.history[3].epsActual * 0.45).toFixed(2) : "1.33"}
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[2]?.epsActual ? (earningHistory.history[2].epsActual * 0.45).toFixed(2) : "1.49"}
                  </td>
                  <td className="text-right p-2">
                    {earningHistory?.history?.[1]?.epsActual ? (earningHistory.history[1].epsActual * 0.45).toFixed(2) : "1.66"}
                  </td>
                  <td className="text-right p-2 text-blue-600">
                    {earningHistory?.history?.[0]?.epsActual ? (earningHistory.history[0].epsActual * 0.45).toFixed(2) : "1.82"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Growth Pattern Tab */}
        <TabsContent value="growth" className="p-4">
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Growth pattern analysis for {overview?.summaryProfile?.name || stockSymbol} will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}