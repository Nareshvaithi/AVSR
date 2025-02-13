import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            id: 1,
            category: "Gold Jewellery",
            items: [
                { idx: 1, item: "Necklace", subitems: [{ id: 1, item: "Short Necklaces" }, { id: 2, item: "Long Necklaces" }] },
                { idx: 2, item: "Earrings" },
                { idx: 3, item: "Rings" },
                { idx: 4, item: "Nose pins" },
                { idx: 5, item: "Chains" },
                { idx: 6, item: "Bangles & Bracelets" },
                { idx: 7, item: "Mangalsutras" },
                { idx: 8, item: "Pendants" },
            ]
        },
        {
            id: 2,
            category: "Silver Jewellery",
            items: [
                { idx: 1, item: "Necklace", subitems: [{ id: 1, item: "Short Necklaces" }, { id: 2, item: "Long Necklaces" }] },
                { idx: 2, item: "Earrings" },
                { idx: 3, item: "Rings" },
                { idx: 4, item: "Nose pins" },
                { idx: 5, item: "Chains" },
                { idx: 6, item: "Bangles & Bracelets" },
                { idx: 7, item: "Mangalsutras" },
                { idx: 8, item: "Pendants" },
            ]
        },
        {
            id: 3,
            category: "Diamond Jewellery",
            items: [
                { idx: 1, item: "Necklace", subitems: [{ id: 1, item: "Short Necklaces" }, { id: 2, item: "Long Necklaces" }] },
                { idx: 2, item: "Earrings" },
                { idx: 3, item: "Rings" },
                { idx: 4, item: "Nose pins" },
                { idx: 5, item: "Chains" },
                { idx: 6, item: "Bangles & Bracelets" },
                { idx: 7, item: "Mangalsutras" },
                { idx: 8, item: "Pendants" },
            ]
        },
        {
            id: 4,
            category: "Gifts & Gold Coin",
            items: [
                { idx: 1, item: "Necklace", subitems: [{ id: 1, item: "Short Necklaces" }, { id: 2, item: "Long Necklaces" }] },
                { idx: 2, item: "Earrings" },
                { idx: 3, item: "Rings" },
                { idx: 4, item: "Nose pins" },
                { idx: 5, item: "Chains" },
                { idx: 6, item: "Bangles & Bracelets" },
                { idx: 7, item: "Mangalsutras" },
                { idx: 8, item: "Pendants" },
            ]
        },
    ],
    activeItem: 1, 
    breadcrumb : ["Home ", `/ Gold Jewellery`],
};

const filterProductSlice = createSlice({
    name: 'filterProductsBar',
    initialState,
    reducers: {
        setActiveItem: (state, action) => {
            state.activeItem = state.activeItem === action.payload ? null : action.payload;
        },
        addBreadcrumb: (state, action) => {
            const activeCrumbId = action.payload;
            const foundProduct = state.products.find((product) => product.id === activeCrumbId);
            if (foundProduct) {
                state.breadcrumb = ["Home ", `/ ${foundProduct.category}`];
            }
        }
    }
});

export default filterProductSlice.reducer;
export const selectFilterProduct = (state) => state.filterProductBar.products;
export const selectActiveItem = (state) => state.filterProductBar.activeItem;
export const selectBreadcrumb = (state) => state.filterProductBar.breadcrumb;
export const { setActiveItem, addBreadcrumb } = filterProductSlice.actions;
