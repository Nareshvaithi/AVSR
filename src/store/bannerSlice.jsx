import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    addsBanners:[],
    status:"idle",
    error:null,
}

const bannersSlice = createSlice({
    name:'banners',
    initialState,
    reducers:{},
})

export default bannersSlice.reducer;
export const selectAddsBanners = (state)=>state.banners.addsBanners;