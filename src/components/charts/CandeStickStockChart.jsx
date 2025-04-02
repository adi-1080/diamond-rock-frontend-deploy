import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { fetchInnerChartApiData, setParameters, setDataInstance } from '../../redux/slice/innerChartApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const CandleStickStockChart = (props) => {
  const dispatch = useDispatch();
  const candleStickData = useSelector(state => state.innerChartApiData.data) || [];
  const ticker = useSelector(state => state.innerChartApiData.ticker);
  const { showVolume, showCandle } = useSelector(state => state.innerChartApiData.chartViewControls);
  const chartContainerRef = useRef(null);
  
  useEffect(() => {
    dispatch(fetchInnerChartApiData());
  }, [ticker]);

  useEffect(() => {
    if (props.selectedPeriod === '1 minute' || props.selectedPeriod === '1D') {
      dispatch(setParameters("period=1d&interval=1m"));
      dispatch(fetchInnerChartApiData());
    } else if (props.selectedPeriod === '2 minutes') {
      dispatch(setParameters("period=1d&interval=2m"));
      dispatch(fetchInnerChartApiData());
    } else if(props.selectedPeriod==='5 minutes' || props.selectedPeriod === '5D' || props.selectedPeriod === '1M') {
      dispatch(setParameters("period=1mo&interval=5m"));
      dispatch(fetchInnerChartApiData());
    } else if (props.selectedPeriod === '15 minutes' || props.selectedPeriod === '30 minutes' || props.selectedPeriod === '60 minutes') {
      dispatch(setParameters(`period=1mo&interval=${props.selectedPeriod.replace(' minutes', 'm')}`));
      dispatch(fetchInnerChartApiData());
    } else {
      dispatch(setParameters("period=max&interval=1d"));
      dispatch(fetchInnerChartApiData());
    }
  }, [props.selectedPeriod]);

  const DateFormula = {
    paramNow: (item) => {
      if (props.selectedPeriod === '3M' || props.selectedPeriod === '6M' || props.selectedPeriod === 'YTD' || props.selectedPeriod === '1Y' || props.selectedPeriod === '5Y' || props.selectedPeriod === 'All') {
        return Date.parse(item.Date.split(' ')[0]) / 1000;
      } else {
        return Math.floor(new Date(Date.parse(item.Datetime) + 19800000).getTime() / 1000);
      }
    },
    paramYTD: () => {
      const currentYear = new Date().getFullYear();
      if (props.selectedPeriod === '3M' || props.selectedPeriod === '6M' || props.selectedPeriod === 'YTD' || props.selectedPeriod === '1Y' || props.selectedPeriod === '5Y' || props.selectedPeriod === 'All') {
        return Date.parse(`${currentYear}-01-01`) / 1000;
      } else {
        return Math.floor(new Date(Date.parse(`${currentYear}-01-01T9:15:00Z`) + 19800000).getTime() / 1000);
      }
    },
    paramDefault: () => {
      if (props.selectedPeriod === '3M' || props.selectedPeriod === '6M' || props.selectedPeriod === 'YTD' || props.selectedPeriod === '1Y' || props.selectedPeriod === '5Y' || props.selectedPeriod === 'All') {
        return Date.parse("1996-01-01") / 1000;
      } else {
        return Math.floor(new Date(Date.parse("1996-01-01T9:15:00Z") + 19800000).getTime() / 1000);
      }
    },
    paramCandleTime: (item) => {
      if (props.selectedPeriod === '3M' || props.selectedPeriod === '6M' || props.selectedPeriod === 'YTD' || props.selectedPeriod === '1Y' || props.selectedPeriod === '5Y' || props.selectedPeriod === 'All') {
        return item.Date.split(' ')[0];
      } else {
        return Math.floor(new Date(Date.parse(item.Datetime) + 19800000).getTime() / 1000);
      }
    }
  }

  // Calculate visible range based on selectedPeriod
  const calculateVisibleRange = (period) => {
    const now = DateFormula.paramNow(candleStickData[candleStickData.length - 1]);// Current time in seconds
    let startTime;

    switch (period) {
      case '1 minute': 
        startTime = now - 24 * 60 * 60;
        break
      case '2 minutes':
        startTime = now - 24 * 60 * 60;
        break
      case '1D': // Last 1 day
        startTime = now - 24 * 60 * 60;
        break
      case '5D': // Last 5 days
        startTime = now - 5 * 24 * 60 * 60;
        break;
      case '5 minutes':
        startTime = now - 30 * 24 * 60 * 60;
        break;
      case '15 minutes':
        startTime = now - 30 * 24 * 60 * 60;
        break;
      case '30 minutes':
        startTime = now - 30 * 24 * 60 * 60;
        break;
      case '60 minutes': 
        startTime = now - 30 * 24 * 60 * 60;
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
      case 'YTD': // Year to date
        startTime = DateFormula.paramYTD();
        break;
      case '1Y': // Last 1 year
        startTime = now - 365 * 24 * 60 * 60;
        break;
      case '5Y': // Last 5 years
        startTime = now - 5 * 365 * 24 * 60 * 60;
        break;
      default: // Show all data
        startTime = DateFormula.paramDefault();
        break;
    }

    return { from: startTime, to: now };
  };

  useEffect(() => {
    if (!chartContainerRef.current || !candleStickData.length) return;

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
      autoSize: true,
    }

    const chart = createChart(chartContainerRef.current, chartOptions);

    const formattedData = candleStickData.map(item => ({
      time: DateFormula.paramCandleTime(item),
      open: item.Open,
      high: item.High,
      low: item.Low,
      close: item.Close,
      volume: item.Volume,
    }));

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#089981',
      downColor: '#f23645',
      borderVisible: false,
      visible: showCandle,
      wickUpColor: '#089981',
      wickDownColor: '#f23645',
      scaleMargins: {
        top: 0.1, // Make the candlestick series occupy most of the chart
        bottom: 0.4, // Leave space for the volume series
      },
    });

    candlestickSeries.setData(formattedData);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#089981',
      visible: showVolume,
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
      color: item.close > item.open ? '#92d2cc' : '#f7a9a7'
    }));

    volumeSeries.setData(volumeData);

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
          top: 0.7, // highest point of the series will be 70% away from the top
          bottom: 0, // lowest point will be at the very bottom.
      },
    });

    chart.timeScale().setVisibleRange(calculateVisibleRange(props.selectedPeriod));

    // Add price and volume tooltips
    {(showVolume || showCandle) && chart.subscribeCrosshairMove(param => {
      if (param.time) {
        const index = formattedData.findIndex(d => d.time === param.time);
        const data = formattedData[index];
        const previousData = index==0?data:formattedData[index - 1];
        if (data) {
          const newPrice = data.close;
          const priceChange = (newPrice - previousData.close).toFixed(2);
          const priceChangePercentage = ((priceChange / previousData.close) * 100).toFixed(2);
          const volume = (data.volume / 1000000).toFixed(2)
          dispatch(setDataInstance({
            open: data.open.toFixed(2),
            high: data.high.toFixed(2),
            low: data.low.toFixed(2),
            close: newPrice.toFixed(2),
            change: priceChange,
            changePercent: priceChangePercentage,
            volume: volume,
          }));
        }
      }
    });}

    // Make chart responsive
    // const handleResize = () => {
    //   if (chartContainerRef.current) {
    //     chart.applyOptions({
    //       autoSize: true
    //     });
    //   }
    // };

    // window.addEventListener('resize', handleResize);

    return () => {
      chart.remove();
      // window.removeEventListener('resize', handleResize);
    };
  }, [candleStickData, props.showScreener, props.isWatchlistPanelOpen, props.isChartExpanded,
    props.isChartDataViewPanelOpen, showCandle, showVolume]);

  return (
    <div className="relative w-full h-full">
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default CandleStickStockChart;
