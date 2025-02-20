import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-avsr.konceptsdandd.com/collections";

const productAdapter = createEntityAdapter({
    selectId: (product) => product._id,
});

const initialState = productAdapter.getInitialState({
    selectedCategory: null, // Track selected category
    selectedVarity: null,   // Track selected varity
    selectedDivision: null, // Track selected division
    status: "idle",
    error: null,
    breadcrumb: ["Home ", "/ Gold Jewellery"],
    productIndex:0
});

// Fetch all products
export const fetchProducts = createAsyncThunk("collections/fetchProducts", async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

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
            });
    },
});

export default productSlice.reducer;

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectEntities: selectProductEntities,
} = productAdapter.getSelectors((state) => state.products);

export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSelectedVarity = (state) => state.products.selectedVarity;
export const selectSelectedDivision = (state) => state.products.selectedDivision;
export const selectBreadcrumb = (state) => state.products.breadcrumb;

export const { setSelectedCategory, setSelectedVarity, setSelectedDivision, resetSelection } = productSlice.actions;