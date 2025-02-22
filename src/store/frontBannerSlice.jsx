import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `https://api-avsr.konceptsdandd.com/banner`;

export const fetchFrontBanners = createAsyncThunk(`banner/fetchFrontBanners`, async ()=>{
    const response = await axios.get(API_URL);
    return response.data;
}) 

export const addBanner = createAsyncThunk(
    "frontBanner/addBanner",
    async (bannerData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, bannerData, {
                headers: { "Content-Type": "multipart/form-data" }, 
            });
            console.log("succes")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error adding banner");
        }
    }
);


export const deleteBanner = createAsyncThunk("frontBanner/deleteBanner", async (bannerId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/${bannerId}`);
        console.log("Success: Banner deleted",bannerId);
        return bannerId; 
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error deleting banner");
    }
});

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

        //for fetching banner Images...........................
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

            //for adding banner images...................................
            .addCase(addBanner.pending, (state) => {
                state.status = "loading"; 
            })
            .addCase(addBanner.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.banners = [...state.banners, action.payload]

                toast.success("Add Successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
          
            })
            .addCase(addBanner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                toast.error("Add Failed");
            })
            //for deleting banner images........................
            .addCase(deleteBanner.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteBanner.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.banners = state.banners.filter((banner) => banner._id !== action.payload);
                toast.success("Delete Successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .addCase(deleteBanner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                toast.error("Delete Failed");
            });
    }
})

export default frontBannerSlice.reducer;
export const selectFrontBanner = (state) => state.frontBanner.banners;
export const selectFrontBannerStatus = (state) => state.frontBanner.status;