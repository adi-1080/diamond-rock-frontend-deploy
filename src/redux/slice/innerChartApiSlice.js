import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchInnerChartApiData = createAsyncThunk('fetchInnerChartApiData', async (_, { getState }) => {
        const state = getState().innerChartApiData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.ticker}/?${state.parameters}`);
        return response.json();
    }
);

const innerChartApiSlice = createSlice({
    name: 'innerChartApiData',
    initialState: {
        isLoading: false,
        ticker: 'RELIANCE.NS',
        tickerDetails: {
            companyName: 'Reliance Industries Limited',
            market: 'NSE'
        },
        parameters: "period=max&interval=1d",
        dataInstance: {
            open: 0,
            high: 0,
            low: 0,
            close: 0,
            change: 0,
            changePercent: 0,
            volume: 0,
        },
        data: null,
        chartViewControls: {
            showVolume: true,
            showCandle: true,
        },
        isError: false
    },
    reducers: {
        setTicker: (state, action) => {
            state.ticker = action.payload;
        },
        setTickerDetails: (state, action) => {
            state.tickerDetails = action.payload;
        },
        setParameters: (state, action) => {
            state.parameters = action.payload;
        },
        setDataInstance: (state, action) => {
            state.dataInstance = action.payload;
        },
        setChartViewControls: (state, action) => {
            state.chartViewControls = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInnerChartApiData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInnerChartApiData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchInnerChartApiData.rejected, (state) => {
                console.log('Error fetching data', state.ticker);
                state.isError = true;
            });
    }
});

export const { setTicker, setTickerDetails, setParameters, setDataInstance, setChartViewControls } = innerChartApiSlice.actions;

export default innerChartApiSlice.reducer;