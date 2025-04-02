import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { fetchstockEdgePriceChartApiData, setParameters} from '../../redux/slice/stockEgdePriceChartApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const CandleStickStockChart = ({ period, setChartLow, setChartHigh}) => {
  const dispatch = useDispatch();
  const AreaHistogramData = useSelector(state => state.stockEdgePriceChartApiData.data) || [];
  const ticker = useSelector(state => state.stockEdgePriceChartApiData.ticker);
  const chartContainerRef = useRef(null);
  
  useEffect(() => {
    dispatch(fetchstockEdgePriceChartApiData());
  }, [ticker]);

  useEffect(() => {
    if (period === "1D") {
      dispatch(setParameters("period=1d&interval=1m"));
      dispatch(fetchstockEdgePriceChartApiData());
    } else if (period === '1W') {
      dispatch(setParameters("period=1wk&interval=5m"));
      dispatch(fetchstockEdgePriceChartApiData());
    } else if(period === '1M') {
      dispatch(setParameters("period=1mo&interval=5m"));
      dispatch(fetchstockEdgePriceChartApiData());
    } else if(period === '10Y') {
      dispatch(setParameters("period=10y&interval=1mo"));
      dispatch(fetchstockEdgePriceChartApiData());
    } else {
      dispatch(setParameters("period=10y&interval=1d"));
      dispatch(fetchstockEdgePriceChartApiData());
    }
  }, [period]);      

  const DateFormula = {
    paramNow: (item) => {
      if (period === '3M' || period === '6M' || period === '1Y' || period === '2Y' || period === '5Y' || period === '10Y') {
        return Date.parse(item.Date.split(' ')[0]) / 1000;
      } else {
        return Math.floor(new Date(Date.parse(item.Datetime) + 19800000).getTime() / 1000);
      }
    },
    paramYTD: () => {
      const currentYear = new Date().getFullYear();
      if (period === '3M' || period === '6M' || period === '1Y' || period === '2Y' || period === '5Y' || period === '10Y') {
        return Date.parse(`${currentYear}-01-01`) / 1000;
      } else {
        return Math.floor(new Date(Date.parse(`${currentYear}-01-01T9:15:00Z`) + 19800000).getTime() / 1000);
      }
    },
    paramDefault: () => {
      if (period === '3M' || period === '6M' || period === '1Y' || period === '2Y' || period === '5Y' || period === '10Y') {
        return Date.parse("1996-01-01") / 1000;
      } else {
        return Math.floor(new Date(Date.parse("1996-01-01T9:15:00Z") + 19800000).getTime() / 1000);
      }
    },
    paramCandleTime: (item) => {
      if (period === '3M' || period === '6M' || period === '1Y' || period === '2Y' || period === '5Y' || period === '10Y') {
        return item.Date.split(' ')[0];
      } else {
        return Math.floor(new Date(Date.parse(item.Datetime) + 19800000).getTime() / 1000);
      }
    }
  }

  // Calculate visible range based on selectedPeriod
  const calculateVisibleRange = (period, formattedData) => {
    const now = DateFormula.paramNow(AreaHistogramData[AreaHistogramData.length - 1]);// Current time in seconds
    let startTime;

    switch (period) {
      case '1D': // Last 1 day
        startTime = now - 24 * 60 * 60;
        break
      case '1W': // Last 5 days
        startTime = now - 7 * 24 * 60 * 60;
        break;
      case '1M': // Last 1 month (approx 30 days)
        startTime = now - 30 * 24 * 60 * 60;
        break;
      case '3M': // Last 3 months
        startTime = now - 90 * 24 * 60 * 60;
        break;
      case '6M': // Last 6 months
        startTime = now - 180 * 24 * 60 * 60;
        break;
      case '1Y': // Last 1 year
        startTime = now - 365 * 24 * 60 * 60;
        break;
      case '2Y': // Year to date
        startTime = now - 2 * 365 * 24 * 60 * 60;
        break;
      case '5Y': // Last 5 years
        startTime = now - 5 * 365 * 24 * 60 * 60;
        break;
      default: // Show all data
        startTime = DateFormula.paramDefault();
        break;
    }
    // Filter data within the visible range
    const visibleData = formattedData.filter((data) => {
        if (period === '3M' || period === '6M' || period === '1Y' || period === '2Y' || period === '5Y' || period === '10Y') {
          const paramNow = Date.parse(data.time) / 1000;
          return paramNow >= startTime && paramNow <= now;
        } 
        return data.time >= startTime && data.time <= now
      }
    );

    // Find min "Low" and max "High" within visible range
    const minLow = Math.min(...visibleData.map(data => data.low));
    const maxHigh = Math.max(...visibleData.map(data => data.high));
    console.log(minLow, maxHigh);
    setChartLow(minLow.toFixed(2));
    setChartHigh(maxHigh.toFixed(2));

    return { from: startTime, to: now };
  };


  useEffect(() => {
    if (!chartContainerRef.current || !AreaHistogramData.length) return;
    const chartOptions = {
      layout: {
        attributionLogo: false,
        background: { type: 'solid', color: '#ffffff' },
        textColor: '#333333',
        fontSize: 12,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: '#758696',
          style: 3,
        },
        horzLine: {
          width: 1,
          color: '#758696',
          style: 3,
        },
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
    }

    const chart = createChart(chartContainerRef.current, chartOptions);

    const formattedData = AreaHistogramData.map(item => ({
      time: DateFormula.paramCandleTime(item),
      open: item.Open,
      high: item.High,
      low: item.Low,
      close: item.Close,
      volume: item.Volume,
    }));

    const curveColor = () => {
      if (formattedData[0].close > formattedData[formattedData.length - 1].close) {
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
      formattedData.map((item) => ({
        time: item.time,
        value: item.close,
      }))
    );

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#787e7d',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // set as an overlay by setting a blank priceScaleId
    // set the positioning of the volume series
    scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
    },
    });
    
    const volumeData = formattedData.map(item => ({
      time: item.time,
      value: item.volume,
    }));

    volumeSeries.setData(volumeData);

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0, // lowest point will be at the very bottom.
      },
    });

    chart.timeScale().setVisibleRange(calculateVisibleRange(period, formattedData));

    return () => {
      chart.remove();
    };
  }, [AreaHistogramData]);

  return (
    <div className="relative w-full h-full">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default CandleStickStockChart;