import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-avsr.konceptsdandd.com/collections";

const productAdapter = createEntityAdapter({
  selectId: (product) => product._id,
});

//add data...........................
export const addProductData = createAsyncThunk(
  "ads/addProductData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error adding  collections"
      );
    }
  }
);

//delete latest collections.....................................

export const deleteProductData = createAsyncThunk(
  "latest/deleteProductData",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${productId}`);
      console.log("Success: Product deleted", productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting banner");
    }
  }
);

//Edit the product details...........................

export const editProductData = createAsyncThunk(
  "ads/editProductData",
  async ({ id, values }, { rejectWithValue }) => {
    console.log("id", id);
    try {
      const response = await axios.put(`${API_URL}/${id}`, values);
      console.log("Success");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error adding latest collections"
      );
    }
  }
);

const initialState = productAdapter.getInitialState({
  selectedCategory: null, // Track selected category
  selectedVarity: null, // Track selected varity
  selectedDivision: null, // Track selected division
  status: "idle",
  error: null,
  breadcrumb: ["Home ", "/ Gold Jewellery"],
  productIndex: 0,
});

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "collections/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedVarity = null; // Reset selected varity
      state.selectedDivision = null; // Reset selected division
    },
    setSelectedVarity: (state, action) => {
      state.selectedVarity = action.payload;
      state.selectedDivision = null; // Reset selected division
    },
    setSelectedDivision: (state, action) => {
      state.selectedDivision = action.payload;
    },
    resetSelection: (state) => {
      state.selectedCategory = null;
      state.selectedVarity = null;
      state.selectedDivision = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        productAdapter.setAll(state, action.payload);
      })

      //for adding  collections details and images...................................

      .addCase(addProductData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        productAdapter.addOne(state, action.payload);
        alert("Collections Post SuccessFully");
      })
      .addCase(addProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })

      //for deleting  collections........................
      .addCase(deleteProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        productAdapter.removeOne(state, action.payload);
        alert("Product is deleted successfully");
      })
      .addCase(deleteProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //for editing  collections........................

      .addCase(editProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        productAdapter.updateOne(state, {
          id: action.payload._id,
          changes: action.payload,
        });
      })
      .addCase(editProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectEntities: selectProductEntities,
} = productAdapter.getSelectors((state) => state.products);

export const selectSelectedCategory = (state) =>
  state.products.selectedCategory;
export const selectSelectedVarity = (state) => state.products.selectedVarity;
export const selectSelectedDivision = (state) =>
  state.products.selectedDivision;
export const selectBreadcrumb = (state) => state.products.breadcrumb;

export const {
  setSelectedCategory,
  setSelectedVarity,
  setSelectedDivision,
  resetSelection,
} = productSlice.actions;
