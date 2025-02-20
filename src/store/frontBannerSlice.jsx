import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `https://api-avsr.konceptsdandd.com/banner`;

export const fetchFrontBanners = createAsyncThunk(`banner/fetchFrontBanners`, async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
}) 

const initialState = {
    banners:[],
    status:"idle",
    error:null,
}

export const frontBannerSlice = createSlice({
    name:'frontBanner',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchFrontBanners.pending, (state,action)=>{
                state.status = "loading";
            })
            .addCase(fetchFrontBanners.rejected, (state,action)=>{
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(fetchFrontBanners.fulfilled, (state,action)=>{
                state.status = "succeeded"
                state.banners = action.payload
            })
    }
})

export default frontBannerSlice.reducer;
export const selectFrontBanner = (state) => state.frontBanner.banners;
export const selectFrontBannerStatus = (state) => state.frontBanner.status;