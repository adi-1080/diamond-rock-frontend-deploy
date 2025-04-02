import { Navigate, Route, Routes } from 'react-router-dom';

import ChartsHome from './Pages/ChartsHome';
import Home from './Pages/Home';
import MarketHome from './Pages/MarketHome';

import { TrendingStocks } from '../src/Pages/TrendingStocks/TrendingStocks.jsx';
import Deals from './Pages/Deals/Deals';
import IPOOuter from './Pages/IPO/IPOOuter.jsx';
import InvestorsInner from './Pages/Investors/InvestorsInner.jsx';
import InvestorsOuter from './Pages/Investors/InvestorsOuter.jsx';
import NewsUpdates from './Pages/NewsUpdates/NewsAndUpdatesPage.jsx';
import SMEZone from './Pages/SME/SMEZone.jsx';
import DiamondrockTut from './Pages/Tutorial/DiamondrockTut.jsx';
import Deliveries from './Pages/searchIndustries/Deliveries';


// Global Pages 👇
import GlobalStocksFinancials from './Pages/GlobalsPages/GlobalIndicesFinancials.jsx';
import GlobalIndicesOuter from './Pages/GlobalsPages/GlobalIndicesOuter.jsx';
import GlobalStocksFundamentals from './Pages/GlobalsPages/GlobalStocksFundamentals.jsx';
import GlobalStocksPrices from './Pages/GlobalsPages/GlobalStocksPrices.jsx';
import { GlobalTrendingStocks } from './Pages/GlobalsPages/GlobalTrendingStocks.jsx';

// Sectors Pages 👇
import SectorsInner from "./Pages/Sectors/SectorsInner";
import SectorsOuter from './Pages/Sectors/SectorsOuter';

// Stock Pages 👇
import SuperChartsInnerPage from './Pages/SuperChartsInnerPage';
import Delivery from './Pages/searchIndustries/delivery.jsx';
import Diamondreport from './Pages/searchIndustries/Diamondreport';
import Financials from './Pages/searchIndustries/Financials.jsx';
import Fundamentals from './Pages/searchIndustries/Fundamentals';
import Shareholding from './Pages/searchIndustries/ShareHolding.jsx';
import StockDetails from './Pages/searchIndustries/StockDetails';
import StockUpdates from './Pages/searchIndustries/StockUpdates.jsx';
import Technicals from './Pages/searchIndustries/Technicals.jsx';

// Indices Pages 👇
import DeliveriesPage from './Pages/Indices/DeliveriesPage';
import IndexBreadth from './Pages/Indices/IndexBeadth.jsx';
import IndicesFuturesOI from './Pages/Indices/IndicesFuturesOI.jsx';
import PricesPage from './Pages/Indices/PricesPage';
import Scans from './Pages/Indices/Scans';
import StocksPage from './Pages/Indices/StocksPage';
import TechnicalsPage from './Pages/Indices/TechnicalsPage';
import UpdatesPage from './Pages/Indices/UpdatesPage';
import IndicesPage from './Pages/IndicesPage';

// Analytics Pages 👇
import AnalyticsDiamondReports from "./Pages/Analytics/AnalyticsDiamondReports.jsx";
import AnalyticsPage from './Pages/Analytics/AnalyticsPage.jsx';
import AnalyticsHome from './Pages/Analytics/AnalyticsHome.jsx';
import AnalyticsScans from './Pages/Analytics/AnalyticsScans.jsx';
import BusinessHouses from "./Pages/Analytics/BusinessHouses.jsx";
import ChartPatterns from "./Pages/Analytics/ChartPatterns.jsx";
import CompanyFilings from "./Pages/Analytics/CompanyFilings.jsx";
import DiamondInsights from "./Pages/Analytics/DiamondInsights.jsx";
import FOZone from "./Pages/Analytics/FOZone.jsx";
import InvestmentIdeas from "./Pages/Analytics/InvestmentIdeas.jsx";
import InvestmentThemes from "./Pages/Analytics/InvestmentThemes.jsx";
import InvestorPortfolios from "./Pages/Analytics/InvestorPortfolios.jsx";
import MarketBreadth from "./Pages/Analytics/MarketBreadth.jsx";
import SectorAnalytics from "./Pages/Analytics/SectorAnalytics.jsx";
import SectorRotation from "./Pages/Analytics/SectorRotation.jsx";
import TradingStrategies from "./Pages/Analytics/TradingStrategies.jsx";
import Financials2 from './Pages/searchIndustries/Financials2.jsx';

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="*"                                           element={<div>Error 404</div>} />p
        <Route path="/"                                           element={<Navigate to='/home'/>} />
        <Route path="/home"                                       element={<Home />} />
        <Route path="/chartHome"                                  element={<ChartsHome />} />
        <Route path="/innerChart/:ticker"                         element={<SuperChartsInnerPage />} />
        <Route path="/marketHome"                                 element={<MarketHome />} />

        <Route path="/news/*"                                     element={<NewsUpdates />} />
        <Route path="/deals/*"                                    element={<Deals />} />
        <Route path="/deliveries"                                 element={<Deliveries />} />
        <Route path="/trending-stocks"                            element={<TrendingStocks />} />
        <Route path="/ipos"                                       element={<IPOOuter />} />
        <Route path="/investors"                                  element={<InvestorsOuter />} />
        <Route path="/investors/:investorName"                    element={<InvestorsInner />} />
        <Route path="/sme"                                        element={<SMEZone />} />
        <Route path="/diamondrock-tutorial"                       element={<DiamondrockTut />} />

        {/* Global Pages 👇 */}
        <Route path="/global-indices"                             element={<GlobalIndicesOuter />} />
        <Route path="/global-stock/prices"                        element={<GlobalStocksPrices />} />
        <Route path="/global-stock/financials"                    element={<GlobalStocksFinancials />} />
        <Route path="/global-stock/fundamentals"                  element={<GlobalStocksFundamentals />} />
        <Route path="/global-trending-stocks/"                    element={<GlobalTrendingStocks />} />
        
        {/* Sectors Pages 👇 */}
        <Route path="/sector-overview"                            element={<SectorsOuter />} />
        <Route path="/sector/:sectorName/industry/:industryName"  element={<SectorsInner />} />

        {/* Stock Pages 👇 */}
        <Route path="/stock/:ticker/prices"                       element={<StockDetails />} />
        <Route path="/stock/:ticker/fundamentals"                 element={<Fundamentals />} />
        <Route path="/stock/:ticker/financials"                   element={<Financials />} />
        <Route path="/stock/:ticker/financials2"                  element={<Financials2 />} />
        <Route path="/stock/:ticker/diamond-report"               element={<Diamondreport />} />
        <Route path="/stock/:ticker/updates"                      element={<StockUpdates />} />
        <Route path="/stock/:ticker/shareholding"                 element={<Shareholding />} />
        <Route path="/stock/:ticker/deliveries"                   element={<Delivery />} />
        <Route path="/stock/:ticker/technicals"                   element={<Technicals />} />

        {/* Indices Pages 👇 */}
        <Route path="/indices"                                    element={<IndicesPage />} />
        <Route path="/indices/prices"                             element={<PricesPage />} />
        <Route path="/indices/stocks"                             element={<StocksPage />} />
        <Route path="/indices/index-breadth"                      element={<IndexBreadth />} />
        <Route path="/indices/delivery"                           element={<DeliveriesPage />} />
        <Route path="/indices/updates"                            element={<UpdatesPage />} />
        <Route path="/indices/technicals"                         element={<TechnicalsPage />} />
        <Route path="/indices/futures-oi"                         element={<IndicesFuturesOI />} />
        <Route path="/indices/scans"                              element={<Scans />} />
        
        {/* Analytics Pages 👇 */}
        
        <Route path="/analytics/home"                             element={<AnalyticsHome />} />
        <Route path="/analytics/analytics"                        element={<AnalyticsPage/>}/>
        <Route path="/analytics/scans"                            element={<AnalyticsScans />} />
        <Route path="/analytics/chart-patterns"                   element={<ChartPatterns />} />
        <Route path="/analytics/trading-strategies"               element={<TradingStrategies />} />
        <Route path="/analytics/investment-ideas"                 element={<InvestmentIdeas />} />
        <Route path="/analytics/analytics-diamond-reports"        element={<AnalyticsDiamondReports />} />
        <Route path="/analytics/sector-rotation"                  element={<SectorRotation />} />
        <Route path="/analytics/sector-analytics"                 element={<SectorAnalytics />} />
        <Route path="/analytics/market-breadth"                   element={<MarketBreadth />} />
        <Route path="/analytics/investor-portfolios"              element={<InvestorPortfolios />} />
        <Route path="/analytics/investment-themes"                element={<InvestmentThemes />} />
        <Route path="/analytics/diamond-insights"                 element={<DiamondInsights />} />
        <Route path="/analytics/company-filings"                  element={<CompanyFilings />} />
        <Route path="/analytics/business-houses"                  element={<BusinessHouses />} />
        <Route path="/analytics/fo-zone"                          element={<FOZone />} />

      </Routes>
    </>
  )
}

export default MainRoutes

