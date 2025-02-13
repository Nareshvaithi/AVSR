import { createSlice } from "@reduxjs/toolkit";
import shortNecklace01 from "../assets/Images/home/latest01.jpg"
import shortNecklace02 from "../assets/Images/home/latest02.jpg"
import shortNecklace03 from "../assets/Images/home/latest03.jpg"
import shortNecklace04 from "../assets/Images/home/latest04.jpg"
const initialState = {
    products: [
        {
            id: 1,
            category: "Gold Jewellery",
            items: [
                { idx: 1, item: "Necklace", subitems: [
                    { id: 1, item: "Short Necklaces", varity:[
                        {id:1,name:"short_necklace_01",images:[
                            {id:1,img:shortNecklace01},
                            {id:2,img:shortNecklace02},
                            {id:3,img:shortNecklace03},
                            {id:4,img:shortNecklace04},
                        ],price:"XXXX"},
                        {id:2,name:"short_necklace_02",images:[
                            {id:1,img:shortNecklace01},
                            {id:2,img:shortNecklace02},
                            {id:3,img:shortNecklace03},
                            {id:4,img:shortNecklace04},
                        ],price:"XXXX"},
                    ] },
                    { id: 2, item: "Long Necklaces" }
                ] },
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
