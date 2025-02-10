import { createSlice } from "@reduxjs/toolkit";
import frontBanner from "../assets/Images/home/front-banner.jpg";
const initialState = {
    banner:frontBanner,
}

export const frontBannerSlice = createSlice({
    name:'frontBanner',
    initialState,
    reducers:{},
})

export default frontBannerSlice.reducer;
export const selectFrontBanner = (state) => state.frontBanner.banner;