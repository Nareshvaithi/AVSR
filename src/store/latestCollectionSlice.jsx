import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axios from "axios";

const API_URL = `https://api-avsr.konceptsdandd.com/latestCollections`;
const initialState = {
  title: "Latest Collections",
  latest: [],
  status: "idle",
  addStatus: "Submit",
  deleteStatus: "Submit",
  editStatus: "Submit",
  error: null,
};

export const fetchLatestCollections = createAsyncThunk(
  "latestCollections/fetchLatestCollections",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

//add data...........................
export const addLatestData = createAsyncThunk(
  "ads/addLatestData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error adding latest collections"
      );
    }
  }
);

//delete latest collections.....................................

export const deleteLatest = createAsyncThunk(
  "latest/deleteLatest",
  async (latestId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${latestId}`);
      console.log("Success: Banner deleted", latestId);
      return latestId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting banner");
    }
  }
);

//Edit the product details...........................

export const editData = createAsyncThunk(
  "ads/editData",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error adding latest collections"
      );
    }
  }
);

export const latestCollectionsSlice = createSlice({
  name: "latestCollections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestCollections.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLatestCollections.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchLatestCollections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.latest = action.payload;
      })
      //for adding latest collections details and images...................................
      .addCase(addLatestData.pending, (state) => {
        state.addStatus = "Processing";
        state.error = null;
      })
      .addCase(addLatestData.fulfilled, (state, action) => {
        state.addStatus = "Submit";
        state.latest = [...state.latest, action.payload];
        toast.success("Add Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .addCase(addLatestData.rejected, (state, action) => {
        state.addStatus = "Submit";
        state.error = action.payload || "Something went wrong";
        toast.error("Add Failed");
      })

      //for deleting latest collections........................
      .addCase(deleteLatest.pending, (state) => {
        state.deleteStatus = "Processing";
      })
      .addCase(deleteLatest.fulfilled, (state, action) => {
        state.deleteStatus = "Submit";
        state.latest = state.latest.filter(
          (value) => value._id !== action.payload
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
      .addCase(deleteLatest.rejected, (state, action) => {
        state.deleteStatus = "Submit";
        state.error = action.payload;
        toast.error("Delete Failed");
      })

      //for editing latest collections........................

      .addCase(editData.pending, (state) => {
        state.editStatus = "Processing";
      })
      .addCase(editData.fulfilled, (state, action) => {
        state.editStatus = "Submit";
        const index = state.latest.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.latest[index] = { ...state.latest[index], ...action.payload };
        }
        toast.success("Edit Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
      });
      })
      .addCase(editData.rejected, (state, action) => {
        state.editStatus = "Submit";
        state.error = action.payload;
        toast.error("Edit Failed");
      });
  },
});

export default latestCollectionsSlice.reducer;
export const latestCollectionTitle = (state) => state.latestCollections.title;
export const latestCollections = (state) => state.latestCollections.latest;
export const addStatus = (state) => state.latestCollections.addStatus;
export const deletestatus = (state) => state.latestCollections.deletestatus;
export const editStatus = (state) => state.latestCollections.editStatus;
