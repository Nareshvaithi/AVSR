import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "https://api-avsr.konceptsdandd.com/ads";

export const fetchAddsBanners = createAsyncThunk(
  "ads/fetchAddBanners",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

//add new records in banner....................
export const addHomeAds = createAsyncThunk(
  "ads/addHomeAds",
  async (bannerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, bannerData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("succes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding banner");
    }
  }
);

export const deleteHomeAds = createAsyncThunk(
  "ads/deleteHomeAds",
  async (bannerId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${bannerId}`);
      console.log("Success: Banner deleted", bannerId);
      return bannerId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting banner");
    }
  }
);

const initialState = {
  addsBanners: [],
  status: "idle",
  error: null,
};

const bannersSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddsBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addsBanners = action.payload;
      })
      .addCase(fetchAddsBanners.pending, (state, action) => {
        state.status = "loading";
      })
        //for adding banner images...................................
        .addCase(addHomeAds.pending, (state) => {
            state.status = "loading";
        })
        .addCase(addHomeAds.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.addsBanners = [...state.addsBanners, action.payload]
            toast.success("Add Successful!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
        })
        .addCase(addHomeAds.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
            toast.error("Add Failed");
        })
     
      //for deleting banner images........................
      .addCase(deleteHomeAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteHomeAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addsBanners = state.addsBanners.filter(
          (banner) => banner._id !== action.payload
        );
        toast.success("Delete Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });

      })
      .addCase(deleteHomeAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Delete Failed");
      });
  },
});

export default bannersSlice.reducer;
export const selectAddsBanners = (state) => state.banners.addsBanners;
