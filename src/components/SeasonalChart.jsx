import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const SeasonalChart = () => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    const chart = createChart(chartContainerRef.current, {
      layout: {
        attributionLogo: false,
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      bottomTimeScale: {
        visible: true, // Hide time axis
      },
      rightPriceScale: {
        visible: false,
    },
      watermark: {
        visible: false, // Ensure no watermark (like TradingView logo)
      },
    });

    const generateLineData = (numberOfPoints = 500) => {
      let randomFactor = 25 + Math.random() * 25;
      const res = [];
      const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
      
      for (let i = 0; i < numberOfPoints; ++i) {
        const time = Math.floor(date.getTime() / 1000);
        const value = i * (0.5 +
          Math.sin(i / 10) * 0.2 +
          Math.sin(i / 20) * 0.4 +
          Math.sin(i / randomFactor) * 0.8 +
          Math.sin(i / 500) * 0.5) + 200;
        
        res.push({ time, value });
        date.setUTCDate(date.getUTCDate() + 1);
      }
      return res;
    };

    const lineSeriesOne = chart.addLineSeries({ color: '#2962FF' });
    const lineSeriesTwo = chart.addLineSeries({ color: 'rgb(225, 87, 90)' });
    const lineSeriesThree = chart.addLineSeries({ color: 'rgb(242, 142, 44)' });

    lineSeriesOne.setData(generateLineData());
    lineSeriesTwo.setData(generateLineData());
    lineSeriesThree.setData(generateLineData());

    chart.timeScale().fitContent();
    
    return () => chart.remove();
  }, []);

  return <div ref={chartContainerRef} className="w-full h-80 bg-white shadow-md rounded-lg" />;
};

export default SeasonalChart;
