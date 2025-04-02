import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWatchlistApiData = createAsyncThunk('fetchWatchlistApiData', async (_, { getState }) => {
        const state = getState().watchlistApiData;
        let response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_multiple_historical_data/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "tickers": state.tickers,
                "period": "1d",
                "interval": "1m",
            })
        });
        return response.json();
    }
);

const watchlistApiSlice = createSlice({
    name: 'watchlistApiData',
    initialState: {
        isLoading: false,
        tickers: ["RELIANCE.NS", "TCS.NS", "ADANIPOWER.NS","^NSEBANK", "^NSEI", "^BSESN"],
        data: null,
        isError: false
    },
    reducers: {
        setTickers: (state, action) => {
            state.tickers = [...state.tickers, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchlistApiData.pending, (state) => {
                state.isLoading = true;
                
            })
            .addCase(fetchWatchlistApiData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                
            })
            .addCase(fetchWatchlistApiData.rejected, (state) => {
                console.log('Error fetching data', state.tickers);
                state.isError = true;
               
            });
    }
});

export const { setTickers } = watchlistApiSlice.actions;

export default watchlistApiSlice.reducer;