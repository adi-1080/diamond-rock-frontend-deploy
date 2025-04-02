import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchstockEdgePriceChartApiData = createAsyncThunk('fetchInnerChartApiData', async (_, { getState }) => {
        const state = getState().stockEdgePriceChartApiData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.ticker}/?${state.parameters}`);
        return response.json();
    }
);

const stockEdgePriceChartApiSlice = createSlice({
    name: 'stockEdgePriceChartApiData',
    initialState: {
        isLoading: false,
        ticker: 'RELIANCE.NS',
        // tickerDetails: {
        //     companyName: 'Reliance Industries Limited',
        //     market: 'NSE'
        // },
        parameters: "period=1d&interval=1m",
        data: null,
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchstockEdgePriceChartApiData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchstockEdgePriceChartApiData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchstockEdgePriceChartApiData.rejected, (state) => {
                console.log('Error fetching data', state.ticker);
                state.isError = true;
            });
    }
});

export const { setTicker, setParameters } =stockEdgePriceChartApiSlice.actions;

export default stockEdgePriceChartApiSlice.reducer;