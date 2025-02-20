import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    todayAllRates:[],
    goldPrice:0,
    silverPrice:0,
    status:"idle",
    error:null
}

const API_URL = "https://api-avsr.konceptsdandd.com/rate"

export const fetchTodayRate = createAsyncThunk('rate/fetchTodayRate', async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
})

const todayRateSlice = createSlice({
    name:'todayRate',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchTodayRate.pending, (state,action)=>{
                state.status = "loading";
            })
            .addCase(fetchTodayRate.rejected, (state,action)=>{
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchTodayRate.fulfilled,(state,action)=>{
                state.todayAllRates = action.payload;
                const getGoldPrice = state.todayAllRates.find(({category_name}) => category_name === "Gold" || "gold");
                const getSilverPrice = state.todayAllRates.find(({category_name}) => category_name === "Silver" || "silver");
                state.goldPrice = getGoldPrice.rate;
                state.silverPrice = getSilverPrice.rate;             
            })
    }
})

export default todayRateSlice.reducer;
export const getGoldRate = (state) => state.todayRate.goldPrice;
export const getSliverRate = (state) => state.todayRate.silverPrice;