import React, { useState, useEffect} from 'react';
import { TrendingUp, EyeOff } from 'lucide-react';
import StockChart from './charts/CandeStickStockChart';
import { useSelector} from 'react-redux';

function IndividualCompanyMap(props) {
  const tickerDetails = useSelector((state) => state.innerChartApiData.tickerDetails);
  const candleDPI = useSelector(state => state.innerChartApiData.dataInstance);
  const { showVolume, showCandle } = useSelector((state) => state.innerChartApiData.chartViewControls);
  const [time, setTime] = useState('');
  const periods = ['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'];

  useEffect(() => {
    // Function to format time as HH:MM:SS UTC
    const updateTime = () => {
      const now = new Date();
      let hours = now.getUTCHours() + 5; // Add 5 hours
      let minutes = now.getUTCMinutes() + 30; // Add 30 minutes
      let seconds = now.getUTCSeconds(); 
    
      if (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
    
      if (hours >= 24) {
        hours -= 24;
      }
    
      // Format to always show two digits (e.g., 09:05:07 instead of 9:5:7)
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} IST`;
    
      setTime(formattedTime);
    };

    // Update the time every second
    updateTime(); // Update immediately on mount
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section className="h-full bg-white rounded-md border border-gray-200 flex flex-col relative">
      {/* Header */}
        <div className="border-b border-gray-200" style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', zIndex: 100 }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Company Info */}
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" style={{color: showCandle? 'blue': 'grey'}} />
              <h1 className="text-md font-bold" style={{ color: showCandle? 'black': 'gray' }}>
                {tickerDetails.companyName.toUpperCase()} • {tickerDetails.market}
              </h1>
            </div>

            {/* Price Info */}
            {showCandle? 
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">O <span style={{ color: candleDPI.change >= 0 ? '#10B981' : '#EF4444' }}>{candleDPI.open}</span></p>
                <p className="text-sm font-medium">H <span style={{ color: candleDPI.change >= 0 ? '#10B981' : '#EF4444' }}>{candleDPI.high}</span></p>
                <p className="text-sm font-medium">L <span style={{ color: candleDPI.change >= 0 ? '#10B981' : '#EF4444' }}>{candleDPI.low}</span></p>
                <p className="text-sm font-medium">C <span style={{ color: candleDPI.change >= 0 ? '#10B981' : '#EF4444' }}>{candleDPI.close}</span></p>
                <span className="text-sm font-medium"
                  style={{ color: candleDPI.change >= 0 ? '#10B981' : '#EF4444' }}
                >
                  {candleDPI.change>0?'+':''}{candleDPI.change} ({candleDPI.change>0?'+':''}{candleDPI.changePercent}%)
                </span>
              </div>
            </div> : <EyeOff size={16} color='gray'/>
            }
          </div>

          {/* Trading Actions */}
          {/* <div className="mt-1 flex gap-4">
            <button 
              className="group relative px-3 py-1 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
              aria-label="Sell stock"
            >
              <div className="text-xs font-semibold">1,246.30</div>
              <div className="text-xs">SELL</div>
            </button>
            <button 
              className="group relative px-3 py-1 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              aria-label="Buy stock"
            >
              <div className="text-xs font-semibold">1,246.30</div>
              <div className="text-xs">BUY</div>
            </button>
          </div>
             */}
          {/* Volume */}
          <div className="mt-1 text-sm text-gray-600 flex items-center gap-2">
            Vol 
            {showVolume?
              <span style={{ color: candleDPI.change >= 0 ? '#10B981' : '#EF4444' }}>{candleDPI.volume}M</span>
              : <EyeOff size={16}/>
            }
          </div>
        </div>
          
        {/* Chart Component */}
        <div className="flex-1 pt-2 px-1" style={{ paddingBottom: 0 }}>
          <StockChart selectedPeriod={props.selectedPeriod} isWatchlistPanelOpen={props.isWatchlistPanelOpen} 
          isChartExpanded={props.isChartExpanded} showScreener={props.showScreener}
          isChartDataViewPanelOpen={props.isChartDataViewPanelOpen}/>
        </div>

        {/* Time Period Selector */}
        <nav
          className="flex justify-between text-sm p-2 border-t border-gray-200"
          aria-label="Chart time periods"
        >
          <div className="flex">
            {periods.map((period) => (
              <button
                key={period}
                className={`px-2 py-1 rounded transition-colors ${
                  props.selectedPeriod === period
                    ? 'bg-blue-100 text-blue-600'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => props.setSelectedPeriod(period)}
                aria-pressed={props.selectedPeriod === period}
              >
                {period}
              </button>
            ))}
          </div>
          <div className="px-4 pt-1 pb-0">{time}</div>
        </nav>
    </section>
  );
}

export default IndividualCompanyMap;