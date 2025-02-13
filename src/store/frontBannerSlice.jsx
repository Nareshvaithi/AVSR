import { createSlice } from "@reduxjs/toolkit";
import frontBanner from "../assets/Images/home/front-banner.jpg";
const initialState = {
    banner:[
        {id:1,name:"banner_01",img:frontBanner},
        {id:2,name:"banner_02",img:frontBanner},
        {id:3,name:"banner_03",img:frontBanner},
    ],
}

export const frontBannerSlice = createSlice({
    name:'frontBanner',
    initialState,
    reducers:{},
})

export default frontBannerSlice.reducer;
export const selectFrontBanner = (state) => state.frontBanner.banner;