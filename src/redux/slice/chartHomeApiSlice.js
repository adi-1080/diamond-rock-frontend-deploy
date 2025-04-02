import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const tabTickers = [
    "^SPX", "^NDX", "^DJI", "^IXIC", "^NSEI", "^CNX100", "^NSEBANK", "^CNXFMCG", "BSE-500.BO", "BSE-OILGAS.BO", "BSE-POWER.BO",
    "NVDA", "TSLA", "MSFT", "AAPL", "GOOGL", "INTC", "RELIANCE.NS", "WIPRO.NS", "NFLX", "COIN", "BABA",
    "BTC-USD", "ETH-USD", "BNB-USD", "ADA-USD", "DOGE-USD", "XRP-USD", "LTC-USD", "SOL1-USD", "DOT1-USD", "UNI3-USD", "LINK-USD",
    "GC=F", "SI=F", "MHG=F", "QM=F", "NQ=F", "ES=F", "YM=F", "RTY=F", "CL=F", "NG=F", "HG=F",
    "EURUSD=X", "GBPUSD=X", "USDJPY=X", "AUDUSD=X", "USDCAD=X", "USDINR=X", "USDZAR=X", "USDCNY=X", "USDHKD=X", "USDCHF=X", "USDSEK=X",
    "SPY", "QQQ", "DIA", "IWM", "XLF", "XLV", "XLE", "XLY", "XLC", "XLI", "XLU"
];

export const fetchChartHomeApiDataIndices = createAsyncThunk('fetchchartHomeApiDataIndices', async (_, { getState }) => {
        const state = getState().chartHomeApiData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.tickerIndices}/?${state.parametersIndices}`);
        return response.json();
    }
);
export const fetchChartHomeApiDataStocks = createAsyncThunk('fetchchartHomeApiDataStocks', async (_, { getState }) => {
        const state = getState().chartHomeApiData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.tickerStocks}/?${state.parametersStocks}`);
        return response.json();
    }
);
export const fetchChartHomeApiDataCrypto = createAsyncThunk('fetchchartHomeApiDataCrypto', async (_, { getState }) => {
        const state = getState().chartHomeApiData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.tickerCrypto}/?${state.parametersCrypto}`);
        return response.json();
    }
);
export const fetchChartHomeApiDataFutures = createAsyncThunk('fetchchartHomeApiDataFutures', async (_, { getState }) => {
        const state = getState().chartHomeApiData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.tickerFutures}/?${state.parametersFutures}`);
        return response.json();
    }
);
export const fetchChartHomeApiDataForex = createAsyncThunk('fetchchartHomeApiDataForex', async (_, { getState }) => {
        const state = getState().chartHomeApiData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.tickerForex}/?${state.parametersForex}`);
        return response.json();
    }
);
export const fetchChartHomeApiDataEtf = createAsyncThunk('fetchchartHomeApiDataEtf', async (_, { getState }) => {
        const state = getState().chartHomeApiData;
        const response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_historical_data/${state.tickerEtf}/?${state.parametersEtf}`);
        return response.json();
    }
);
export const fetchChartHomeTabData = createAsyncThunk('fetchChartHomeTabData', async (_,) => {
    let response = await fetch(`https://diamond-rock-django-backend1.onrender.com/api/get_charthome_tab_data/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "tickers": tabTickers,
        })
    });
    return response.json();
}
);

const chartHomeApiSlice = createSlice({
    name: 'chartHomeApiData',
    initialState: {
        isLoadingIndices: false,
        isErrorIndices: false,
        isLoadingStocks: false,
        isErrorStocks: false,
        isLoadingCrypto: false,
        isErrorCrypto: false,
        isLoadingFutures: false,
        isErrorFutures: false,
        isLoadingForex: false,
        isErrorForex: false,
        isLoadingEtf: false,
        isErrorEtf: false,
        isLoadingTabData: false,
        isErrorTabData: false,
        tickerIndices: '^SPX',
        parametersIndices: "period=1d&interval=1m",
        tickerStocks: 'NVDA',
        parametersStocks: "period=1d&interval=1m",
        tickerCrypto: 'BTC-USD',
        parametersCrypto: "period=1d&interval=1m",
        tickerFutures: 'GC=F',
        parametersFutures: "period=1d&interval=1m",
        tickerForex: 'EURUSD=X',
        parametersForex: "period=1d&interval=1m",
        tickerEtf: 'SPY',
        parametersEtf: "period=1d&interval=1m",
        indices: null,
        stocks: null,
        crypto: null,
        futures: null,
        forex: null,
        etf: null,
        tabData: null,
        showModal: false,
        searchTerm: ""
    },
    reducers: {
        setTickerIndices: (state, action) => {
            state.tickerIndices = action.payload;
        },
        setParametersIndices: (state, action) => {
            state.parametersIndices = action.payload;
        },
        setTickerStocks: (state, action) => {
            state.tickerStocks = action.payload;
        },
        setParametersStocks: (state, action) => {
            state.parametersStocks = action.payload;
        },
        setTickerCrypto: (state, action) => {
            state.tickerCrypto = action.payload;
        },
        setParametersCrypto: (state, action) => {
            state.parametersCrypto = action.payload;
        },
        setTickerFutures: (state, action) => {
            state.tickerFutures = action.payload;
        },
        setParametersFutures: (state, action) => {
            state.parametersFutures = action.payload;
        },
        setTickerForex: (state, action) => {
            state.tickerForex = action.payload;
        },
        setParametersForex: (state, action) => {
            state.parametersForex = action.payload;
        },
        setTickerEtf: (state, action) => {
            state.tickerEtf = action.payload;
        },
        setParametersEtf: (state, action) => {
            state.parametersEtf = action.payload;
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChartHomeApiDataIndices.pending, (state) => {
                state.isLoadingIndices = true;
            })
            .addCase(fetchChartHomeApiDataIndices.fulfilled, (state, action) => {
                state.isLoadingIndices = false;
                state.indices = action.payload;
            })
            .addCase(fetchChartHomeApiDataIndices.rejected, (state) => {
                console.log('Error fetching data', state.tickerIndices);
                state.isErrorIndices = true;
            })
            .addCase(fetchChartHomeApiDataStocks.pending, (state) => {
                state.isLoadingStocks = true;
            })
            .addCase(fetchChartHomeApiDataStocks.fulfilled, (state, action) => {
                state.isLoadingStocks = false;
                state.stocks = action.payload;
            })
            .addCase(fetchChartHomeApiDataStocks.rejected, (state) => {
                console.log('Error fetching data', state.tickerStocks);
                state.isErrorStocks = true;
            })
            .addCase(fetchChartHomeApiDataCrypto.pending, (state) => {
                state.isLoadingCrypto = true;
            })
            .addCase(fetchChartHomeApiDataCrypto.fulfilled, (state, action) => {
                state.isLoadingCrypto = false;
                state.crypto = action.payload;
            })
            .addCase(fetchChartHomeApiDataCrypto.rejected, (state) => {
                console.log('Error fetching data', state.tickerCrypto);
                state.isErrorCrypto = true;
            })
            .addCase(fetchChartHomeApiDataFutures.pending, (state) => {
                state.isLoadingFutures = true;
            })
            .addCase(fetchChartHomeApiDataFutures.fulfilled, (state, action) => {
                state.isLoadingFutures = false;
                state.futures = action.payload;
            })
            .addCase(fetchChartHomeApiDataFutures.rejected, (state) => {
                console.log('Error fetching data', state.tickerFutures);
                state.isErrorFutures = true;
            })
            .addCase(fetchChartHomeApiDataForex.pending, (state) => {
                state.isLoadingForex = true;
            })
            .addCase(fetchChartHomeApiDataForex.fulfilled, (state, action) => {
                state.isLoadingForex = false;
                state.forex = action.payload;
            })
            .addCase(fetchChartHomeApiDataForex.rejected, (state) => {
                console.log('Error fetching data', state.tickerForex);
                state.isErrorForex = true;
            })
            .addCase(fetchChartHomeApiDataEtf.pending, (state) => {
                state.isLoadingEtf = true;
            })
            .addCase(fetchChartHomeApiDataEtf.fulfilled, (state, action) => {
                state.isLoadingEtf = false;
                state.etf = action.payload;
            })
            .addCase(fetchChartHomeApiDataEtf.rejected, (state) => {
                console.log('Error fetching data', state.tickerEtf);
                state.isErrorEtf = true;
            })
            .addCase(fetchChartHomeTabData.pending, (state) => {
                state.isLoadingTabData = true;
            })
            .addCase(fetchChartHomeTabData.fulfilled, (state, action) => {
                state.isLoadingTabData = false;
                state.tabData = action.payload;
            })
            .addCase(fetchChartHomeTabData.rejected, (state) => {
                console.log('Error fetching data', tabTickers);
                state.isErrorTabData = true;
            });
    }
});

export const { 
    setTickerIndices, setParametersIndices, 
    setTickerStocks, setParametersStocks, 
    setTickerCrypto, setParametersCrypto,
    setTickerFutures, setParametersFutures,
    setTickerForex, setParametersForex,
    setTickerEtf, setParametersEtf,
    setShowModal, setSearchTerm
} = chartHomeApiSlice.actions;

export default chartHomeApiSlice.reducer;