import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, ChartArea, ChartCandlestick, Maximize2} from "lucide-react";
import symbols from "../../js-data/symbols";
import { createChart } from "lightweight-charts";
import {
  fetchChartHomeApiDataIndices,
  setTickerIndices,
  setParametersIndices
} from "../../redux/slice/chartHomeApiSlice";

const StockChartMH = () => {
  const chartContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const data = useSelector((state) => state.chartHomeApiData.indices) || [];
  const dispatch = useDispatch();
  const [period, setPeriod] = useState("1D");
  const [isCandle, setIsCandle] = useState(false);
  const [ticker, setTicker] = useState("^NSEI");
  const [searchTerm, setSearchTerm] = useState("");
  const [tickerName, setTickerName] = useState("NIFTY 50");

  const filteredSymbols = symbols.filter(
    (symbol) =>
      symbol.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(setTickerIndices(ticker));
  }, [ticker]);

  useEffect(() => {
    dispatch(fetchChartHomeApiDataIndices());
  }, [ticker]);

  useEffect(() => {
    if (period === "1D") {
      dispatch(setParametersIndices("period=1d&interval=1m"));
      dispatch(fetchChartHomeApiDataIndices());
    } else if (period === "1M") {
      dispatch(setParametersIndices("period=1mo&interval=30m"));
      dispatch(fetchChartHomeApiDataIndices());
    } else if (period === "3M") {
      dispatch(setParametersIndices("period=3mo&interval=1h"));
      dispatch(fetchChartHomeApiDataIndices());
    } else if (period === "1Y") {
      dispatch(setParametersIndices("period=1y"));
      dispatch(fetchChartHomeApiDataIndices());
    } else if (period === "5Y") {
      dispatch(setParametersIndices("period=5y"));
      dispatch(fetchChartHomeApiDataIndices());
    } else {
      dispatch(setParametersIndices("period=max"));
      dispatch(fetchChartHomeApiDataIndices());
    }
  }, [period]);

  const dateFormula = (item) => {
    if (period === "1Y" || period === "5Y" || period === "All") {
      return item.Date.split(" ")[0];
    } else {
      return Math.floor(
        new Date(Date.parse(item.Datetime) + 19800000).getTime() / 1000
      );
    }
  };

  function unixTimestampToIST(unixTimestamp) {
    const milliseconds = (unixTimestamp * 1000) - 19800000;
    const date = new Date(milliseconds);
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };    
    return date.toLocaleString('en-IN', options);
  }

  useEffect(() => {
    if (!chartContainerRef.current || !data.length) return;

    // Create and append tooltip to the chart container if it doesn't exist
    if (!tooltipRef.current) {
      const toolTip = document.createElement('div');
      toolTip.style = `
        position: absolute; 
        display: none; 
        padding: 0.3rem; 
        box-sizing: border-box; 
        font-size: 0.7rem; 
        text-align: left; 
        z-index: 5; 
        pointer-events: none; 
        border: 1px solid; 
        border-radius: 0.3rem; 
        font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; 
        -webkit-font-smoothing: antialiased; 
        -moz-osx-font-smoothing: grayscale;
        background:#3f3e3e;
        color: white;
        width: 7vw;
        height: "fit-content";
        text-align: center;
      `;
      chartContainerRef.current.appendChild(toolTip);
      tooltipRef.current = toolTip;
      
      // Make sure the container has position relative for proper tooltip positioning
      chartContainerRef.current.style.position = 'relative';
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        attributionLogo: false,
        background: { type: "solid", color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "transparent" },
        horzLines: { color: "transparent" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      // handleScroll: {
      //   mouseWheel: false,
      //   pressedMouseMove: false,
      // },
      // handleScale: {
      //   axisPressedMouseMove: false,
      //   mouseWheel: false,
      //   pinch: false,
      // },
      autoSize: true,
    });

    chart.timeScale().fitContent();

    if (isCandle) {
      const candleSeries = chart.addCandlestickSeries({
        upColor: "#1bb463",
        borderUpColor: "#1bb463",
        wickUpColor: "#1bb463",
        downColor: "#ff0000",
        borderDownColor: "#ff0000",
        wickDownColor: "#ff0000",
        borderVisible: false,
        wickVisible: true,
        borderColor: "#000000",
      });

      candleSeries.setData(
        data.map((item) => ({
          time: dateFormula(item),
          open: item.Open,
          high: item.High,
          low: item.Low,
          close: item.Close,
        }))
      );

      const toolTipWidth = 80;
      const toolTipHeight = 80;
      const toolTipMargin = 15;
      const toolTip = tooltipRef.current;

      // update tooltip
      chart.subscribeCrosshairMove(param => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartContainerRef.current.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartContainerRef.current.clientHeight
        ) {
          toolTip.style.display = 'none';
        } else {
          // Get chart coordinates
          const date = new Date(param.time * 1000);
          const time = unixTimestampToIST(param.time);
          toolTip.style.display = 'block';
          const data = param.seriesData.get(candleSeries);
          const color = (data.close > data.open)? '#1bb463': '#ff0000';
          
          toolTip.innerHTML = (period === '1D' || period === '1M' || period === '3M')?
                              `<div style="font-size: 0.9rem; color: white; display: flex; justify-content: center; align-items: center; flex-direction: column">
                                  <div> O <span style="color: ${color};">${data.open.toFixed(2)}</span></div>
                                  <div> H <span style="color: ${color};">${data.high.toFixed(2)}</span></div>
                                  <div> L <span style="color: ${color};">${data.low.toFixed(2)}</span></div>
                                  <div> C <span style="color: ${color};">${data.close.toFixed(2)}</span></div>
                              </div>
                              <div style="color: white; margin-top: 0.5rem">
                                ${date.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: '2-digit'})}
                              </div>
                              <div style="color: white">${time}</div>`:
                              `<div style="font-size: 0.9rem; color: white; display: flex; justify-content: center; align-items: center; flex-direction: column">
                                  <div> O <span style="color: ${color};">${data.open.toFixed(2)}</span></div>
                                  <div> H <span style="color: ${color};">${data.high.toFixed(2)}</span></div>
                                  <div> L <span style="color: ${color};">${data.low.toFixed(2)}</span></div>
                                  <div> C <span style="color: ${color};">${data.close.toFixed(2)}</span></div>
                              </div>
                              <div style="color: white; margin-top: 0.5rem">
                                ${new Date(param.time).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: '2-digit'})}
                              </div>`;
          
          // Position relative to the chart container
          let left = param.point.x + toolTipMargin;
          if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
            left = param.point.x - toolTipMargin - toolTipWidth;
          }
          
          let top = param.point.y - toolTipHeight - toolTipMargin;
          if (top < 0) {
            top = param.point.y + toolTipMargin;
          }
          
          // Set position in pixels relative to the container
          toolTip.style.left = `${left}px`;
          toolTip.style.top = `${top}px`;
        }
      });
    } else {
      const curveColor = () => {
        if (data[0].Close > data[data.length - 1].Close) {
          return "#ff0000"; // Red
        } else {
          return "#1bb463"; // Green
        }
      };

      const series = chart.addAreaSeries({
        lineColor: curveColor(),
        topColor: curveColor().concat("33"),
        bottomColor: "transparent",
        lineWidth: 2,
      });

      series.setData(
        data.map((item) => ({
          time: dateFormula(item),
          value: item.Close,
        }))
      );

      const toolTipWidth = 80;
      const toolTipHeight = 80;
      const toolTipMargin = 15;
      const toolTip = tooltipRef.current;

      // update tooltip
      chart.subscribeCrosshairMove(param => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartContainerRef.current.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartContainerRef.current.clientHeight
        ) {
          toolTip.style.display = 'none';
        } else {
          // Get chart coordinates
          const date = new Date(param.time * 1000);
          const time = unixTimestampToIST(param.time);
          toolTip.style.display = 'block';
          const data = param.seriesData.get(series);
          
          toolTip.innerHTML = (period === '1D' || period === '1M' || period === '3M')?
                              `<div style="font-size: 1rem; color: white">${data.value.toFixed(2)}</div>
                              <div style="color: white">
                                ${date.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: '2-digit'})}
                              </div>
                              <div style="color: white">${time}</div>`:
                              `<div style="font-size: 1rem; color: white">${data.value.toFixed(2)}</div>
                              <div style="color: white">
                                ${new Date(param.time).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: '2-digit'})}
                              </div>`;
          
          // Position relative to the chart container
          let left = param.point.x + toolTipMargin;
          if (left > chartContainerRef.current.clientWidth - toolTipWidth) {
            left = param.point.x - toolTipMargin - toolTipWidth;
          }
          
          let top = param.point.y - toolTipHeight - toolTipMargin;
          if (top < 0) {
            top = param.point.y + toolTipMargin;
          }
          
          // Set position in pixels relative to the container
          toolTip.style.left = `${left}px`;
          toolTip.style.top = `${top}px`;
        }
      });
    }

    // Cleanup
    return () => {
      chart.remove();
      // Clean up tooltip when component unmounts
      if (tooltipRef.current && tooltipRef.current.parentNode) {
        tooltipRef.current.parentNode.removeChild(tooltipRef.current);
        tooltipRef.current = null;
      }
    };
  }, [data, isCandle]);

  return (
    <div className="w-full p-4 mb-6 border-spacing-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
      
      {/* Search Dropdown */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg mb-3 font-bold">{tickerName}</h2>
        <div style={{ maxWidth: "10vw", position: "relative" }}>
          {/* Search Input */}
          <div className="px-6" style={{ padding: "2.5px 0" }}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 border border-blue-500 rounded-lg
                focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ fontSize: "1rem"}}
              />
            </div>
          </div>

          {/* Symbol List */}
          <div 
            className="px-2 overflow-y-auto scroll-custom"
            style={{ display: searchTerm.length>0? "block" : "none",
              position: "absolute", top: "100%", left: 0, right: 0, 
              maxHeight: "20vh", zIndex: 10, backgroundColor: "white", 
              border: "1px solid #e5e7eb", borderRadius: "0 0 0.5rem 0.5rem"}}
          >
            {filteredSymbols.map((symbol, index) => (
              <p key={symbol.name} className="text-sm cursor-pointer py-1 hover:bg-blue-100" 
                onClick={()=>{
                  setTicker(symbol.name)
                  setTickerName(symbol.description)
                  setSearchTerm("")
                }}
              >{symbol.description}</p>
            ))}
            {filteredSymbols.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No results found</p>
            )}
          </div>
        </div>
      </div>

      <div 
        ref={chartContainerRef} 
        style={{ 
          width: "100%", 
          height: "400px", 
          position: "relative", 
          overflow: "hidden"
        }} 
      />

      <div className='flex justify-between'>
        {/* Timeframe Selection */}
        <div className="mt-6 flex gap-4">
          {["1D", "1M", "3M", "1Y", "5Y", "All"].map((time) => (
            <button
              key={time}
              onClick={() => setPeriod(time)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${time === period
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
          <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setIsCandle(false)}>
            <ChartArea className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg" onClick={() => setIsCandle(true)}>
            <ChartCandlestick className="h-5 w-5 text-gray-600"/>
          </button>
          <button className="p-2 bg-gray-100 rounded-lg" onClick={() => navigate(`/innerChart/${indicesTicker}`)}>
            <Maximize2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockChartMH;