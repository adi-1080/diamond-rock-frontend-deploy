import React, { useState, useEffect } from "react";
import SidebarAndNavbar from "../../components/SidebarAndNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categories = [
  "Price Movers",
  "Volume Shockers",
  "52 Week High Low",
  "All Time High Low",
  "Most Visited",
];

const exchangeOptions = {
  "Argentina": ["BUE"],
  "Austria": ["VIE"],
  "Australia": ["ASX"],
  "Belgium": ["BRU"],
  "Brazil": ["SAO"],
  "Canada": ["CNQ", "NEO", "TOR", "VAN"],
  "Switzerland": ["EBS"],
  "Chile": ["SGO"],
  "China": ["SHH", "SHZ"],
  "Colombia": ["BVC"],
  "Czech Republic": ["PRA"],
  "Germany": ["BER", "DUS", "FRA", "GER", "HAM", "MUN", "STU"],
  "Denmark": ["CPH"],
  "Estonia": ["TAL"],
  "Egypt": ["CAI"],
  "Spain": ["MCE"],
  "Finland": ["HEL"],
  "France": ["PAR"],
  "UK": ["AQS", "IOB", "LSE"],
  "Greece": ["ATH"],
  "Hong Kong": ["HKG"],
  "Hungary": ["BUD"],
  "Indonesia": ["JKT"],
  "Ireland": ["ISE"],
  "Israel": ["TLV"],
  "India": ["BSE", "NSI"],
  "Iceland": ["ICE"],
  "Italy": ["MIL"],
  "Japan": ["FKA", "JPX", "SAP"],
  "South Korea": ["KOE", "KSC"],
  "Kuwait": ["KUW"],
  "Sri Lanka": ["LKA"],
  "Lithuania": ["LIT"],
  "Latvia": ["RIS"],
  "Mexico": ["MEX"],
  "Malaysia": ["KLS"],
  "Netherlands": ["AMS"],
  "Norway": ["OSL"],
  "New Zealand": ["NZE"],
  "Peru": ["LIM"],
  "Philippines": ["PHP", "PHS"],
  "Poland": ["WSE"],
  "Portugal": ["LIS"],
  "Qatar": ["DOH"],
  "Romania": ["BVB"],
  "Russia": ["MIS"],
  "Saudi Arabia": ["SAU"],
  "Sweden": ["STO"],
  "Singapore": ["SES"],
  "Thailand": ["SET"],
  "Turkey": ["IST"],
  "Taiwan": ["TAI", "TWO"],
  "USA": ["ASE", "BTS", "CXI", "NCM", "NGM", "NMS", "NYQ", "OEM", "OQB", "OQX", "PCX", "PNK", "YHD"],
  "Venezuela": ["CCS"],
  "South Africa": ["JNB"]
};

const API_MAP = {
  "Price Movers": {
    gainers: "https://diamond-rock-django-backend1.onrender.com/api/get_top_gainers",
    losers: "https://diamond-rock-django-backend1.onrender.com/api/get_top_losers"
  },
  "Volume Shockers": (exchanges) => 
    `https://diamond-rock-django-backend1.onrender.com/api/screener/volume_shockers?${exchanges.map(ex => `exchange=${ex}`).join('&')}&volume_ratio=3&sortField=dayvolume&sortAsc=false`,
  "52 Week High Low": {
    gainers: "https://diamond-rock-django-backend1.onrender.com/api/get_52week_gainers",
    losers: "https://diamond-rock-django-backend1.onrender.com/api/get_52week_losers"
  },
  "All Time High Low": {
    gainers: "https://diamond-rock-django-backend1.onrender.com/api/screener/day_gainers?percent_change=4&region=us&market_cap=2000000000&price=5&volume=15000&sortField=percentchange&sortAsc=false",
    losers: "https://diamond-rock-django-backend1.onrender.com/api/screener/day_losers?percent_change=4&region=us&market_cap=2000000000&price=5&volume=15000&sortField=percentchange&sortAsc=true"
  },
  "Most Visited": {
    gainers: "https://diamond-rock-django-backend1.onrender.com/api/screener/day_gainers?percent_change=4&region=us&market_cap=2000000000&price=5&volume=15000&sortField=percentchange&sortAsc=false",
    losers: "https://diamond-rock-django-backend1.onrender.com/api/screener/day_losers?percent_change=4&region=us&market_cap=2000000000&price=5&volume=15000&sortField=percentchange&sortAsc=true"
  }
};

export function GlobalTrendingStocks() {
  const [view, setView] = useState("gainers");
  const [activeTab, setActiveTab] = useState("Price Movers");
  const [stocksData, setStocksData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedExchanges, setSelectedExchanges] = useState(["BSE", "NSI"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        setLoading(true);
        let apiUrl;
        
        if (activeTab === "Volume Shockers") {
          apiUrl = API_MAP[activeTab](selectedExchanges);
        } else {
          apiUrl = API_MAP[activeTab][view];
        }

        const response = await axios.get(apiUrl);
        
        let stocksArray = [];
        
        if (activeTab === "52 Week High Low" || activeTab === "Price Movers") {
          stocksArray = response.data || [];
        } else {
          stocksArray = response.data.quotes || response.data || [];
        }

        setStocksData(prev => ({
          ...prev,
          [activeTab]: {
            ...prev[activeTab],
            [activeTab === "Volume Shockers" ? "volumeShockers" : view]: {
              fullData: Array.isArray(stocksArray) ? stocksArray : [],
              top10Data: Array.isArray(stocksArray) ? stocksArray.slice(0, 10) : []
            }
          }
        }));
      } catch (err) {
        setError(err.message);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocksData();
  }, [activeTab, view, selectedExchanges]);

  const transformStockData = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];
    
    return apiData.map((stock, index) => {
      let price, change, changePercent, symbol, name;
      
      if (activeTab === "52 Week High Low" || activeTab === "Price Movers") {
        price = parseFloat(stock.Price) || 0;
        change = parseFloat(stock.Change) || 0;
        changePercent = parseFloat(stock["Change %"].replace(/[()%]/g, '')) || 0;
        symbol = stock.Symbol || `STOCK-${index}`;
        name = stock.Name || symbol;
      } else {
        price = stock.regularMarketPrice || stock.price || 0;
        change = stock.regularMarketChange || stock.change || 0;
        changePercent = stock.regularMarketChangePercent || stock.changePercent || 0;
        symbol = stock.symbol || stock.ticker || `STOCK-${index}`;
        name = stock.longName || stock.shortName || stock.companyName || symbol;
      }

      const isPositive = change >= 0;

      return {
        logo: symbol.split('.')[0],
        name: name,
        sector: stock.fullExchangeName || stock.exchange || stock.sector || "General",
        ltp: price.toFixed(2),
        change: isPositive ? `+${change.toFixed(2)}` : change.toFixed(2),
        changePercent: changePercent.toFixed(2),
        isPositive
      };
    });
  };

  const getDisplayData = () => {
    const data = stocksData[activeTab]?.[activeTab === "Volume Shockers" ? "volumeShockers" : view];
    if (!data) return [];
    return showAll ? data.fullData : data.top10Data;
  };

  const handleExchangeChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedExchanges(selected);
  };

  return (
    <SidebarAndNavbar defaultActiveMainMenu="globalMarket">
      <div className="shadow-lg h-auto p-6 pb-2 bg-gray-100 rounded-t-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-medium text-2xl">Global Trending Stocks</h2>
        </div>

        <nav className="border-b mb-6">
          <div className="flex gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`pb-4 px-1 relative ${
                  activeTab === category
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {category}
                {activeTab === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="shadow-lg h-auto p-6 pb-2 bg-white rounded-b-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </span>
          {activeTab !== "Volume Shockers" ? (
            <div className="ml-auto flex bg-gray-100 rounded-lg">
              <button
                className={`px-4 m-1 py-1 rounded ${
                  view === "gainers" ? "bg-white shadow-sm" : "bg-gray-100"
                }`}
                onClick={() => setView("gainers")}
              >
                Gainers
              </button>
              <button
                className={`px-4 m-1 py-1 rounded ${
                  view === "losers" ? "bg-white shadow-sm" : "bg-gray-100"
                }`}
                onClick={() => setView("losers")}
              >
                Losers
              </button>
            </div>
          ) : (
            <div className="ml-auto">
              <select
                multiple
                value={selectedExchanges}
                onChange={handleExchangeChange}
                className="bg-gray-100 rounded-lg px-4 py-1 border border-gray-300"
              >
                {Object.entries(exchangeOptions).map(([country, exchanges]) => (
                  <optgroup key={country} label={country}>
                    {exchanges.map(exchange => (
                      <option key={exchange} value={exchange}>{exchange}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            Error loading data: {error}
          </div>
        ) : (
          <div className="overflow-y-auto bg-white rounded-lg p-0">
            <table className="w-full text-s">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    LTP
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Chg
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Chg%
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {transformStockData(getDisplayData()).map((stock, index) => (
                  <tr 
                    key={`${stock.logo}-${index}`}
                    onClick={() => navigate(`/stock/${stock.logo}/prices`)} 
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-8 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-[14px] font-medium">
                          {stock.logo}
                        </div>
                        <div>
                          <div className="text-sm text-gray-700 font-light text-black">
                            {stock.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {stock.sector}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">{stock.ltp}</td>
                    <td
                      className={`px-6 py-4 text-right ${
                        stock.isPositive ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {stock.change}
                    </td>
                    <td
                      className={`px-6 py-4 text-right ${
                        stock.isPositive ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {stock.isPositive ? "▲" : "▼"}
                      {stock.changePercent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && !error && stocksData[activeTab]?.[activeTab === "Volume Shockers" ? "volumeShockers" : view]?.fullData?.length > 10 && (
              <div className="flex justify-center py-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                >
                  {showAll ? "Show Less" : "Show All"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </SidebarAndNavbar>
  );
}