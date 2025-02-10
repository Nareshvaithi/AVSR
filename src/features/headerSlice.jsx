import { createSlice } from "@reduxjs/toolkit";
import avsrlogo from "../assets/Images/header/logo-with-banner.jpg";
const initialState = {
    AvsrLogo:avsrlogo,
    navigations : [
    {
        id:1,
        title:'Gold',
    },
    {
        id:2,
        title:'Diamond'
    },
    {
        id:3,
        title:'Silver'
    },
    {
        id:4,
        title:'Gifts & Gold Coins'
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