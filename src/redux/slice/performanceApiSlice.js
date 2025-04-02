import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPerformanceApiData = createAsyncThunk('fetchPerformanceApiData', async (_, { getState }) => {
        const state = getState().performanceData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.pTicker}/?period=1y&interval=1d`);
        return response.json();
    }
);

const performanceApiSlice = createSlice({
    name: 'performanceData',
    initialState: {
        isLoading: false,
        pTicker: 'RELIANCE.NS',
        data: null,
        isError: false
    },
    reducers: {
        setPTicker: (state, action) => {
            state.pTicker = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPerformanceApiData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPerformanceApiData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchPerformanceApiData.rejected, (state) => {
                console.log('Error fetching data', state.pTicker);
                state.isError = true;
            });
    }
});

export const { setPTicker } = performanceApiSlice.actions;

export default performanceApiSlice.reducer;