import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Settings } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { fetchStockScreenerOptions, fetchStockScreenerOverviewApiData, setOption } from '../redux/slice/stockScreenerOverviewApiSlice';
import { FilterModal } from './FilterModal';

const COLUMN_CONFIG = {
    Overview: [
        { key: 'currentPrice', label: 'PRICE' },
        { key: 'marketCap', label: 'MKT CAP' },
        { key: 'recommendationKey', label: 'Technical Rating' },
        { key: 'regularMarketChange', label: 'Change' },
        { key: 'regularMarketChangePercent', label: 'Change %' },
        { key: 'volume', label: 'Volume' },
        { key: 'sector', label: 'Sector' },
        { key: 'fullTimeEmployees', label: 'Employees' },
        { key: 'epsTrailingTwelveMonths', label: 'EPS (TTM)' },
        { key: 'volXPrice', label: 'Vol x Price' },
        { key: 'pIe', label: 'P/E' },
    ],
    Valuation: [
        { key: 'currentPrice', label: 'PRICE' },
        { key: 'marketCap', label: 'MKT CAP' },
        { key: 'pIe', label: 'P/E' },
        { key: 'priceToRevenue', label: 'Price/Rev' },
        { key: 'epsTrailingTwelveMonths', label: 'EPS (TTM)' },
        { key: 'enterpriseToEbitda', label: 'EV/EBITDA' },
        { key: 'enterpriseValue', label: 'EV' },
        { key: 'shares', label: 'Shares' },
    ],
    Dividends: [
        { key: 'currentPrice', label: 'PRICE' },
        { key: 'dividendYield', label: 'Div Yield' },
        { key: 'divPerShare', label: 'Div Per Share' },
        { key: 'divPaid', label: 'Div Paid' },
    ],
    Margins: [
        { key: 'grossMargins', label: 'Gross Margins' },
        { key: 'operatingMargins', label: 'Operating Margins' },
        { key: 'ebitdaMargins', label: 'EBITDA Margins' },
        { key: 'profitMargins', label: 'Profit Margins' },
    ],
    IncomeStatement: [
        { key: 'epsTrailingTwelveMonths', label: 'EPS (TTM)' },
        { key: 'enterpriseToEbitda', label: 'EBITDA' },
        { key: 'grossProfits', label: 'Gross Profit' },
        { key: 'totalRevenue', label: 'Revenue' },
        { key: 'income', label: 'Income' },
    ],
    BalanceSheet: [
        { key: 'currentRatio', label: 'Current Ratio' },
        { key: 'debtToEquity', label: 'Debt to Equity' },
        { key: 'totalDebt', label: 'Total Debt' },
        { key: 'quickRatio', label: 'Quick Ratio' },
    ],
};




export function StockScreener() {
    const dispatch = useDispatch();
    const [sortField, setSortField] = useState('ticker');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [type, setType] = useState("default");
    const [loading, setLoading] = useState(true);
   
    const stockTableApiData = useSelector(state => state.stockScreenerOverviewApiData.data) || [];
    const screenerOptionData = useSelector(state => state.stockScreenerOverviewApiData.optionData) || [];
 
    const mainButtons = ['Overview', 'Dividends', 'Valuation'];
    const dropdownOptions = [
        'Margins',
        'IncomeStatement',
        'BalanceSheet',
    ];
    const screenerType = [
        "most_capitalized",
        "day_gainers",
        "day_losers",
        "aggressive_small_caps",
        "volume_shockers",
        "growth_stocks",
        "most_actives",
        "most_shorted_stocks",
        "small_cap_gainers",
        "undervalued_growth_stocks",
        "undervalued_large_caps",
    ];

    useEffect(() => {
        if (type) {
            dispatch(setOption(type));
            dispatch(fetchStockScreenerOptions());
        }
    }, [type]);

    useEffect(() => {
        dispatch(fetchStockScreenerOverviewApiData());
        setLoading(false);
    }, [dispatch]);

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const stockData = stockTableApiData["fetched"] ? Object.entries(stockTableApiData["fetched"]).map(([ticker, stock]) => ({
        ticker,
        companyName: stock.companyName || "-",
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
        priceToRevenue: parseFloat(stock.currentPrice) / parseFloat(stock.revenuePerShare) || "-",
        enterpriseToEbitda: stock.enterpriseToEbitda || "-",
        enterpriseValue: stock.enterpriseValue || "-",
        shares: stock.shares || "-",
        dividendYield: stock.dividendYield || "-",
        divPerShare: parseFloat(stock.dividendYield) * parseFloat(stock.currentPrice) || "-",
        divPaid: parseFloat(stock.dividendYield) * parseFloat(stock.currentPrice) * parseFloat(stock.shares) || "-",
        grossMargins: stock.grossMargins || "-",
        operatingMargins: stock.operatingMargins || "-",
        ebitdaMargins: stock.ebitdaMargins || "-",
        profitMargins: stock.profitMargins || "-",
        income: stock.income || "-",
        totalRevenue: stock.totalRevenue || "-",
        grossProfits: stock.grossProfits || "-",
        currentRatio: stock.currentRatio || "-",
        debtToEquity: stock.debtToEquity || "-",
        ebitda: stock.ebitda || "-",
        quickRatio: stock.quickRatio || "-",
        totalDebt: stock.totalDebt || "-",
    })) : [];
    const optionStockData = screenerOptionData['quotes']
    ? screenerOptionData['quotes']
          .map((stock) => ({
              ticker: stock.symbol || "-",
              companyName: stock.shortName || "-",
              currentPrice: stock.regularMarketPrice  || "-",
              marketCap: stock.marketCap || "-",
              recommendationKey: stock.recommendationKey || "-",
              regularMarketChange: stock.regularMarketChange || "-",
              regularMarketChangePercent: stock.regularMarketChangePercent || "-",
              volume: stock.regularMarketVolume || "-",
              sector: stock.sector || "-",
              fullTimeEmployees: stock.fullTimeEmployees || "-",
              epsTrailingTwelveMonths: stock.epsTrailingTwelveMonths || "-",
              volXPrice: parseFloat(stock.regularMarketVolume) * parseFloat(stock.regularMarketPrice) || "-",
              pIe: parseFloat(stock.regularMarketPrice) / parseFloat(stock.epsTrailingTwelveMonths) || "-",
              priceToRevenue: parseFloat(stock.currentPrice) / parseFloat(stock.revenuePerShare) || "-",
              enterpriseToEbitda: stock.enterpriseToEbitda || "-",
              enterpriseValue: stock.enterpriseValue || "-",
              shares: stock.sharesOutstanding || "-",
              dividendYield: stock.dividendYield || "-",
              divPerShare: parseFloat(stock.dividendYield) * parseFloat(stock.currentPrice) || "-",
              divPaid: parseFloat(stock.dividendYield) * parseFloat(stock.currentPrice) * parseFloat(stock.shares) || "-",
              grossMargins: stock.grossMargins || "-",
              operatingMargins: stock.operatingMargins || "-",
              ebitdaMargins: stock.ebitdaMargins || "-",
              profitMargins: stock.profitMargins || "-",
              income: stock.income || "-",
              totalRevenue: stock.totalRevenue || "-",
              grossProfits: stock.grossProfits || "-",
              currentRatio: stock.currentRatio || "-",
              debtToEquity: stock.debtToEquity || "-",
              ebitda: stock.ebitda || "-",
              quickRatio: stock.quickRatio || "-",
              totalDebt: stock.totalDebt || "-",
          }))
    : [];

    //    console.log(stockData)

    const activeStockData = type === "default" || !type ? stockData : optionStockData;

    const filteredStocks =activeStockData.filter(stock =>
        stock.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedStocks = [...filteredStocks].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        return sortDirection === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });

    const formatNumber = (num, decimals = 2) => {
        if (num >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
        return num.toFixed(decimals);
    };
   
    const handleScreenerChange = (selectedScreener) => {
        if(selectedScreener != "most_capitalized"){
            setType(selectedScreener);
            console.log("Selected Screener:", selectedScreener);
        }
        else{
            setType("default");
        } 
    };

 
    return (
        <div>
            {/* Filters Section */}
            <div className="mb-2 pt-1 flex justify-center z-[1]">
                <div className="flex items-center gap-2 my-2">
                    <select
                        className="bg-white-800 text-gray-500 p-2 border border-gray-150 rounded"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                    >
                        {mainButtons.concat(dropdownOptions).map((button) => (
                            <option key={button} value={button}>
                                {button}
                            </option>
                        ))}
                    </select>


                    {/* Main Buttons */}
                    {mainButtons.map((button) => (
                        <button
                            key={button}
                            className={`px-4 py-2 ${activeTab === button ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-500'
                                } hover:bg-gray-300`}
                            onClick={() => setActiveTab(button)}
                        >
                            {button}
                        </button>
                    ))}
                    <div className="relative">
                        <button
                            className="px-3 py-2 bg-gray-100 text-black hover:bg-gray-300 flex items-center gap-2"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                                {dropdownOptions.map((option) => (
                                    <button
                                        key={option}
                                        className="w-full px-4 py-2 text-left bg-white text-black hover:bg-gray-300"
                                        onClick={() => {
                                            setActiveTab(option);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <select className="bg-white-800 text-gray-500 p-1 border border-gray-150 focus:outline-none">
                        <option value="all">All Markets</option>
                        <option value="nasdaq">NASDAQ</option>
                        <option value="nyse">NYSE</option>
                    </select>
                    <select className="bg-white-800 text-gray-500 px-2 py-2 rounded border border-gray-150">
                        <option>1W</option>
                        <option>1M</option>
                        <option>3M</option>
                        <option>1Y</option>
                    </select>
                    <div className="flex items-center space-x-2">
                        <select className="bg-white-800 text-gray-500 px-2 py-1 rounded border border-gray-150">
                            <option>Financials in: USD</option>
                            <option>INR</option>
                        </select>
                    </div>
                    <div className="flex gap-0">
                        <select
                            className="bg-white text-gray-500 px-2 py-1 border border-gray-200"
                            onChange={(e) => {
                                handleScreenerChange(e.target.value);    
                            }}
                        >
                            {screenerType.map((screener) => (
                                <option
                                    className="w-full px-4 py-2 text-left bg-white text-black hover:bg-gray-300"
                                    key={screener}
                                    value={screener}
                                >
                                  {screener.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setIsModalOpen(true)} className="bg-gray-500 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2">Filters <Settings className="h-4 w-4" /></button>
                    </div>

                </div>
            </div>
            <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Stock Table Section */}
            <div className="overflow-auto bg-white-900 rounded-lg max-h-[70vh] scroll-custom border">
                {loading ? (
                    <div className="flex justify-center items-center h-[70vh]">
                        <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-transparent rounded-full"></div>
                        <span className="ml-2 text-gray-400">Loading...</span>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left text-white-200 border max-w-full">
                        <thead className="text-xs uppercase bg-white-800">
                            <tr>
                                <th className="px-4 py-3 text-xs border border-gray-200 flex items-center">
                                    TICKER
                                    <input
                                        type="text"
                                        placeholder="Search.."
                                        className="px-2 py-2 bg-white-800 text-gray-500 rounded-sm border border-gray-300 focus:outline-none w-40 ml-2"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </th>
                                {COLUMN_CONFIG[activeTab].map(({ key, label }) => (
                                    <th key={key} className="px-4 py-3 cursor-pointer hover:bg-white-700 border border-gray-200" onClick={() => handleSort(key)}>
                                        <div className="flex items-center gap-1 text-xs">
                                            {label} <ArrowUpDown className="h-4 w-4" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(sortedStocks).map(([ticker, stock]) => (
                                <tr key={stock.ticker} className="border-b border-gray-200 hover:bg-white-800">
                                    <td className="px-4 py-3 text-sm">{stock.ticker}</td>
                                    {COLUMN_CONFIG[activeTab].map(({ key }) => (
                                        <td key={key} className="px-4 py-3 text-sm">
                                            {typeof stock[key] === "number" ? formatNumber(stock[key]) : stock[key] || "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}