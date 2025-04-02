import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import IndividualCompanyMap from '../components/IndividualCompanyMap';
import WatchlistPanel from '../components/WatchListPanel';
import SymbolSearchModal from '../components/modals/SymbolSearchModal';
import AlertModal from '../components/modals/AlertModal';
import { useDispatch } from "react-redux";
import { setTicker, setTickerDetails} from "../redux/slice/innerChartApiSlice";
import { setPTicker } from "../redux/slice/performanceApiSlice";
import { Menu, Search, Save, Eye, CirclePlus, Plus, Maximize2, Camera } from 'lucide-react';
import { Move, LineChart, BarChart3, Network, Settings, Edit, SmilePlus, Ruler, Magnet, Pencil, Lock, Trash } from 'lucide-react';
import { LayoutList, Layers, Minimize2, Rewind, ChevronDown, ChevronUp } from 'lucide-react';
import { AlarmClockPlus, SearchCode, Hexagon, LayoutGrid, ChartCandlestick } from 'lucide-react';
import '../superchartsFonts.css';
import ChartDataViewPanel from '../components/ChartDataViewPanel';
import { StockScreener } from '../components/StockScreener';
import symbols from '../js-data/symbols';

function SuperChartsInnerPage() {
  const { ticker} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isWatchlistPanelOpen, setIsWatchlistPanelOpen] = useState(true);
  const [isChartExpanded, setIsChartExpanded] = useState(false); // State to track fullscreen mode 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("5 minutes");
  const [showScreener, setShowScreener] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSymbolModalOpen, setIsSymbolModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");
  const [isChartDataViewPanelOpen, setIsChartDataViewPanelOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleScreener = () => setShowScreener(!showScreener);

  useEffect(() => {
    const currentSymbol = symbols.find((symbol) => symbol.name === ticker);
    dispatch(setTicker(ticker));
    dispatch(setTickerDetails({
      companyName: currentSymbol.description,
      market: currentSymbol.market,
    }));
    dispatch(setPTicker(ticker));
  }, [ticker]);

  const FooterAbsStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1000',
    bottom: '0'
  };
  const SidebarIcon = ({ icon }) => {
    return (
      <div className="flex items-center justify-center h-10 w-10 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-all duration-200">
        {icon}
      </div>
    );
  };

  const intervalOptions = [
    {
      label: "Minutes",
      options: [
        "1 minute",
        "2 minutes",
        "5 minutes",
        "15 minutes",
        "30 minutes",
        "60 minutes"
      ],
    },
  ];

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  const handleOptionClick = (option) => {
    setSelectedInterval(option);
    setSelectedPeriod(option);
    setIsOpen(false);
  };
 

  return (
    <div className={`h-[100vh] flex flex-col gap-1 bg-gray-200 ${isChartExpanded? 'fixed inset-0 bg-white z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between w-full bg-white border-b border-gray-200 px-2 font-thin text-sm" style={{ height: "7%" }}>
        {/* Left Section */}
        <div className="flex items-center space-x-2">
          <button className="relative p-1 hover:bg-gray-100 rounded-lg"   onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={25} />
            {/* <span className="absolute top-0 -right-1 bg-red-500 border-2 border-white text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span> */}
          </button>
          {isMenuOpen && (
        <div className="absolute top-10 left-0 bg-white shadow-md rounded-lg p-2 w-40" style={{ zIndex: 10000 }}>
          <ul>
            <li className="hover:bg-gray-100 p-2 rounded" onClick={()=>navigate("/")}>Home</li>
            <li className="hover:bg-gray-100 p-2 rounded" onClick={()=>navigate("/marketHome")}>Market</li>
            <li className="hover:bg-gray-100 p-2 rounded" onClick={()=>navigate("/news/")}>News</li>
            <li className="hover:bg-gray-100 p-2 rounded" onClick={()=>navigate("/deals/")}>Deals</li>
            <li className="hover:bg-gray-100 p-2 rounded" onClick={()=>navigate("/indices")}>Indices</li>
            <li className="hover:bg-gray-100 p-2 rounded" onClick={()=>navigate("/chartHome")}>Charts</li>
          </ul>
          </div> )}
          <button 
            className="flex items-center rounded-lg font-bold hover:bg-gray-100"
            onClick={() => setIsSymbolModalOpen(true)}
          >
            <Search size={16} />
            {ticker.split(".")[0].replace('^','')}
          </button>
          {isSymbolModalOpen && <SymbolSearchModal closeModal={()=>setIsSymbolModalOpen(false)}/>}
          <button className="hover:bg-gray-100 p-2 text-gray-700">
            <CirclePlus size={18} />
          </button>
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-1 px-2 border-l border-r border-gray-200"
            style={{ cursor: 'pointer', height: '1.5rem' }}
          >
            <span className="hover:bg-gray-100 p-2 rouned-lg">{selectedInterval}</span>
          </div>
          {/* Dropdown Menu */}
          {isOpen && (
            <div 
            ref={dropdownRef}
            className="absolute w-56 z-[10000] top-2 left-44 bg-white border border-gray-200 rounded-md shadow-lg"
            >
              {intervalOptions.map((group, index) => (
                <div key={index} className="p-2">
                  {/* Group Label */}
                  <div 
                  className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase"
                  >
                    {group.label}
                  </div>
                  {/* Group Options */}
                  {group.options.map((option) => (
                    <button
                      key={option}
                      className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${
                        selectedInterval === option && "bg-gray-100"
                      }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
          {/* Candlestick Icon */}
          <div className="flex items-center space-x-2 border-r border-gray-200" style={{ cursor: 'pointer', height: '1.5rem', paddingRight: '0.5rem' }}>
            <ChartCandlestick className="w-5 h-5 text-gray-700" />
          </div>

          {/* Indicators Icon */}
          {/* <div className="flex items-center space-x-2 border-r border-gray-200" style={{ cursor: 'pointer', height: '1.5rem', paddingRight: '0.5rem' }}>
            <ChartNoAxesCombined className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-700">Indicators</span>
          </div> */}

          {/* Grid Icon */}
          <div className="flex items-center space-x-2 border-r border-gray-200" style={{ cursor: 'pointer', height: '1.5rem', paddingRight: '0.5rem' }}>
            <LayoutGrid className="w-5 h-5 text-gray-700" />
          </div>

          {/* Alert Icon */}
          <div 
            className="flex items-center space-x-2 border-r border-gray-200" 
            onClick = {() => setIsAlertOpen(true)}
            style={{ cursor: 'pointer', height: '1.5rem', paddingRight: '0.5rem' }}
          >
            <AlarmClockPlus className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-700">Alert</span>
          </div>
          {isAlertOpen && <AlertModal closeModal={() => setIsAlertOpen(false)}/>}

          {/* Replay Icon */}
          <div className="flex items-center space-x-2 border-r border-gray-200" style={{ cursor: 'pointer', height: '1.5rem', paddingRight: '0.5rem' }}>
            <Rewind className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-700">Replay</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <button className="flex items-center px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Save size={16} className="mr-1" />
              <span>Save</span>
            </button>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg"><SearchCode className="w-5 h-5 text-gray-700" size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-lg"><Hexagon className="w-5 h-5 text-gray-700" size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-lg"><Camera className="w-5 h-5 text-gray-700" size={20} /></button>
          
          {/* Expand Button */}
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsChartExpanded(!isChartExpanded)} // ⬅️ Toggle full screen
          >
            <Maximize2 className="w-5 h-5 text-gray-700"size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex flex-1 gap-1 bg-gray-200 ${isChartExpanded ? 'fixed inset-0 z-50' : ''}`} style={{ height: "93%" }}>
        {/* Left Sidebar (Hidden in Fullscreen) */}
        {!isChartExpanded && (
          <aside className="bg-white border-r border-white items-center flex flex-col py-2 rounded-tr-md" style={{ width: "fit-content" }}>
            <SidebarIcon icon={<Move size={20} />} />
            <SidebarIcon icon={<LineChart size={20} />} />
            <SidebarIcon icon={<BarChart3 size={20} />} />
            <SidebarIcon icon={<Network size={20} />} />
            <SidebarIcon icon={<Settings size={20} />} />
            <SidebarIcon icon={<Edit size={20} />} />
            <SidebarIcon icon={<SmilePlus size={20} />} />
            <SidebarIcon icon={<Ruler size={20} />} />
            <SidebarIcon icon={<Plus size={20} />} />
            <SidebarIcon icon={<Magnet size={20} />} />
            <SidebarIcon icon={<Pencil size={20} />} />
            <SidebarIcon icon={<Lock size={20} />} />
            <SidebarIcon icon={<Eye size={20} />} />
            <SidebarIcon icon={<Trash size={20} />} />
          </aside>
        )}

        {/* Chart Section (Takes Full Screen when Expanded) */}
        <main className={`flex-1 flex flex-col gap-1 bg-gray-200 ${isChartExpanded ? 'absolute inset-0 h-[100vh]' : ''} relative`}>
          <div className="flex-1 p-0" style={{ height: isChartExpanded ? "100vh" : "90%" }}>
            <IndividualCompanyMap isWatchlistPanelOpen={isWatchlistPanelOpen} isChartExpanded={isChartExpanded} showScreener={showScreener}
            selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} isChartDataViewPanelOpen={isChartDataViewPanelOpen}/>
            {/* Restore Button in Fullscreen Mode */}
            {isChartExpanded && (
              <button
                onClick={() => setIsChartExpanded(false)}
                className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-lg z-[100] hover:bg-gray-700"
              >
                <Minimize2 size={20} />
              </button>
            )}
          </div>
          {/* Footer options (Hidden in Fullscreen) */}
          {!isChartExpanded && (
            <div className="bg-white rounded-md" style={showScreener ? FooterAbsStyle : { height: "10%"}}>
              <div className="flex px-4 py-2 items-center gap-4 border-b-2 border-gray-200">
                <button className="hover:bg-gray-100 p-2 text-md font-bold flex items-center gap-1" onClick={toggleScreener}>
                  Stock Screener
                  {showScreener ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                </button>
              </div>
              {showScreener && (
                <div>
                  <StockScreener />           
                </div>
              )}

              
            </div>
          )}
        </main>

        {/* Right Sidebar (Hidden in Fullscreen) */}
        {!isChartExpanded && (
          <aside className="bg-white border-r rounded-tl border-white flex">
            <div style={{ ...(isWatchlistPanelOpen || isChartDataViewPanelOpen ? {}:{ display: 'none' }) }}>
              {isWatchlistPanelOpen && <WatchlistPanel />}
               {isChartDataViewPanelOpen && <ChartDataViewPanel />} 
            </div>
            <aside className={`bg-white border-l-2 flex-col ${isWatchlistPanelOpen || isChartDataViewPanelOpen ?'':'rounded-tl'} items-center py-2`} style={{ width: "fit-content" }}>
              <SidebarIcon icon={<LayoutList size={25} onClick={() => {
                setIsChartDataViewPanelOpen(false);
                setIsWatchlistPanelOpen(!isWatchlistPanelOpen);
                }} />} 
              />
              {/* <SidebarIcon icon={<AlarmClock size={20} />} /> */}
              <SidebarIcon icon={<Layers size={25} onClick={() => {
                setIsWatchlistPanelOpen(false);
                setIsChartDataViewPanelOpen(!isChartDataViewPanelOpen);
                }} />} 
              />
              {/* <SidebarIcon icon={<MessageSquare size={20} />} />
              <SidebarIcon icon={<Ruler size={20} />} />
              <SidebarIcon icon={<Target size={20} />} /> 
              <SidebarIcon icon={<Calendar size={20} />} />
              <SidebarIcon icon={<Users2 size={20} />} />
              <SidebarIcon icon={<Bell size={20} />} />
              <SidebarIcon icon={<HelpCircle size={20} />} /> */}
            </aside>
          </aside>
        )}
      </div>
    </div>
  );
}

export default SuperChartsInnerPage;
