import { ChevronRight, ChevronLeft, Sun, ChartArea, ChartCandlestick, Maximize2} from "lucide-react";
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChartHomeTabData } from '../redux/slice/chartHomeApiSlice';
import CountrySelector from '../components/CountrySelector';
import '../App.css';
// import MyLineChart from '../components/charts/LineChart';
import LineNCandleChart from '../components/charts/LineNCandleChart';
import TenorScaleChart from '../components/charts/BondsChart';
import BondsTable from '../components/Bonds_10y';
import CorporateBondsSlider from '../components/CorporateBondSlider';
import CommunityTrendsSlider from '../components/CommunityTrendsSlider';
import GDPChart from '../components/EconomyGraph';
import EconomicHeatmap from '../components/EconomicIndHeatmap';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import SidebarAndNavbar from "../components/SidebarAndNavbar";

const ChartsHome = () => {
  const scrollRef = useRef(null);
  const scrollIndicesRef = useRef(null);
  const scrollStocksRef = useRef(null);
  const scrollCryptoRef = useRef(null);
  const scrollFuturesRef = useRef(null);
  const scrollForexRef = useRef(null);
  const scrollEtfRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tabData = useSelector((state) => state.chartHomeApiData.tabData) || [];
  const [ indicesTicker, setIndicesTicker ] = useState('^SPX');
  const [ stocksTicker, setStocksTicker ] = useState('NVDA');
  const [ cryptoTicker, setCryptoTicker ] = useState('BTC-USD');
  const [ futuresTicker, setFuturesTicker ] = useState('GC=F');
  const [ forexTicker, setForexTicker ] = useState('EURUSD=X');
  const [ etfTicker, setEtfTicker ] = useState('SPY');
  const [ indicesPeriod, setIndicesPeriod ] = useState('1D');
  const [ stocksPeriod, setStocksPeriod ] = useState('1D');
  const [ cryptoPeriod, setCryptoPeriod ] = useState('1D');
  const [ futuresPeriod, setFuturesPeriod ] = useState('1D');
  const [ forexPeriod, setForexPeriod ] = useState('1D');
  const [ etfPeriod, setEtfPeriod ] = useState('1D');
  const [ indicesCandle, setIndicesCandle ] = useState(false);
  const [ stocksCandle, setStocksCandle ] = useState(false);
  const [ cryptoCandle, setCryptoCandle ] = useState(false);
  const [ futuresCandle, setFuturesCandle ] = useState(false);
  const [ forexCandle, setForexCandle ] = useState(false);
  const [ etfCandle, setEtfCandle ] = useState(false);
  const showModal = useSelector((state) => state.chartHomeApiData.showModal);
  const [canScrollIndices, setCanScrollIndices] = useState({ left: false, right: true });
  const [canScrollStocks, setCanScrollStocks] = useState({ left: false, right: true });
  const [canScrollCrypto, setCanScrollCrypto] = useState({ left: false, right: true });
  const [canScrollFutures, setCanScrollFutures] = useState({ left: false, right: true });
  const [canScrollForex, setCanScrollForex] = useState({ left: false, right: true });
  const [canScrollEtf, setCanScrollEtf] = useState({ left: false, right: true });

  useEffect(() => {
    dispatch(fetchChartHomeTabData()); 
  }, []);

  useEffect(() => {
    const el = scrollIndicesRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollIndices);
      checkScrollIndices(); // Initial check
    }
    return () => el?.removeEventListener("scroll", checkScrollIndices);
  }, []);

  useEffect(() => {
    const el = scrollStocksRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollStocks);
      checkScrollStocks(); // Initial check
    }
    return () => el?.removeEventListener("scroll", checkScrollStocks);
  }, []);

  useEffect(() => {
    const el = scrollCryptoRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollCrypto);
      checkScrollCrypto(); // Initial check
    }
    return () => el?.removeEventListener("scroll", checkScrollCrypto);
  }, []);

  useEffect(() => {
    const el = scrollFuturesRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollFutures);
      checkScrollFutures(); // Initial check
    }
    return () => el?.removeEventListener("scroll", checkScrollFutures);
  }, []);

  useEffect(() => {
    const el = scrollForexRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollForex);
      checkScrollForex(); // Initial check
    }
    return () => el?.removeEventListener("scroll", checkScrollForex);
  }, []);

  useEffect(() => {
    const el = scrollEtfRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollEtf);
      checkScrollEtf(); // Initial check
    }
    return () => el?.removeEventListener("scroll", checkScrollEtf);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Adjust scroll step
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const scrollIndices = (direction) => {
    if (scrollIndicesRef.current) {
      const scrollAmount = 1500;
      scrollIndicesRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollIndices = () => {
    const el = scrollIndicesRef.current;
    if (el) setCanScrollIndices({ left: el.scrollLeft > 0, right: el.scrollLeft < el.scrollWidth - el.clientWidth });
  };

  const scrollStocks = (direction) => {
    if (scrollStocksRef.current) {
      const scrollAmount = 1500;
      scrollStocksRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollStocks = () => {
    const el = scrollStocksRef.current;
    if (el) setCanScrollStocks({ left: el.scrollLeft > 0, right: el.scrollLeft < el.scrollWidth - el.clientWidth });
  };

  const scrollCrypto = (direction) => {
    if (scrollCryptoRef.current) {
      const scrollAmount = 1500;
      scrollCryptoRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollCrypto = () => {
    const el = scrollCryptoRef.current;
    if (el) setCanScrollCrypto({ left: el.scrollLeft > 0, right: el.scrollLeft < el.scrollWidth - el.clientWidth });
  };

  const scrollFutures = (direction) => {
    if (scrollFuturesRef.current) {
      const scrollAmount = 1500;
      scrollFuturesRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollFutures = () => {
    const el = scrollFuturesRef.current;
    if (el) setCanScrollFutures({ left: el.scrollLeft > 0, right: el.scrollLeft < el.scrollWidth - el.clientWidth });
  };

  const scrollForex = (direction) => {
    if (scrollForexRef.current) {
      const scrollAmount = 1500;
      scrollForexRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollForex = () => {
    const el = scrollForexRef.current;
    if (el) setCanScrollForex({ left: el.scrollLeft > 0, right: el.scrollLeft < el.scrollWidth - el.clientWidth });
  };

  const scrollEtf = (direction) => {
    if (scrollEtfRef.current) {
      const scrollAmount = 1500;
      scrollEtfRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollEtf = () => {
    const el = scrollEtfRef.current;
    if (el) setCanScrollEtf({ left: el.scrollLeft > 0, right: el.scrollLeft < el.scrollWidth - el.clientWidth });
  };

  const getRandomFixedColor = () => {
    const colors = ['#ff0000', '#096a43', '#4086e2']; // Red, Green, Blue shades
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const indices = [
    { id: "500", name: "S&P 500", value: "6,101.25", change: "-0.29%", color: "bg-red-500" },
    { id: "100", name: "Nasdaq 100", value: "21,774.01", change: "-0.58%", color: "bg-blue-500" },
    { id: "30", name: "Dow 30", value: "44,424.26", change: "-0.32%", color: "bg-blue-600" },
    { id: "2000", name: "US 2000 Small Cap", value: "2,286.854", change: "-1.02%", color: "bg-purple-800" },
    { id: "600", name: "Russell 600", value: "1,500.654", change: "+0.75%", color: "bg-green-500" },
    { id: "50", name: "Nifty 50", value: "19,800.125", change: "-0.15%", color: "bg-yellow-500" },
  ];

  const worldIndices = [
    { id: "225", name: "NI225", desc: "Japan 225 Index", value: "39,565.58", currency: "JPY", change: "-0.92%", color: "bg-blue-600" },
    { id: "100", name: "UKX", desc: "FTSE 100 Index", value: "8,476.98", currency: "GBP", change: "-0.30%", color: "bg-red-500" },
    { id: "DAX", name: "DAX", desc: "DAX Index", value: "21,143.10", currency: "EUR", change: "-1.18%", color: "bg-blue-500" },
    { id: "40", name: "PX1", desc: "CAC 40 Index", value: "7,864.10", currency: "EUR", change: "-0.80%", color: "bg-green-500" },
    { id: "FTMIB", name: "FTMIB", desc: "Milano Italia Borsa Index", value: "36,162.32", currency: "EUR", change: "-0.11%", color: "bg-purple-700" },
    { id: "40", name: "PX1", desc: "CAC 40 Index", value: "7,864.10", currency: "EUR", change: "-0.80%", color: "bg-green-500" },
    { id: "40", name: "PX1", desc: "CAC 40 Index", value: "7,864.10", currency: "EUR", change: "-0.80%", color: "bg-green-500" },
  ];

  const highVol = [
    { name: "NVIDIA Corporation", ticker: "NVDA", price: "127.11", change: "-10.88%", color: "text-red-500" },
    { name: "Meta Platforms, Inc.", ticker: "META", price: "638.08", change: "-1.45%", color: "text-red-500" },
    { name: "MicroStrategy Inc.", ticker: "MSTR", price: "344.51", change: "-2.59%", color: "text-red-500" },
    { name: "Microsoft Corporation", ticker: "MSFT", price: "425.44", change: "-4.19%", color: "text-red-500" },
    { name: "Apple Inc.", ticker: "AAPL", price: "226.80", change: "+1.80%", color: "text-green-500" },
  ];

  const mostVol = [
    { name: "Neuphoria Therapeutics", ticker: "NEUP", price: "3.95", change: "-10.02%", color: "text-red-500" },
    { name: "Next Technology Holdings", ticker: "NXTT", price: "1.45", change: "+3.57%", color: "text-green-500" },
    { name: "Canoo Inc.", ticker: "GOEV", price: "0.4250", change: "-10.53%", color: "text-red-500" },
    { name: "Nvni Group Limited", ticker: "NVNI", price: "3.43", change: "-22.05%", color: "text-red-500" },
    { name: "Allurion Technologies", ticker: "ALUR", price: "7.35", change: "-15.42%", color: "text-red-500" },
    { name: "Carbon Revolution", ticker: "CREV", price: "3.62", change: "-19.20%", color: "text-red-500" },
  ];
  const gainers = [
    {
      name: 'Planet Image International Limited',
      symbol: 'YIBO',
      price: '5.14',
      percentage: '66.88'
    },
    {
      name: 'Diginex Limited',
      symbol: 'DGIX',
      price: '14.99',
      percentage: '59.13'
    },
    {
      name: 'Hanxi Health Technology Limited',
      symbol: 'HAO',
      price: '3.70',
      percentage: '47.41'
    },
    {
      name: 'TransCode Therapeutics, Inc.',
      symbol: 'RNAZ',
      price: '9.54',
      percentage: '45.53'
    },
    {
      name: 'Phio Pharmaceuticals Corp.',
      symbol: 'PHIO',
      price: '2.55',
      percentage: '26.24'
    },
    {
      name: 'Monopar Therapeutics Inc.',
      symbol: 'MNPR',
      price: '41.82',
      percentage: '24.70'
    }
  ];

  const losers = [
    {
      name: 'MINK Therapeutics, Inc.',
      symbol: 'INKT',
      price: '5.51',
      percentage: '-93.77'
    },
    {
      name: 'Revelation Biosciences, Inc.',
      symbol: 'REVB',
      price: '4.24',
      percentage: '-93.05'
    },
    {
      name: 'SAB Biotherapeutics, Inc.',
      symbol: 'SABS',
      price: '2.07',
      percentage: '-52.52'
    },
    {
      name: 'JetBlue Airways Corporation',
      symbol: 'JBLU',
      price: '6.01',
      percentage: '-25.71'
    },
    {
      name: 'NextEra Energy Partners, LP',
      symbol: 'NEP',
      price: '11.83',
      percentage: '-25.13'
    },
    {
      name: 'Gamehaus Holdings Inc.',
      symbol: 'GMHS',
      price: '2.19',
      percentage: '-22.61'
    }
  ];

  const bonds = {
    shortTerm: [
      { logo: "A", name: "American Honda Finance Corp. 4.6% 17-APR-2025", symbol: "HMC5571787", yield: "4.73%", date: "Apr 17, 2025" },
      { logo: "A", name: "American Honda Finance Corp. FRN 23-APR-2025", symbol: "HMC5671870", yield: "4.55%", date: "Apr 23, 2025" },
      { logo: "R", img: "path-to-royal-bank-icon.png", name: "Royal Bank of Canada 4.95% 25-APR-2025", symbol: "RY5576684", yield: "4.60%", date: "Apr 25, 2025" },
      { logo: "C", name: "Canadian Imperial Bank of Commerce 5.144% 28-APR-2025", symbol: "CM5576830", yield: "4.48%", date: "Apr 28, 2025" },
      { logo: "H", img: "path-to-home-depot-icon.png", name: "Home Depot, Inc. 5.125% 30-APR-2025", symbol: "HD5710345", yield: "4.66%", date: "Apr 30, 2025" }
    ],
    longTerm: [
      { logo: "G", name: "GACI F.INV. 22/2122 MTN", symbol: "XS254216267", yield: "6.67%", date: "Oct 13, 2122" },
      { logo: "N", img: "path-to-norfolk-icon.png", name: "NORFOLK STH. 21/2121", symbol: "US055844CJ5", yield: "6.30%", date: "May 15, 2121" },
      { logo: "N", img: "path-to-norfolk-icon.png", name: "NORFOLK SOUTHERN 18/2118", symbol: "NFSE", yield: "6.01%", date: "Aug 1, 2118" },
      { logo: "M", name: "MASSA.INST.OF TECHN. 2116", symbol: "US575718AF8", yield: "6.01%", date: "Jul 1, 2116" },
      { logo: "C", name: "CAN.PAC.KAN. 2115", symbol: "US13645RAX2", yield: "5.94%", date: "Sep 15, 2115" }
    ]
  };



  const StockRow = ({ stock, isGainer }) => {
    const percentColor = isGainer ? 'bg-emerald-600' : 'bg-red-500';
    const percentValue = isGainer ? `+${stock.percentage}` : stock.percentage;

    return (
      <div className="flex items-center justify-between py-2">
        <div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{stock.name}</span>
            <span className="text-amber-500">★</span>
          </div>
          <span className="text-gray-500 text-sm">{stock.symbol}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-right">
            {stock.price}
            <span className="text-gray-500 text-sm">USD</span>
          </span>
          <span className={`${percentColor} text-white px-2 py-1 rounded-md text-sm min-w-[4.5rem] text-center`}>
            {percentValue}%
          </span>
        </div>
      </div>
    );
  };

  const StockList = ({ title, stocks, isGainers }) => {
    return (
      <div className="w-1/2">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="flex gap-4 text-sm text-gray-600 border-b pb-2">
            <span className="cursor-pointer">Regular hours</span>
            <span className="cursor-pointer">Pre-market</span>
            <span className="cursor-pointer">After-hours</span>
          </div>
        </div>
        <div className="space-y-2">
          {stocks.map((stock) => (
            <StockRow key={stock.symbol} stock={stock} isGainer={isGainers} />
          ))}
        </div>
        <div className="mt-4">
          <a href="#" className="text-blue-500 text-sm flex items-center">
            See all stocks with largest daily {isGainers ? 'growth' : 'drop'}
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  };
  const companies = [
    {
      symbol: 'MTAL',
      name: 'MAC Copper Limited',
      actual: '0.26',
      estimate: '0.26'
    },
    {
      symbol: 'GP1',
      name: 'Group 1 Automotive, Inc.',
      actual: '10.02',
      estimate: '9.11'
    },
    {
      symbol: 'CPF',
      name: 'Central Pacific Financial Corp New',
      actual: '0.42',
      estimate: '0.62'
    },
    {
      symbol: 'XYZ',
      name: 'Example Company 1',
      actual: '1.45',
      estimate: '1.50'
    }
  ];

  function App() {
    const scrollRef = useRef(null);

    const handleScroll = (direction) => {
      if (scrollRef.current) {
        const scrollAmount = 300;
        scrollRef.current.scrollLeft += direction === 'right' ? scrollAmount : -scrollAmount;
      }
    };
  }

  const BOND_DATA = [
    {
      id: 'USP989MJBE0',
      name: 'YPF 15/25 REGS',
      logo: '🔵', // Replace with actual logo image
      yield: 9.97,
      maturityDate: 'Jul 28, 2025'
    },
    {
      id: 'CTL5911195',
      name: 'Level 3 Financing, Inc. 10.0% 15-OCT-2032',
      logo: '⚪', // Replace with actual logo image
      yield: 9.94,
      maturityDate: 'Oct 15, 2032'
    },
    {
      id: 'XS242345924',
      name: 'CDBL FDG 2 22/25 MTN',
      logo: '⚪', // Replace with actual logo image
      yield: 9.94,
      maturityDate: 'Mar 2, 2025'
    },
    {
      id: 'TRUL5278855',
      name: 'Trulieve Cannabis Corp. 8.0% 06-OCT-2026',
      logo: '🟢', // Replace with actual logo image
      yield: 9.92,
      maturityDate: 'Oct 6, 2026'
    },
    {
      id: 'PEMX5386835',
      name: 'Petroleos Mexicanos 6.7% 16-FEB-2032',
      logo: '⚪', // Replace with actual logo image
      yield: 9.90,
      maturityDate: 'Feb 16, 2032'
    }
  ];

  const BondCard = ({ bond }) => (
    <div className="min-w-[240px] p-4 border border-gray-200 rounded-lg mr-4">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 mr-2">
          {bond.logo}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium truncate">{bond.id}</div>
          <div className="text-xs text-gray-500 truncate">{bond.name}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500">Yield to maturity</div>
          <div className="text-sm font-medium">{bond.yield}%</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Maturity date</div>
          <div className="text-sm font-medium">{bond.maturityDate}</div>
        </div>
      </div>
    </div>
  );
  const bonds2 = {
    floatingRate: [
      { logo: "A", name: "Banco de Occidente S.A. 10.875% 13-AUG-2034", symbol: "AVAL5808586", yield: "8.58%", coupon: "10.88%" },
      { logo: "L", name: "Liberty Costa Rica Senior Secured Finance 10.875% 15-JAN-20..", symbol: "LBCRF5526163", yield: "8.76%", coupon: "10.88%" },
      { logo: "M", name: "MetLife, Inc. 10.75% 01-AUG-2039", symbol: "MET.IS", yield: "6.20%", coupon: "10.75%" },
      { logo: "Q", name: "QNB BANK AS 23/33 FLR", symbol: "XS267823324", yield: "8.76%", coupon: "10.75%" },
      { logo: "L", name: "Limak Iskenderun Uluslararasi Liman Isletmeciligi AS 9.5% 10..", symbol: "LIMA5185064", yield: "9.83%", coupon: "9.50%" },
      { logo: "A", name: "ARCHER NORGE AS 23/27 FRN USD FLOOR C", symbol: "ARN001_PRO", yield: "6.32%", coupon: "9.34%" }
    ],
    fixedRate: [
      { logo: "L", name: "LATAM Airlines Group S.A. 13.375% 15-OCT-2029", symbol: "LTMAQ5488902", yield: "9.00%", coupon: "13.38%" },
      { logo: "H", name: "Hertz Corporation 12.625% 15-JUL-2029", symbol: "HTZ583639", yield: "9.89%", coupon: "12.63%" },
      { logo: "P", name: "Rain Carbon, Inc. 12.25% 01-SEP-2029", symbol: "PYDIF5629399", yield: "9.88%", coupon: "12.25%" },
      { logo: "S", name: "SHAMAR.PETR. 21/27", symbol: "NO1105762", yield: "8.51%", coupon: "12.00%" },
      { logo: "F", name: "Freedom Mortgage Corporation 12.0% 01-OCT-2028", symbol: "FPFX5652866", yield: "8.39%", coupon: "12.00%" },
      { logo: "T", name: "TUTOR PERINI 24/29 REGS", symbol: "USU87300AD8", yield: "8.69%", coupon: "11.88%" }
    ]
  };



  return (
    <SidebarAndNavbar defaultActiveMainMenu="globalMarket">
    <div className='flex flex-col min-h-screen'>
      <div className='flex justify-center bg-white items-center h-[35vh] pb-20'>
        <CountrySelector />
      </div>
      {/* Indices and graphs  */}
      <div className="p-6 px-12 bg-white">
        {/* Header */}
        <Link to="/indices" className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-bold">Indices</span>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </Link>

        {/* Index Cards with Scrollable Feature */}
        <div className="relative">
          { canScrollIndices.left && <button
            onClick={() => scrollIndices('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
          >
            <ChevronLeft className="text-gray-700 hover:text-blue-500" />
          </button>}

          <div
            ref={scrollIndicesRef}
            className="flex gap-10 overflow-x-auto scroll-smooth no-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {Object.entries(tabData).map(([key, value]) => (
              value.type === 'Index' && (
                <div 
                  key={key} 
                  onClick={() => setIndicesTicker(key)}
                  className={`min-w-[300px] flex items-center ${key === indicesTicker ? "bg-gray-100":"hover:bg-gray-100"} rounded-[100px] py-3 text-sm px-2 mb-3 cursor-pointer`}
                >
                <div className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold" style={{backgroundColor: getRandomFixedColor()}}>
                  {key.replace('^', '').replace('-', '').slice(0, 3)}
                </div>
                
                <div className="ml-4">
                  <div 
                    onClick={() => {
                      // dispatch(setTickerDetails({
                      //       companyName: value.shortName,
                      //       market: value.marketType,
                      // }));
                      navigate(`/innerChart/${key}`);
                    }}
                    className="text-gray-700 font-medium hover:text-blue-500"
                  >
                    {value.shortName.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <p className="text-black text-lg font-bold">
                    {value.currentPrice} <span className="text-xs text-gray-400">USD</span>
                  </p>
                </div>
                <p className={`ml-4 text-sm ${value.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {value.changePercent >= 0 ? "+": ""}{value.changePercent.toFixed(2)}%
                </p>
              </div>
            )
            ))}
          </div>

          { canScrollIndices.right && <button
            onClick={() => scrollIndices('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
          >
            <ChevronRight className="text-gray-700 hover:text-blue-500" />
          </button>}
        </div>

        {/* Placeholder for the Graph */}
        {/* <MyLineChart /> */}
        <LineNCandleChart type="indices" period={indicesPeriod} isCandle={indicesCandle} ticker={indicesTicker}/>

        <div className='flex justify-between'>
          {/* Timeframe Selection */}
          <div className="mt-6 flex gap-4">
            {["1D", "1M", "3M", "1Y", "5Y", "All"].map((time) => (
              <button
                key={time}
                onClick={() => setIndicesPeriod(time)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${time === indicesPeriod
                    ? "bg-gray-200 text-black font-bold"
                    : "text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-4 flex gap-4">
            <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setIndicesCandle(false)}>
              <ChartArea className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setIndicesCandle(true)}>
              <ChartCandlestick className="h-5 w-5 text-gray-600"/>
            </button>
            <button className="p-2 bg-gray-100 rounded-lg" onClick={() => navigate(`/innerChart/${indicesTicker}`)}>
              <Maximize2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* World indices  */}
      <div className='p-6 px-12 bg-white'>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-semibold">World Indices</h1>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </div>

        <div className="relative">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-[5]">
            <ChevronLeft className="text-gray-700" />
          </button>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar">
            {worldIndices.map((index) => (
              <div key={index.id} className="min-w-[280px] flex flex-col bg-white shadow-lg rounded-lg p-5 border mb-5 hover:bg-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-lg font-bold ${index.color}`}>
                    {index.id}
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">{index.name}</p>
                    <p className="text-gray-400 text-sm">{index.desc}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-black text-xl font-bold">
                    {index.value} <span className="text-sm text-gray-400">{index.currency}</span>
                  </p>
                  <p className={`text-md font-medium ${index.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                    {index.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-[5]">
            <ChevronRight className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* High Volume Stocks Section */}
      <div className='p-6 px-12 bg-white'>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-semibold">High Volume Stocks</h1>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highVol.map((stock, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
              <div>
                <h3 className="text-lg font-bold">{stock.name}</h3>
                <p className="text-gray-500">{stock.ticker}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{stock.price} USD</p>
                <p className={`${stock.color} text-sm font-semibold`}>{stock.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Volatile Stocks Section */}
      <div className='p-6 px-12 bg-white'>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-semibold">Most Volatile Stocks</h1>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostVol.map((stock, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow">
              <div>
                <h3 className="text-lg font-bold">{stock.name}</h3>
                <p className="text-gray-500">{stock.ticker}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{stock.price} USD</p>
                <p className={`${stock.color} text-sm font-semibold`}>{stock.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stock gainers and loosers section*/}
      <div className="w-full p-6 px-12  bg-white">
        <div className="flex flex-col md:flex-row gap-6">
          <StockList title="Stock gainers" stocks={gainers} isGainers={true} />
          <StockList title="Stock losers" stocks={losers} isGainers={false} />
        </div>
      </div>
      {/* Calender section below stock gainers etc*/}
      <div className="p-8 px-12 bg-white">
        <h2 className="text-2xl font-bold mb-6">Earnings Calendar</h2>

        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 z-[5] -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          {/* Cards container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-12"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {companies.map((company) => (
              <div
                key={company.symbol}
                className="flex-none w-[300px] p-2 bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-4">
                  <span>Today</span>
                  <Sun className="text-amber-400" />
                </div>

                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white">
                      {company.symbol.charAt(0)}
                    </div>
                    <span className="font-medium">{company.symbol}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{company.name}</p>
                </div>

                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Actual</p>
                    <p>{company.actual} <span className="text-gray-500 text-sm">USD</span></p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Estimate</p>
                    <p>{company.estimate} <span className="text-gray-500 text-sm">USD</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 z-[5] -translate-y-1/2 bg-gray-200 p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>

        {/* See all events link */}
        <div className="mt-4">
          <a href="#" className="text-blue-500 text-sm flex items-center gap-1">
            See all events
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* world stocks , worlds biggest companies , worlds top employers , earnings calendar , crypto, futures and commodities*/}
      <div className="p-6 px-12 bg-white">
        {/* World stocks Header */}
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-3xl font-bold">World Stocks</h1>
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </div>

        {/* world stocks Cards with Scrollable Feature */}
        <div className="relative">
          { canScrollStocks.left && <button
            onClick={() => scrollStocks('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
          >
            <ChevronLeft className="text-gray-700 hover:text-blue-500" />
          </button>}

          <div
            ref={scrollStocksRef}
            className="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {Object.entries(tabData).map(([key, value]) => (
              value.type === 'Equity' && (
                <div 
                  key={key} 
                  onClick={() => setStocksTicker(key)}
                  className={`min-w-[300px] flex items-center ${key === stocksTicker ? "bg-gray-100":"hover:bg-gray-100"} rounded-[100px] py-3 text-sm px-2 mb-3 cursor-pointer`}
                >
                <div className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold" style={{backgroundColor: getRandomFixedColor()}}>
                  {key.replace('^', '').replace('-', '').slice(0, 3)}
                </div>
                
                <div className="ml-4">
                  <div 
                    onClick={() => {
                      // dispatch(setTickerDetails({
                      //       companyName: value.shortName,
                      //       market: value.marketType,
                      // }));
                      navigate(`/innerChart/${key}`);
                    }}
                    className="text-gray-700 font-medium hover:text-blue-500"
                  >
                    {value.shortName.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <p className="text-black text-lg font-bold">
                    {value.currentPrice} <span className="text-xs text-gray-400">USD</span>
                  </p>
                </div>
                <p className={`ml-4 text-sm ${value.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {value.changePercent >= 0 ? "+": ""}{value.changePercent.toFixed(2)}%
                </p>
              </div>
            )
            ))}
          </div>

          { canScrollStocks.right && <button
            onClick={() => scrollStocks('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
          >
            <ChevronRight className="text-gray-700 hover:text-blue-500" />
          </button>}
        </div>

        {/* Placeholder for the Graph */}
        {/* <MyLineChart /> */}
        <LineNCandleChart type="stocks" period={stocksPeriod} isCandle={stocksCandle} ticker={stocksTicker} />

        <div className='flex justify-between'>
          {/* Timeframe Selection */}
          <div className="mt-6 flex gap-4">
            {["1D", "1M", "3M", "1Y", "5Y", "All"].map((time) => (
              <button
                key={time}
                onClick={() => setStocksPeriod(time)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${time === stocksPeriod
                    ? "bg-gray-200 text-black font-bold"
                    : "text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-4 flex gap-4">
            <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setStocksCandle(false)}>
              <ChartArea className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setStocksCandle(true)}>
              <ChartCandlestick className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg" onClick={() => navigate(`/innerChart/${stocksTicker}`)}>
              <Maximize2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* world biggest companies world largest employers*/}

        <div className="w-full p-6 px-0 bg-white">
          <div className="flex flex-col md:flex-row gap-6">
            <StockList title="World's Biggest Companies" stocks={gainers} isGainers={true} />
            <StockList title="World's Top Employers" stocks={losers} isGainers={false} />
          </div>
        </div>


        {/* Calender section world stocks*/}
        <div className="p-8 px-0 bg-white">
          <h2 className="text-2xl font-bold mb-6">Earnings Calendar</h2>

          <div className="relative">
            {/* Left scroll button */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 z-[5] -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            >
              <ChevronLeft />
            </button>

            {/* Cards container */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto px-12"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {companies.map((company) => (
                <div
                  key={company.symbol}
                  className="flex-none w-[300px] p-2 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span>Today</span>
                    <Sun className="text-amber-400" />
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white">
                        {company.symbol.charAt(0)}
                      </div>
                      <span className="font-medium">{company.symbol}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{company.name}</p>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Actual</p>
                      <p>{company.actual} <span className="text-gray-500 text-sm">USD</span></p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Estimate</p>
                      <p>{company.estimate} <span className="text-gray-500 text-sm">USD</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right scroll button */}
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 z-[5] -translate-y-1/2 bg-gray-200 p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </div>

          {/* See all events link */}
          <div className="mt-4">
            <a href="#" className="text-blue-500 text-sm flex items-center gap-1">
              See all events
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Crypto */}

          <div className="flex items-center gap-2 mb-4 my-8">
            <h1 className="text-3xl font-bold">Crypto</h1>
            <ChevronRight className="h-6 w-6 text-gray-500" />
          </div>

          {/* Crypto Cards with Scrollable Feature */}
          <div className="relative">
            { canScrollCrypto.left && <button
              onClick={() => scrollCrypto('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
            >
              <ChevronLeft className="text-gray-700 hover:text-blue-500" />
            </button>}

            <div
              ref={scrollCryptoRef}
              className="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
              style={{ scrollBehavior: 'smooth' }}
            >
              {Object.entries(tabData).map(([key, value]) => (
              value.type === 'Cryptocurrency' && (
                <div 
                  key={key} 
                  onClick={() => setCryptoTicker(key)}
                  className={`min-w-[300px] flex items-center ${key === cryptoTicker ? "bg-gray-100":"hover:bg-gray-100"} rounded-[100px] py-3 text-sm px-2 mb-3 cursor-pointer`}
                >
                <div className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold" style={{backgroundColor: getRandomFixedColor()}}>
                  {key.replace('^', '').replace('-', '').slice(0, 3)}
                </div>
                
                <div className="ml-4">
                  <div 
                    onClick={() => {
                      // dispatch(setTickerDetails({
                      //       companyName: value.shortName,
                      //       market: value.marketType,
                      // }));
                      navigate(`/innerChart/${key}`);
                    }}
                    className="text-gray-700 font-medium hover:text-blue-500"
                  >
                    {value.shortName.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <p className="text-black text-lg font-bold">
                    {value.currentPrice} <span className="text-xs text-gray-400">USD</span>
                  </p>
                </div>
                <p className={`ml-4 text-sm ${value.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {value.changePercent >= 0 ? "+": ""}{value.changePercent.toFixed(2)}%
                </p>
              </div>
              )
              ))}
            </div>

            { canScrollCrypto.right && <button
              onClick={() => scrollCrypto('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
            >
              <ChevronRight className="text-gray-700 hover:text-blue-500" />
            </button>}
          </div>

          {/* Placeholder for the Graph */}
          {/* <MyLineChart /> */}

          <LineNCandleChart type="crypto" period={cryptoPeriod} isCandle={cryptoCandle} ticker={cryptoTicker} />

        <div className='flex justify-between'>
          {/* Timeframe Selection */}
          <div className="mt-6 flex gap-4">
            {["1D", "1M", "3M", "1Y", "5Y", "All"].map((time) => (
              <button
                key={time}
                onClick={() => setCryptoPeriod(time)}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${time === cryptoPeriod
                    ? "bg-gray-200 text-black font-bold"
                    : "text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {time}
              </button>
            ))}
          </div>

            {/* Bottom Action Buttons */}
            <div className="mt-4 flex gap-4">
              <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setCryptoCandle(false)}>
                <ChartArea className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setCryptoCandle(true)}>
                <ChartCandlestick className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg" onClick={() => navigate(`/innerChart/${cryptoTicker}`)}>
                <Maximize2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Crypto Market Cap Ranking and TVL ranking  */}

          <div className="w-full p-6 px-0 bg-white my-8">
            <div className="flex flex-col md:flex-row gap-6">
              <StockList title="Crypto Market Cap Ranking" stocks={gainers} isGainers={true} />
              <StockList title="TVL Ranking" stocks={losers} isGainers={false} />
            </div>
          </div>
          {/* Crypto Gainers and Losers  */}
          <div className="w-full p-6 px-0 bg-white my-8">
            <div className="flex flex-col md:flex-row gap-6">
              <StockList title="Crypto Gainers" stocks={gainers} isGainers={true} />
              <StockList title="Crypto Losers" stocks={losers} isGainers={false} />
            </div>
          </div>

          {/* Futures and commodities , energy futures and agricultural futures, metal futures and index futures */}
          <div>
            <div className="p-6 px-0 bg-white">
              {/* World stocks Header */}
              <div className="flex items-center gap-2 mb-4 my-8">
                <h1 className="text-3xl font-bold">Futures and Commodities</h1>
                <ChevronRight className="h-6 w-6 text-gray-500" />
              </div>

              {/* world stocks Cards with Scrollable Feature */}
              <div className="relative">
                { canScrollFutures.left && <button
                  onClick={() => scrollFutures('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
                >
                  <ChevronLeft className="text-gray-700 hover:text-blue-500" />
                </button>}

                <div
                  ref={scrollFuturesRef}
                  className="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {Object.entries(tabData).map(([key, value]) => (
                    value.type === 'Futures' && (
                      <div 
                        key={key} 
                        onClick={() => setFuturesTicker(key)}
                        className={`min-w-[300px] flex items-center ${key === futuresTicker ? "bg-gray-100":"hover:bg-gray-100"} rounded-[100px] py-3 text-sm px-2 mb-3 cursor-pointer`}
                      >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold" style={{backgroundColor: getRandomFixedColor()}}>
                        {key.replace('^', '').replace('-', '').slice(0, 3)}
                      </div>
                      
                      <div className="ml-4">
                        <div 
                          onClick={() => {
                            // dispatch(setTickerDetails({
                            //       companyName: value.shortName,
                            //       market: value.marketType,
                            // }));
                            navigate(`/innerChart/${key}`);
                          }}
                          className="text-gray-700 font-medium hover:text-blue-500"
                        >
                          {value.shortName.split(' ').slice(0, 2).join(' ')}
                        </div>
                        <p className="text-black text-lg font-bold">
                          {value.currentPrice} <span className="text-xs text-gray-400">USD</span>
                        </p>
                      </div>
                      <p className={`ml-4 text-sm ${value.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {value.changePercent >= 0 ? "+": ""}{value.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  )
                  ))}
                </div>

                { canScrollFutures.right && <button
                  onClick={() => scrollFutures('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
                >
                  <ChevronRight className="text-gray-700 hover:text-blue-500" />
                </button>}
              </div>

              {/* Placeholder for the Graph */}
              {/* <MyLineChart /> */}

              <LineNCandleChart type="futures" period={futuresPeriod} isCandle={futuresCandle} ticker={futuresTicker} />

              <div className='flex justify-between'>
                {/* Timeframe Selection */}
                <div className="mt-6 flex gap-4">
                  {["1D", "1M", "3M", "1Y", "5Y", "All"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setFuturesPeriod(time)}
                      className={`px-4 py-2 rounded-md text-sm transition-colors ${time === futuresPeriod
                          ? "bg-gray-200 text-black font-bold"
                          : "text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-4 flex gap-4">
                  <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setFuturesCandle(false)}>
                    <ChartArea className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setFuturesCandle(true)}>
                    <ChartCandlestick className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg" onClick={() => navigate(`/innerChart/${futuresTicker}`)}>
                    <Maximize2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Energy futures and Agricultural futures */}
              <div className="w-full p-6 px-0 bg-white my-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <StockList title="Energy Futures" stocks={gainers} isGainers={true} />
                  <StockList title="Agricultural Futures" stocks={losers} isGainers={false} />
                </div>
              </div>
              <div className="w-full p-6 px-0 bg-white my-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <StockList title="Metal Futures" stocks={gainers} isGainers={true} />
                  <StockList title="Index Futures" stocks={losers} isGainers={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Forex and Currencies  */}
          <div>
            <div className="flex items-center gap-2 mb-4 my-8">
              <h1 className="text-3xl font-bold">Forex and Currencies</h1>
              <ChevronRight className="h-6 w-6 text-gray-500" />
            </div>

            {/* Crypto Cards with Scrollable Feature */}
            <div className="relative">
              { canScrollForex.left && <button
                onClick={() => scrollForex('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
              >
                <ChevronLeft className="text-gray-700 hover:text-blue-500" />
              </button>}

              <div
                ref={scrollForexRef}
                className="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
              >
                {Object.entries(tabData).map(([key, value]) => (
                  value.type === 'Currency' && (
                    <div 
                      key={key} 
                      onClick={() => setForexTicker(key)}
                      className={`min-w-[300px] flex items-center ${key === forexTicker ? "bg-gray-100":"hover:bg-gray-100"} rounded-[100px] py-3 text-sm px-2 mb-3 cursor-pointer`}
                    >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold" style={{backgroundColor: getRandomFixedColor()}}>
                      {key.replace('^', '').replace('-', '').slice(0, 3)}
                    </div>
                    
                    <div className="ml-4">
                      <div 
                        onClick={() => {
                          // dispatch(setTickerDetails({
                          //       companyName: value.shortName,
                          //       market: value.marketType,
                          // }));
                          navigate(`/innerChart/${key}`);
                        }}
                        className="text-gray-700 font-medium hover:text-blue-500"
                      >
                        {value.shortName.split(' ').slice(0, 2).join(' ')}
                      </div>
                      <p className="text-black text-lg font-bold">
                        {value.currentPrice} <span className="text-xs text-gray-400">USD</span>
                      </p>
                    </div>
                    <p className={`ml-4 text-sm ${value.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {value.changePercent >= 0 ? "+": ""}{value.changePercent.toFixed(2)}%
                    </p>
                  </div>
                )
                ))}
              </div>

              { canScrollForex.right && <button
                onClick={() => scrollForex('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
              >
                <ChevronRight className="text-gray-700 hover:text-blue-500" />
              </button>}
            </div>

            {/* Placeholder for the Graph */}
            {/* <MyLineChart /> */}

            <LineNCandleChart type="forex" period={forexPeriod} isCandle={forexCandle} ticker={forexTicker} />

            <div className='flex justify-between'>
              {/* Timeframe Selection */}
              <div className="mt-6 flex gap-4">
                {["1D", "1M", "3M", "1Y", "5Y", "All"].map((time) => (
                  <button
                    key={time}
                    onClick={() => setForexPeriod(time)}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${time === forexPeriod
                        ? "bg-gray-200 text-black font-bold"
                        : "text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Bottom Action Buttons */}
              <div className="mt-4 flex gap-4">
                <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setForexCandle(false)}>
                  <ChartArea className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setForexCandle(true)}>
                  <ChartCandlestick className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg" onClick={() => navigate(`/innerChart/${forexTicker}`)}>
                  <Maximize2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Majors and Currency Indices  */}

            <div className="w-full p-6 px-0 bg-white my-8">
              <div className="flex flex-col md:flex-row gap-6">
                <StockList title="Majors" stocks={gainers} isGainers={true} />
                <StockList title="Currency Indices" stocks={losers} isGainers={false} />
              </div>
            </div>
          </div>

          {/* Government Bonds  */}
          <div>
            <div className="flex items-center gap-2 mb-4 my-8">
              <h1 className="text-3xl font-bold">Government Bonds</h1>
              <ChevronRight className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex items-center gap-2 mb-4 my-8">
              <h1 className="text-2xl font-bold">Yield Curve</h1>
              <ChevronRight className="h-6 w-6 text-gray-500" />
            </div>

            <TenorScaleChart />
            <BondsTable />

            {/* Corporate bond slider  */}
            <CorporateBondsSlider />
            {/* short term and longterm bonds  */}
            <div className="w-full mx-auto p-10 px-0">
              <div className="flex flex-col md:flex-row gap-8">
                {["shortTerm", "longTerm"].map((type) => (
                  <div key={type} className="flex-1">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">
                      {type === "shortTerm" ? "Short-term ›" : "Long-term ›"}
                    </h2>
                    <div className="grid grid-cols-3 text-sm text-gray-500 uppercase border-b pb-2">
                      <div>Symbol</div>
                      <div className="text-right">Yield to Maturity</div>
                      <div className="text-right">Maturity Date</div>
                    </div>
                    <div className="mt-4 space-y-4">
                      {bonds[type].map((bond, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">
                          {bond.name.charAt(0)}
                          </div>
                          <div className="grid grid-cols-3 w-full items-center text-sm">
                            <div>
                              <div className="font-medium text-gray-900">{bond.name}</div>
                              <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md inline-block">
                                {bond.symbol}
                              </div>
                            </div>
                            <div className="text-right font-medium">{bond.yield}</div>
                            <div className="text-right font-medium">{bond.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* floating rate and fixed rate*/}
            <div className="w-full mx-auto p-4">
              <div className="flex flex-col md:flex-row gap-8">
                {["floatingRate", "fixedRate"].map((type) => (
                  <div key={type} className="flex-1">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">
                      {type === "floatingRate" ? "Floating-rate ›" : "Fixed-rate ›"}
                    </h2>
                    <div className="grid grid-cols-3 text-sm text-gray-500 uppercase border-b pb-2">
                      <div>Symbol</div>
                      <div className="text-right">Yield to Maturity</div>
                      <div className="text-right">Coupon</div>
                    </div>
                    <div className="mt-4 space-y-4">
                      {bonds2[type].map((bond, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-bold">
                            {bond.img ? <img src={bond.img} alt={bond.name} className="w-full h-full object-cover rounded-full" /> : bond.logo}
                          </div>
                          <div className="grid grid-cols-3 w-full items-center text-sm">
                            <div>
                              <div className="font-medium text-gray-900">{bond.name}</div>
                              <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md inline-block">
                                {bond.symbol}
                              </div>
                            </div>
                            <div className="text-right font-medium">{bond.yield}</div>
                            <div className="text-right font-medium">{bond.coupon}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ETFs */}
            <div>
              <div className="flex items-center gap-2 mb-4 my-8">
                <h1 className="text-3xl font-bold">ETFs</h1>
                <ChevronRight className="h-6 w-6 text-gray-500" />
              </div>

              {/* Crypto Cards with Scrollable Feature */}
              <div className="relative">
                { canScrollEtf.left && <button
                  onClick={() => scrollEtf('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
                >
                  <ChevronLeft className="text-gray-700 hover:text-blue-500" />
                </button>}

                <div
                  ref={scrollEtfRef}
                  className="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {Object.entries(tabData).map(([key, value]) => (
                    value.type === 'ETF' && (
                      <div 
                        key={key} 
                        onClick={() => setEtfTicker(key)}
                        className={`min-w-[300px] flex items-center ${key === etfTicker ? "bg-gray-100":"hover:bg-gray-100"} rounded-[100px] py-3 text-sm px-2 mb-3 cursor-pointer`}
                      >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold" style={{backgroundColor: getRandomFixedColor()}}>
                        {key.replace('^', '').replace('-', '').slice(0, 3)}
                      </div>
                      
                      <div className="ml-4">
                        <div 
                          onClick={() => {
                            // dispatch(setTickerDetails({
                            //       companyName: value.shortName,
                            //       market: value.marketType,
                            // }));
                            navigate(`/innerChart/${key}`);
                          }}
                          className="text-gray-700 font-medium hover:text-blue-500"
                        >
                          {value.shortName.split(' ').slice(0, 2).join(' ')}
                        </div>
                        <p className="text-black text-lg font-bold">
                          {value.currentPrice} <span className="text-xs text-gray-400">USD</span>
                        </p>
                      </div>
                      <p className={`ml-4 text-sm ${value.changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {value.changePercent >= 0 ? "+": ""}{value.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  )
                  ))}
                </div>

                { canScrollEtf.right && <button
                  onClick={() => scrollEtf('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-[5]"
                >
                  <ChevronRight className="text-gray-700 hover:text-blue-500" />
                </button>}
              </div>

              {/* Placeholder for the Graph */}
              {/* <MyLineChart /> */}

              <LineNCandleChart type="etf" period={etfPeriod} isCandle={etfCandle} ticker={etfTicker} />

              <div className='flex justify-between'>
                {/* Timeframe Selection */}
                <div className="mt-6 flex gap-4">
                  {["1D", "1M", "3M", "1Y", "5Y", "All"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setEtfPeriod(time)}
                      className={`px-4 py-2 rounded-md text-sm transition-colors ${time === etfPeriod
                          ? "bg-gray-200 text-black font-bold"
                          : "text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-4 flex gap-4">
                  <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setEtfCandle(false)}>
                    <ChartArea className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setEtfCandle(true)}>
                    <ChartCandlestick className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-gray-100 rounded-lg" onClick={() => navigate(`/innerChart/${etfTicker}`)}>
                    <Maximize2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>


            </div>
            {/* community trends */}
            <CommunityTrendsSlider />
            {/*most traded and highest AUM growth */}
            <div className="w-full p-6 px-0 bg-white my-8">
              <div className="flex flex-col md:flex-row gap-6">
                <StockList title="Most traded" stocks={gainers} isGainers={true} />
                <StockList title="Highest AUM growth" stocks={losers} isGainers={false} />
              </div>
            </div>
            {/*returns and divident yield */}
         



            {/*Economy */}
            <div>
              <div className="flex items-center gap-2 mb-4 my-8">
                <h1 className="text-3xl font-bold">Economy</h1>
                <ChevronRight className="h-6 w-6 text-gray-500" />
              </div>

              {/* Crypto Cards with Scrollable Feature */}
              <div className="relative">
                <button
                  onClick={() => scroll('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-[5]"
                >
                  <ChevronLeft className="text-gray-700" />
                </button>

                <div
                  ref={scrollRef}
                  className="flex gap-20 overflow-x-auto scroll-smooth no-scrollbar"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {indices.map((index) => (
                    <div key={index.id} className="min-w-[300px] flex items-center hover:bg-gray-100 rounded-[100px] py-3 text-sm px-2 mb-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${index.color}`}>
                        {index.id}
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-700 font-medium">{index.name}</p>
                        <p className="text-black text-lg font-bold">
                          {index.value} <span className="text-xs text-gray-400">USD</span>
                        </p>
                      </div>
                      <p className={`ml-4 text-sm ${index.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                        {index.change}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scroll('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md z-[5]"
                >
                  <ChevronRight className="text-gray-700" />
                </button>
              </div>

              {/* Economy graph */}
              <GDPChart/>

              {/* Economic indicators heatmap */}
              {/* <EconomicHeatmap/> */}
            </div>
          </div>
        </div>
      </div>
      {/* Footer  */}
      <Footer/>
    </div>
    </SidebarAndNavbar>
  );
};

export default ChartsHome;