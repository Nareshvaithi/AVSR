import { createSlice } from "@reduxjs/toolkit";
import avsrlogo from "../assets/Images/header/logo-with-banner.jpg";
const initialState = {
    AvsrLogo:avsrlogo,
    navigations : [
    {
        id:1,
        title:'Home',
        link:"/"
    },
    {
        id:2,
        title:'Gold',
        link:"/products"
    },
    {
        id:3,
        title:'Silver',
        link:"/products"
    },
    {
        id:4,
        title:'Diamond',
        link:"/products"
    },
    {
        id:5,
        title:'Gifts & Gold Coins',
        link:"/products"
    }
]
}

export const headerSlice = createSlice({
    name:'header',
    initialState,
    reducers:{},
})

export default headerSlice.reducer;
export const selectAllNavigations = (state)=> state.header.navigations;
export const selectHeaderLogo = (state)=> state.header.AvsrLogo;