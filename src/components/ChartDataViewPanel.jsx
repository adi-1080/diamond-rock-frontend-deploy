import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChartViewControls } from "../redux/slice/innerChartApiSlice";
import { Eye, EyeOff, ChartCandlestick, ChartColumn } from "lucide-react";

const ChartDataViewPanel = () => {
  const dispatch = useDispatch();
  const candleDPI = useSelector(state => state.innerChartApiData.dataInstance);
  const oneYearData = useSelector(state => state.performanceData.data);
  const ticker = useSelector(state => state.performanceData.ticker);
  const { showVolume, showCandle } = useSelector(state => state.innerChartApiData.chartViewControls);
  const [lastDayChange, setLastDayChange] = useState(0);
  const [lastDayChangePercent, setLastDayChangePercent] = useState(0);

  useEffect(() => {
    if (oneYearData && oneYearData.length > 0) {
      const lastDay = oneYearData[oneYearData.length - 1];
      const secondLastDay = oneYearData[oneYearData.length - 2];
      setLastDayChange((lastDay.Close - secondLastDay.Close).toFixed(2));
      setLastDayChangePercent((((lastDay.Close - secondLastDay.Close) / secondLastDay.Close) * 100).toFixed(2));
    }
  }, [oneYearData]);

  const stockData = {
    date: "Fri 14 Feb '25",
    name: "RELIANCE",
    timeframe: "1D",
    exchange: "NSE"
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white rounded-tl">
      <div className="flex justify-between p-4 text-sm text-gray-600">
        <span>Date</span>
        <span>{stockData.date}</span>
      </div>

      <hr/>
      <div className="flex px-4 py-2 items-center justify-between hover:bg-gray-100 hover:cursor-pointer">
        <div className="flex items-center space-x-2">
          <ChartCandlestick size={24} strokeWidth={1}/>
          <p className="text-sm font-bold">
              {ticker} • {stockData.timeframe} • {stockData.exchange}
          </p>
        </div>
        <button 
          className="ml-auto"
          onClick={() => dispatch(setChartViewControls({
            showVolume: showVolume,
            showCandle: !showCandle
          }))}
          title={showCandle ? "Hide Data" : "Show Data"}
        >
            {showCandle ? <Eye size={16} /> : <EyeOff size={16} />} 
        </button>
      </div>
      {showCandle && (<div className="px-4 pb-4 pt-2 text-sm space-y-1">
        <p className="flex justify-between">Open <span className={`text-${candleDPI.change > 0 ? 'green' : 'red'}-500`}>{candleDPI.open}</span></p>
        <p className="flex justify-between">High <span className={`text-${candleDPI.change > 0 ? 'green' : 'red'}-500`}>{candleDPI.high}</span></p>
        <p className="flex justify-between">Low <span className={`text-${candleDPI.change > 0 ? 'green' : 'red'}-500`}>{candleDPI.low}</span></p>
        <p className="flex justify-between">Close <span className={`text-${candleDPI.change > 0 ? 'green' : 'red'}-500`}>{candleDPI.close}</span></p>
        <p className="flex justify-between">Change <span className={`text-${candleDPI.change > 0 ? 'green' : 'red'}-500`}>{candleDPI.change} ({candleDPI.changePercent}%)</span></p>
        <p className="flex justify-between">Vol <span className={`text-${candleDPI.change > 0 ? 'green' : 'red'}-500`}>{candleDPI.volume}M</span></p>
        <p className="flex justify-between">Last day change <span className="text-green-500">{lastDayChange} ({lastDayChangePercent}%)</span></p>
      </div>)}

      <hr/>
      
      <div className="mt-4 px-4">
        <div
          className="w-full flex items-center justify-between text-sm">
          <span className="flex gap-2"><ChartColumn size={24} strokeWidth={1} />Vol</span>
          <button 
            onClick={() => dispatch(setChartViewControls({
              showVolume: !showVolume,
              showCandle: showCandle
            }))}
           title={showVolume ? "Hide Volume" : "Show Volume"}>
            {showVolume ? <Eye size={16} /> : <EyeOff size={16} />} 
          </button>
        </div>
        {showVolume && (
          <p className="flex justify-between text-sm mt-4">Volume: <span className={`text-${candleDPI.change > 0 ? 'green' : 'red'}-500`}>{candleDPI.volume}M</span></p>
        )}
      </div>
    </div>
  );
}

export default ChartDataViewPanel;