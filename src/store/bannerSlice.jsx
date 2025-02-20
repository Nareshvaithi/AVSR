import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'https://api-avsr.konceptsdandd.com/ads';

export const fetchAddsBanners = createAsyncThunk('ads/fetchAddBanners', async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
}) 

const initialState = {
    addsBanners:[],
    status:"idle",
    error:null,
}

const bannersSlice = createSlice({
    name:'banners',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAddsBanners.fulfilled, (state,action)=>{
                state.status = 'succeeded';
                state.addsBanners = action.payload;
            })
            .addCase(fetchAddsBanners.pending, (state,action)=>{
                state.status = 'loading';
            })
    }
})

export default bannersSlice.reducer;
export const selectAddsBanners = (state)=>state.banners.addsBanners;