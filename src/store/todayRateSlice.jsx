import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  todayAllRates: [],
  goldPrice: 0,
  silverPrice: 0,
  status: "idle",
  error: null,
};

const API_URL = "https://api-avsr.konceptsdandd.com/rate";

export const fetchTodayRate = createAsyncThunk(
  "rate/fetchTodayRate",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addRate = createAsyncThunk(
  "rate/addRate",
  async (rateData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, rateData);
      console.log("succes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding banner");
    }
  }
);

export const deleteRate = createAsyncThunk(
  "rate/deleteRate",
  async (rateId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${rateId}`);
      console.log("Success: Rate deleted", rateId);
      return rateId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting Rate");
    }
  }
);

export const editRate = createAsyncThunk(
  "rate/editRate",
  async ({ _id, ...updatedData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${_id}`, updatedData);
      console.log("Success: Rate Edited", _id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error Editing Rate");
    }
  }
);

const todayRateSlice = createSlice({
  name: "todayRate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodayRate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodayRate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTodayRate.fulfilled, (state, action) => {
        state.todayAllRates = action.payload;
        const getGoldPrice = state.todayAllRates.find(
          ({ category_name }) => category_name === "Gold" || "gold"
        );
        const getSilverPrice = state.todayAllRates.find(
          ({ category_name }) => category_name === "Silver" || "silver"
        );
        state.goldPrice = getGoldPrice.rate;
        state.silverPrice = getSilverPrice.rate;
      })
      //for adding rates...................................
      .addCase(addRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todayAllRates = [...state.todayAllRates, action.payload];
      })
      .addCase(addRate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //for deleting rate........................
      .addCase(deleteRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todayAllRates = state.todayAllRates.filter(
          (rate) => rate._id !== action.payload
        );
      })
      .addCase(deleteRate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })


      //for editing rate........................
      .addCase(editRate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editRate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todayAllRates = state.todayAllRates.map((rate) =>
            rate._id === action.payload._id ? action.payload : rate
        );
    })      
      .addCase(editRate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default todayRateSlice.reducer;
export const getGoldRate = (state) => state.todayRate.goldPrice;
export const getSliverRate = (state) => state.todayRate.silverPrice;
