import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createChart } from "lightweight-charts";
import {
  fetchChartHomeApiDataIndices,
  setTickerIndices,
  setParametersIndices,
  fetchChartHomeApiDataStocks,
  setTickerStocks,
  setParametersStocks,
  fetchChartHomeApiDataCrypto,
  setTickerCrypto,
  setParametersCrypto,
  fetchChartHomeApiDataFutures,
  setTickerFutures,
  setParametersFutures,
  fetchChartHomeApiDataForex,
  setTickerForex,
  setParametersForex,
  fetchChartHomeApiDataEtf,
  setTickerEtf,
  setParametersEtf,
} from "../../redux/slice/chartHomeApiSlice";

const StockChart = ({ type, period, isCandle, ticker }) => {
  const chartContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const data = useSelector((state) => state.chartHomeApiData[type]) || [];
  const dispatch = useDispatch();

  const actionMap = {
    indices: [
      fetchChartHomeApiDataIndices,
      setTickerIndices,
      setParametersIndices,
    ],
    stocks: [fetchChartHomeApiDataStocks, setTickerStocks, setParametersStocks],
    crypto: [fetchChartHomeApiDataCrypto, setTickerCrypto, setParametersCrypto],
    futures: [
      fetchChartHomeApiDataFutures,
      setTickerFutures,
      setParametersFutures,
    ],
    forex: [fetchChartHomeApiDataForex, setTickerForex, setParametersForex],
    etf: [fetchChartHomeApiDataEtf, setTickerEtf, setParametersEtf],
  };

  useEffect(() => {
    dispatch(actionMap[type][1](ticker));
  }, [ticker]);

  useEffect(() => {
    dispatch(actionMap[type][0]());
  }, [ticker]);

  useEffect(() => {
    if (period === "1D") {
      dispatch(actionMap[type][2]("period=1d&interval=1m"));
      dispatch(actionMap[type][0]());
    } else if (period === "1M") {
      dispatch(actionMap[type][2]("period=1mo&interval=30m"));
      dispatch(actionMap[type][0]());
    } else if (period === "3M") {
      dispatch(actionMap[type][2]("period=3mo&interval=1h"));
      dispatch(actionMap[type][0]());
    } else if (period === "1Y") {
      dispatch(actionMap[type][2]("period=1y"));
      dispatch(actionMap[type][0]());
    } else if (period === "5Y") {
      dispatch(actionMap[type][2]("period=5y"));
      dispatch(actionMap[type][0]());
    } else {
      dispatch(actionMap[type][2]("period=max"));
      dispatch(actionMap[type][0]());
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
    <div 
      ref={chartContainerRef} 
      style={{ 
        width: "100%", 
        height: "400px", 
        position: "relative", 
        overflow: "hidden" 
      }} 
    />
  );
};

export default StockChart;