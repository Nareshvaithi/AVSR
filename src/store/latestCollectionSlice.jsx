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

//add data...........................
export const addLatestData = createAsyncThunk(
    "ads/addLatestData",
    async (latestData, { rejectWithValue }) => {
      try {
        const response = await axios.post(API_URL, latestData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("succes");
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error adding banner");
      }
    }
  );
  

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
                    //for adding latest collections details and images...................................
                    .addCase(addLatestData.pending, (state) => {
                        state.status = "loading";
                    })
                    .addCase(addLatestData.fulfilled, (state, action) => {
                        state.status = "succeeded";
                        state.latest = [...state.latest, action.payload]
                    })
                    .addCase(addLatestData.rejected, (state, action) => {
                        state.status = "failed";
                        state.error = action.payload;
                    })
            
    }
})

export default latestCollectionsSlice.reducer;
export const latestCollectionTitle = (state)=> state.latestCollections.title;
export const latestCollections = (state)=> state.latestCollections.latest;
