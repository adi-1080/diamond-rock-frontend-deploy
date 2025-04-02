import { configureStore } from '@reduxjs/toolkit';
import innerChartApiReducer from './slice/innerChartApiSlice';
import performanceDataReducer from './slice/performanceApiSlice';
import watchlistApiReducer from './slice/watchlistApiSlice';
import stockScreenerOverviewApiReducer from './slice/stockScreenerOverviewApiSlice';
import chartHomeApiReducer from './slice/chartHomeApiSlice';
import stockEdgePriceChartApiReducer from './slice/stockEgdePriceChartApiSlice';

export const store = configureStore({
  reducer: {
    innerChartApiData: innerChartApiReducer,
    performanceData: performanceDataReducer,
    watchlistApiData: watchlistApiReducer,
    stockScreenerOverviewApiData: stockScreenerOverviewApiReducer,
    chartHomeApiData: chartHomeApiReducer,
    stockEdgePriceChartApiData: stockEdgePriceChartApiReducer
  }
});