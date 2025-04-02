import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStockScreenerOverviewApiData = createAsyncThunk('fetchStockScreenerOverviewApiData', async (_, { getState }) => {
        const state = getState().stockScreenerOverviewApiData;
        let response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_stock_screener_data/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "tickers": state.tickers,
                
            })
        });
        return response.json();
    }
);

export const fetchStockScreenerOptions = createAsyncThunk('fetchStockScreenerOptions', async (_, { getState }) => {
    const state = getState().stockScreenerOverviewApiData;
    const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/screener/${state.option}`);
    return response.json();
}
);

const stockScreenerOverviewApiSlice = createSlice({
    name: 'stockScreenerOverviewApiData',
    initialState: {
        isLoading: false,
        tickers: ["AAPL","MSFT", "GOOGL","NVDA","AMZN","META","TSLA","AVGO","LLY","WMT"],
        data: null,
        isError: false,
        option: null,
        isOptionLoading: false,
        optionData: null
    },
    reducers: {
        setTickers: (state, action) => {
            state.tickers = [...state.tickers, action.payload];
        },
        setOption: (state, action) => {
            state.option = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStockScreenerOverviewApiData.pending, (state) => {
                state.isLoading = true;
                
            })
            .addCase(fetchStockScreenerOverviewApiData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                
            })
            .addCase(fetchStockScreenerOverviewApiData.rejected, (state) => {
                console.log('Error fetching data', state.tickers);
                state.isError = true;
               
            })
            .addCase(fetchStockScreenerOptions.pending, (state) => {
                state.isOptionLoading = true;
            })
            .addCase(fetchStockScreenerOptions.fulfilled, (state, action) => {
                state.isOptionLoading = false;
                state.optionData = action.payload;
            })
            .addCase(fetchStockScreenerOptions.rejected, (state) => {
                state.isError = true;
            });
    }
});

export const { setTickers, setOption } = stockScreenerOverviewApiSlice.actions;

export default stockScreenerOverviewApiSlice.reducer;