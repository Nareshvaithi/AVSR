import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
const initialState = {
  todayAllRates: [],
  goldPrice: 0,
  silverPrice: 0,
  status: "idle",
  editstatus: "Submit",
  deletestatus: "Submit",
  addstatus: "Submit",
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

export const editRateData = createAsyncThunk(
  "rate/editRateData",
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
        state.addstatus = "Proccessing";
      })
      .addCase(addRate.fulfilled, (state, action) => {
        state.addstatus = "Submit";
        state.todayAllRates = [...state.todayAllRates, action.payload];
        toast.success("Add Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
      })
      .addCase(addRate.rejected, (state, action) => {
        state.addstatus = "Submit";
        state.error = action.payload;
        toast.error("Add Failed");
      })

      //for deleting rate........................
      .addCase(deleteRate.pending, (state) => {
        state.deletestatus = "Proccessing";
      })
      .addCase(deleteRate.fulfilled, (state, action) => {
        state.deletestatus = "succeeded";
        state.todayAllRates = state.todayAllRates.filter(
          (rate) => rate._id !== action.payload
        )
        toast.success("Delete Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
      })
      .addCase(deleteRate.rejected, (state, action) => {
        state.deletestatus = "Submit";
        state.error = action.payload;
        toast.error("Delete Failed");
      })


      //for editing rate........................
      .addCase(editRateData.pending, (state) => {
        state.editstatus = "Proccessing";
      })
      .addCase(editRateData.fulfilled, (state, action) => {
        state.editstatus = "Submit";
        state.todayAllRates = state.todayAllRates.map((rate) =>
            rate._id === action.payload._id ? action.payload : rate
        )
        toast.success("Edit Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
    })      
      .addCase(editRateData.rejected, (state, action) => {
        state.editstatus = "submit";
        state.error = action.payload;
        toast.error("Edit Failed");
      });
  },
});

export default todayRateSlice.reducer;
export const getGoldRate = (state) => state.todayRate.goldPrice;
export const getSliverRate = (state) => state.todayRate.silverPrice;
export const editstatus = (state) => state.todayRate.editstatus;
export const addstatus = (state) => state.todayRate.addstatus;
