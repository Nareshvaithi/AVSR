import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = `https://api-avsr.konceptsdandd.com/latestCollections`;
const initialState = {
    title:"Latest Collections",
    latest:[],
    status:'idle',
    error:null,
}

export const fetchLatestCollections = createAsyncThunk('latestCollections/fetchLatestCollections', async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
})

export const latestCollectionsSlice = createSlice({
    name:'latestCollections',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchLatestCollections.pending,(state,action)=>{
                state.status = "loading";
            })
            .addCase(fetchLatestCollections.rejected,(state,action)=>{
                state.status = "failed";
            })
            .addCase(fetchLatestCollections.fulfilled,(state,action)=>{
                state.status = "succeeded";
                state.latest = action.payload;
                console.log(action.payload);
            })
    }
})

export default latestCollectionsSlice.reducer;
export const latestCollectionTitle = (state)=> state.latestCollections.title;
export const latestCollections = (state)=> state.latestCollections.latest;
