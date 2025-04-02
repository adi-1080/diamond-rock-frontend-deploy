import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BarChart2,
  Settings2,
  Clock,
  Plus,
  MoreHorizontal,
  Grid,
  Edit3,
  X,
  Share2,
  DollarSign,
  ChartPie
} from 'lucide-react';
import SeasonalChart from './SeasonalChart';
import { useDispatch, useSelector } from "react-redux";
import { fetchPerformanceApiData } from "../redux/slice/performanceApiSlice";
import { fetchWatchlistApiData } from '../redux/slice/watchlistApiSlice';
import WatchlistModal from './WatchlistModal';
import SearchModal from './SearchModal';
import axios from 'axios';


const symboltoName={
  "RELIANCE.NS":"Reliance ",
  "TCS.NS":"TCS",
  "ADANIPOWER.NS":"Adani Power",
  "^NSEBANK":"Nifty Bank",
  "^NSEI":"Nifty 50",
  "^BSESN":"Sensex"
}
const seasonalData = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 2.5 },
  { month: 'Mar', value: -1.2 },
  { month: 'Apr', value: 3.8 },
  { month: 'May', value: 1.5 },
  { month: 'Jun', value: -2.1 },
  { month: 'Jul', value: 4.2 },
  { month: 'Aug', value: 3.1 },
  { month: 'Sep', value: -3.5 },
  { month: 'Oct', value: 2.8 },
  { month: 'Nov', value: 5.2 },
  { month: 'Dec', value: 4.1 },
];

const WatchlistPanel = () => {
  const dispatch = useDispatch();
  const ticker = useSelector((state) => state.innerChartApiData.ticker);
  const tickers = ["RELIANCE.NS", "TCS.NS", "ADANIPOWER.NS","^NSEBANK", "^NSEI", "^BSESN"];
  const [indexTickers, setIndexTickers]= useState(["^NSEBANK", "^NSEI", "^BSESN"]);
  const [stockTickers, setStockTickers] = useState(["RELIANCE.NS", "TCS.NS", "ADANIPOWER.NS"]);
  const [cryptoTickers, setCryptoTickers] = useState(["BTC-USD", "ETH-USD", "BNB-USD"]);
  const [futureTickers, setFutureTickers] = useState(["GC=F", "SI=F", "MHG=F"]);
  const [forexTickers, setForexTickers] = useState(["EURUSD=X", "GBPUSD=X", "USDJPY=X", "AUDUSD=X"])


  const tickerDetails = useSelector((state) => state.innerChartApiData.tickerDetails);
  const [showIndices, setShowIndices] = useState(true);
  const [showStocks, setShowStocks] = useState(true);
  const [showCryptos, setShowCryptos] = useState(true);
  const [showFutures, setShowFutures] = useState(true);
  const [showForex, setShowForex] = useState(true);

  const [showSeasonals, setShowSeasonals] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState('BANKNIFTY');
  const [isModalOpen, setIsModalOpen] = useState(false);
   
  const [shareEnabled, setShareEnabled] = useState(false);

  const [price, setPrice] = useState(0);
  const [weeklychangePercent, setWeeklychangepercent] = useState(0);
  const [monthlychangePercent, setMonthlychangepercent] = useState(0);
  const [threemonthschangePercent, setThreemonthschangepercent] = useState(0);
  const [sixmonthschangePercent, setSixmonthschangepercent] = useState(0);
  const [ytdchangePercent, setYtdchangepercent] = useState(12.47);
  const [yearlychangePercent, setYearlychangepercent] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const performanceData = useSelector(state => state.performanceData.data) || [];
  const watchlistApiData = useSelector(state => state.watchlistApiData.data) || [];
 
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState([]);
  
  const [stockWatchlist, setStockWatchlist] = useState([]);
  const [indexWatchlist, setIndexWatchlist] = useState([]);
  const [cryptoWatchlist, setCryptoWatchlist] = useState([]);
  const [futureWatchlist, setFutureWatchlist] = useState([]);
  const [forexWatchlist, setForexWatchlist] = useState([]);
  
   const [isLoadingStocks, setIsLoadingStocks] = useState(true);
  const [isLoadingIndices, setIsLoadingIndices] = useState(true);
  const [isLoadingCrypto, setIsLoadingCrypto] = useState(true);
  const [isLoadingFutures, setIsLoadingFutures] = useState(true);
  const [isLoadingForex, setIsLoadingForex] = useState(true);

 
  async function fetchTickerStats(match) {
    try {
      const response = await fetch(
        `https://diamond-rock-django-backend1.onrender.com/api/get_price/${match}/`  
      );
      const data = await response.json(); 
      return { status: "fulfilled", value: data };
    } catch (err) {
      console.error("Error fetching match stats:", err);
      return { status: "rejected", reason: err.message };
    }
  }

  async function fetchIndicesTickers() {
    if (indexTickers.length === 0) return;
  

    const results = await Promise.allSettled(indexTickers.map(fetchTickerStats));
    const fetchedData = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.value);
  
    setIndexWatchlist((prevData) => {
      return JSON.stringify(prevData) !== JSON.stringify(fetchedData) ? fetchedData : prevData;
    });

   
  }

  async function fetchStockTickers() {
    if (stockTickers.length === 0) return;  // Prevent unnecessary fetch
  
    
    const results = await Promise.allSettled(stockTickers.map(fetchTickerStats));
    const fetchedData = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.value);
  
    // Only update state if the fetched data is different
    setStockWatchlist((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(fetchedData)) {
        return fetchedData;
      }
      return prevData; // Prevent unnecessary re-renders
    });
   
  }
  async function fetchCryptoTickers() {
  if (cryptoTickers.length === 0) return;
  
  const results = await Promise.allSettled(cryptoTickers.map(fetchTickerStats));
  const fetchedData = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.value);

  setCryptoWatchlist((prevData) => {
    return JSON.stringify(prevData) !== JSON.stringify(fetchedData) ? fetchedData : prevData;
  });

}

async function fetchFutureTickers() {
  if (futureTickers.length === 0) return;
  
  const results = await Promise.allSettled(futureTickers.map(fetchTickerStats));
  const fetchedData = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.value);

  setFutureWatchlist((prevData) => {
    return JSON.stringify(prevData) !== JSON.stringify(fetchedData) ? fetchedData : prevData;
  });

  
}

async function fetchForexTickers() {
  if (forexTickers.length === 0) return;
 
  const results = await Promise.allSettled(forexTickers.map(fetchTickerStats));
  const fetchedData = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.value);

  setForexWatchlist((prevData) => {
    return JSON.stringify(prevData) !== JSON.stringify(fetchedData) ? fetchedData : prevData;
  });

  
}



  //Use useEffect to fetch performance data when ticker changes
  useEffect(() => {
    dispatch(fetchPerformanceApiData());
  }, [ticker]);

  

  // Use useEffect to update price only when performanceData changes
  useEffect(() => {
    if (performanceData.length > 0) {
      const lastData = performanceData[performanceData.length - 1] || 1;
      const secondLastData = performanceData[performanceData.length - 2]  || 1;
      const weekData = performanceData[performanceData.length - 6]  || 1;
      const monthData = performanceData[performanceData.length - 31]  || 1;
      const threemonthsData = performanceData[performanceData.length - 91]  || 1;
      const sixmonthsData = performanceData[performanceData.length - 182]  || 1;
      const currentYear = new Date().getFullYear();
      const ytdData = performanceData.find(data => data.Date.split(' ')[0] === `${currentYear}-01-01`);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const yearlyData = performanceData[0]  || 1;
      setPrice(lastData.Close.toFixed(2));
      setPriceChange((lastData.Close - secondLastData.Close).toFixed(2));
      setPriceChangePercent(((lastData.Close - secondLastData.Close) / secondLastData.Close * 100).toFixed(2));
      setWeeklychangepercent(((lastData.Close - weekData.Open) / weekData.Open * 100).toFixed(2));
      setMonthlychangepercent(((lastData.Close - monthData.Close) / monthData.Close * 100).toFixed(2));
      setThreemonthschangepercent(((lastData.Close - threemonthsData.Close) / threemonthsData.Close * 100).toFixed(2));
      setSixmonthschangepercent(((lastData.Close - sixmonthsData.Close) / sixmonthsData.Close * 100).toFixed(2));
      // setYtdchangepercent(((lastData.Close - ytdData.Close) / ytdData.Close * 100).toFixed(2));
      setYearlychangepercent(((lastData.Close - yearlyData.Close) / yearlyData.Close * 100).toFixed(2));
    }
  }, [performanceData]);

  useEffect(() => {
    if (stockTickers.length > 0 ) {
      setIsLoadingStocks(true);
      Promise.all([
        fetchStockTickers().then(() => setIsLoadingStocks(false)),
      ]);

    }
  }, [stockTickers]);

  useEffect(() => {
    if (indexTickers.length > 0 ) {
    
      setIsLoadingIndices(true);
      Promise.all([
        fetchIndicesTickers().then(() => setIsLoadingIndices(false)),
      ]);

    }
  }, [indexTickers]);

  useEffect(() => {
    if (cryptoTickers.length > 0) {
   
      setIsLoadingCrypto(true);
  
      Promise.all([
      
        fetchCryptoTickers().then(() => setIsLoadingCrypto(false)),
      
      ]);
    }
  }, [ cryptoTickers]);

  useEffect(() => {
    if (futureTickers.length > 0 ) {
    
      setIsLoadingFutures(true);

      Promise.all([
       
        fetchFutureTickers().then(() => setIsLoadingFutures(false)),
       
      ]);

    }
  }, [futureTickers]);

  useEffect(() => {
    if (forexTickers.length > 0) {
      setIsLoadingForex(true);
      Promise.all([
        
        fetchForexTickers().then(() => setIsLoadingForex(false)),
      ]);

    }
  }, [forexTickers]);


//   useEffect(() => {
//     if (watchlistFetch.length > 0)
//     {
//       console.log(watchlistFetch)      
//         //  watchlistFetch.map((item) => {
//         //   console.log(item)
//         //  })
//     }
// }, [watchlistFetch])
   const newstockData = stockWatchlist.length > 0 ? stockWatchlist.map(symbol => {
   const ticker = Object.keys(symbol)
   return {
    symbol:symbol[ticker].symbol,
        name:symbol[ticker].shortName,
      last: symbol[ticker].regularMarketPrice
      ,
      change: symbol[ticker].regularMarketChange,
      changePercent: symbol[ticker].regularMarketChangePercent,
      type:symbol[ticker].quoteType,
      currencySymbol:symbol[ticker].currencySymbol

   }
  }) : [];
  const newindexData = indexWatchlist.length > 0 ? indexWatchlist.map(symbol => {
    const ticker = Object.keys(symbol)
    return {
      symbol:symbol[ticker].symbol,
        name:symbol[ticker].shortName,
       last: symbol[ticker].regularMarketPrice
       ,
       change: symbol[ticker].regularMarketChange,
       changePercent: symbol[ticker].regularMarketChangePercent,
       type:symbol[ticker].quoteType,
       currencySymbol:symbol[ticker].currencySymbol
    }
   }) : [];
   const newcryptoData = cryptoWatchlist.length > 0 ? cryptoWatchlist.map(symbol => {
    const ticker = Object.keys(symbol)
    return {
       symbol:symbol[ticker].symbol,
        name:symbol[ticker].shortName,
       last: symbol[ticker].regularMarketPrice
       ,
       change: symbol[ticker].regularMarketChange,
       changePercent: symbol[ticker].regularMarketChangePercent,
       type:symbol[ticker].quoteType,
       currencySymbol:symbol[ticker].currencySymbol
 
    }
   }) : [];
    const newfutureData = futureWatchlist.length > 0 ? futureWatchlist.map(symbol => {
      const ticker = Object.keys(symbol)
      // console.log(symbol)
      return {
       symbol:symbol[ticker].symbol,
        name:symbol[ticker].shortName,
        last: symbol[ticker].regularMarketPrice
        ,
        change: symbol[ticker].regularMarketChange,
        changePercent: symbol[ticker].regularMarketChangePercent,
        type:symbol[ticker].quoteType,
        currencySymbol:symbol[ticker].currencySymbol
  
      }
    }) : [];
    const newforexData = forexWatchlist.length > 0 ? forexWatchlist.map(symbol => {
      const ticker = Object.keys(symbol)
      return {
        symbol:symbol[ticker].symbol,
        name:symbol[ticker].shortName,
        last: symbol[ticker].regularMarketPrice,
        change: symbol[ticker].regularMarketChange,
        changePercent: symbol[ticker].regularMarketChangePercent,
        type:symbol[ticker].quoteType,
        currencySymbol:symbol[ticker].currencySymbol
  
      }
    }) : [];
    
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col rounded-tl" style={{ height: '100%' }}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-md font-semibold flex items-center gap-2">
            Watchlist
          </h2>
          <div className="flex items-center gap-2">
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              <ChartPie className="w-5 h-5" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => setIsSearchModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
        
          <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        stockTickers={stockTickers}
        setStockTickers = {setStockTickers}
        indexTickers={indexTickers}
        futureTickers={futureTickers}
        cryptoTickers={cryptoTickers}
        forexTickers={forexTickers}
        setIndexTickers ={setIndexTickers}
        setFutureTickers ={setFutureTickers}
        setCryptoTickers  = {setCryptoTickers}
        setForexTickers = {setForexTickers}
      />
        <div className="grid grid-cols-4 text-xs text-gray-500">
          <div>Symbol</div>
          <div className="text-right">Last</div>
          <div className="text-right">Chg</div>
          <div className="text-right">Chg%</div>
        </div>
      </div>

      

      {/* Modal */}
      {isModalOpen && (
        <WatchlistModal 
        isModalOpen={isModalOpen} 
        isSearchModalOpen={isSearchModalOpen}
        onSearchClose = {()=> setIsSearchModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
        stockData={newstockData}
        indexData={newindexData}
        cryptoData={newcryptoData}
        forexData={newforexData}
        futureData={newfutureData} />    
      )}

      {/* Watchlist Content */}
      <div className="flex-1 overflow-auto scroll-custom">
        {/* Selected Symbol Info */}

        {/* Indices Section */}
        <div>
          <button
            onClick={() => setShowIndices(!showIndices)}
            className="w-full px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-between hover:bg-gray-100"
          >
            <span>INDICES</span>
            {showIndices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showIndices && (
    isLoadingIndices ? (
      <div className="flex justify-center py-4 text-gray-500 text-sm animate-pulse">
        Loading...
      </div>
    ) : (
      newindexData
        .filter((item) => item.type === "INDEX")
        .map((item) => (
          <div
            key={item.symbol}
            className="px-4 py-2 hover:bg-gray-50 grid grid-cols-4 items-center text-sm border-b border-gray-100 cursor-pointer"
            onClick={() => setSelectedSymbol(item.name)}
          >
            <div className="font-medium" style={{ fontSize: "0.9em" }}>{String(item.name).toUpperCase()}</div>
            <div className="text-right">{item.currencySymbol}{item.last?.toLocaleString() ?? ""}</div>
            <div className={`text-right ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}
            </div>
            <div className={`text-right ${item.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
              {item.changePercent >= 0 ? "+" : ""}
              {item.changePercent.toFixed(2)}%
            </div>
          </div>
        ))
    )
  )}
        </div>

        {/* Stocks Section */}
        <div>
          <button
            onClick={() => setShowStocks(!showStocks)}
            className="w-full px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-between hover:bg-gray-100"
          >
            <span>STOCKS</span>
            {showStocks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showStocks && (
    isLoadingStocks ? (
      <div className="flex justify-center py-4 text-gray-500 text-sm animate-pulse">
        Loading...
      </div>
    ) : (
      newstockData
        .filter((item) => item.type === "EQUITY")
        .map((item) => (
          <div
            key={item.symbol}
            className="px-4 py-2 hover:bg-gray-50 grid grid-cols-4 items-center text-sm border-b border-gray-100 cursor-pointer"
            onClick={() => setSelectedSymbol(item.name)}
          >
            <div className="font-medium" style={{ fontSize: "0.9em" }}>{String(item.name).toUpperCase()}</div>
            <div className="text-right">{item.currencySymbol}{item.last?.toLocaleString() ?? ""}</div>
            <div className={`text-right ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}
            </div>
            <div className={`text-right ${item.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
              {item.changePercent >= 0 ? "+" : ""}
              {item.changePercent.toFixed(2)}%
            </div>
          </div>
        ))
    )
  )}
        </div>

      <div>
          <button
            onClick={() => setShowCryptos(!showCryptos)}
            className="w-full px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-between hover:bg-gray-100"
          >
            <span>CRYPTO</span>
            {showCryptos ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showCryptos && (isLoadingCrypto ? (
            <div className="flex justify-center py-4 text-gray-500 text-sm animate-pulse">
              Loading...
            </div>
          ) : (

           newcryptoData
              .filter((item) => item.type === 'CRYPTOCURRENCY')
              .map((item) => (
                <div
                  key={item.symbol}
                  className="px-4 py-2 hover:bg-gray-50 grid grid-cols-4 items-center text-sm border-b border-gray-100 cursor-pointer"
                  onClick={() => setSelectedSymbol(item.name)}
                >
                  <div className="font-medium" style={{"fontSize":"0.9em"}}>{String(item.name).toUpperCase()}</div>
                  <div className="text-right">{item.currencySymbol}{item.last == null? "":item.last.toLocaleString()}</div>
                  <div
                    className={`text-right ${item.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {item.change >= 0 ? '+' : ''}
                    {item.change.toFixed(2)}
                  </div>
                  <div
                    className={`text-right ${item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {item.changePercent >= 0 ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </div>
                </div>
              ))
              ))}
        </div>

        <div>
          <button
            onClick={() => setShowFutures(!showFutures)}
            className="w-full px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-between hover:bg-gray-100"
          >
            <span>FUTURES</span>
            {showFutures ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showFutures && (isLoadingFutures ? (
            <div className="flex justify-center py-4 text-gray-500 text-sm animate-pulse">
              Loading...
            </div>
          ) : (
           newfutureData
              .filter((item) => item.type === 'FUTURE')
              .map((item) => (
                <div
                  key={item.symbol}
                  className="px-4 py-2 hover:bg-gray-50 grid grid-cols-4 items-center text-sm border-b border-gray-100 cursor-pointer"
                  onClick={() => setSelectedSymbol(item.name)}
                >
                  <div className="font-medium" style={{"fontSize":"0.9em"}}>{String(item.name).toUpperCase()}</div>
                  <div className="text-right">{item.currencySymbol}{item.last == null? "":item.last.toLocaleString()}</div>
                  <div
                    className={`text-right ${item.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {item.change >= 0 ? '+' : ''}
                    {item.change.toFixed(2)}
                  </div>
                  <div
                    className={`text-right ${item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {item.changePercent >= 0 ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </div>
                </div>
              ))))}
        </div>

        <div>
          <button
            onClick={() => setShowForex(!showForex)}
            className="w-full px-4 py-2 bg-gray-50 text-xs font-medium text-gray-600 flex items-center justify-between hover:bg-gray-100"
          >
            <span>FOREX</span>
            {showForex ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showForex && (isLoadingForex ? (
            <div className="flex justify-center py-4 text-gray-500 text-sm animate-pulse">
              Loading...
            </div>
          ) : (

           newforexData
              .filter((item) => item.type === 'CURRENCY')
              .map((item) => (
                <div
                  key={item.symbol}
                  className="px-4 py-2 hover:bg-gray-50 grid grid-cols-4 items-center text-sm border-b border-gray-100 cursor-pointer"
                  onClick={() => setSelectedSymbol(item.name)}
                >
                  <div className="font-medium" style={{"fontSize":"0.9em"}}>{String(item.name).toUpperCase()}</div>
                  <div className="text-right">{item.currencySymbol}{item.last == null? "":item.last.toLocaleString()}</div>
                  <div
                    className={`text-right ${item.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {item.change >= 0 ? '+' : ''}
                    {item.change.toFixed(2)}
                  </div>
                  <div
                    className={`text-right ${item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {item.changePercent >= 0 ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </div>
                </div>
              ))))}
        </div>
        </div>
      {/* Performance Section */}
      <div>
        <div
          onClick={() => setShowSeasonals(!showSeasonals)}
          className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
        >
          <span className="text-md font-bold">Performance</span>
          <div className="flex gap-2 items-center">
            {showSeasonals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
        <div className={`border-t border-gray-200 ${showSeasonals ? "max-h-80" : "h-0"} overflow-y-auto transition-all duration-300 scroll-custom`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{ticker.split('.')[0]}</h3>
                <span className="text-xs text-gray-500">{tickerDetails.market} • Index</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  {/* <Grid className="w-4 h-4" /> */}
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  {/* <Edit3 className="w-4 h-4" /> */}
                </button>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₹{price}</span>
              <span className="text-sm" style={{ color: priceChange >= 0 ? '#10B981' : '#EF4444' }}>{priceChange > 0 ? '+' : ''}{priceChange} ({priceChange > 0 ? '+' : ''}{priceChangePercent}%)</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Last update at 15:29 GMT+5:30 • Market closed
            </div>
          </div>
          {showSeasonals && (
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
              {[
    { label: "1W", value: weeklychangePercent },
    { label: "1M", value: monthlychangePercent },
    { label: "3M", value: threemonthschangePercent },
    { label: "6M", value: sixmonthschangePercent },
    { label: "YTD", value: ytdchangePercent },
    { label: "1Y", value: yearlychangePercent },
  ].map(({ label, value }) => (
    <div
      key={label}
      className={`p-2 rounded ${
        value >= 0 ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-sm" style={{ color: value >= 0 ? "#10B981" : "#EF4444" }}>
        {value > 0 ? "+" : ""}
        {value}%
      </div>
    </div>
  ))}
              </div>
              {/* <div className="mt-4">
                <div className="text-sm font-medium mb-2">Seasonals</div>
                {/* <SeasonalChart /> 
                {/* <div className="flex justify-between text-xs text-gray-500 mt-1">
                    {seasonalData.filter((_, i) => i % 3 === 0).map((point) => (
                    <span key={point.month}>{point.month}</span>
                    ))}
                </div> 
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchlistPanel;