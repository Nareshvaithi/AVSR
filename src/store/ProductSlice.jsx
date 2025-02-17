import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api-avsr.konceptsdandd.com/collections";

const productAdapter = createEntityAdapter({
    selectId: (product) => product._id,
});

const initialState = productAdapter.getInitialState({
    selectedProducts: [], // Store selected product data instead of just IDs
    status: "idle",
    error: null,
    activeItem: null,
    breadcrumb: ["Home ", "/ Gold Jewellery"],
});

// Fetch all products
export const fetchProducts = createAsyncThunk("collections/fetchProducts", async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Fetch Product By Id
export const fetchproductsById = createAsyncThunk("collections/fetchproductsById", async(productId)=>{
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
})

// Fetch  By 

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setActiveItem: (state, action) => {
            const categoryId = action.payload;
            if (state.activeItem === categoryId) {
                state.activeItem = null;
            } else {
                state.activeItem = categoryId;
            }
        },
        addBreadcrumb: (state, action) => {
            const activeCrumbId = action.payload;
            const foundProduct = state.entities[activeCrumbId];
            if (foundProduct) {
                state.breadcrumb = ["Home ", `/ ${foundProduct.category_name}`];
            }
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
            .addCase(fetchproductsById.fulfilled, (state, action) => {
                state.selectedProducts = [action.payload]; // Replace the array with a single product
            })            
            
    },
});

export default productSlice.reducer;

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectEntities: selectProductEntities,
} = productAdapter.getSelectors((state) => state.products);

export const selectActiveItem = (state) => state.products.activeItem;
export const selectBreadcrumb = (state) => state.products.breadcrumb;
export const selectSelectedProducts = (state) => state.products.selectedProducts; // Selector for selected products

export const { setActiveItem, addBreadcrumb} = productSlice.actions;
