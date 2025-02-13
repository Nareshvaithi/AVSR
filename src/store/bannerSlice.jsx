import { createSlice } from "@reduxjs/toolkit";
import homeBanner01 from "../assets/Images/home/home-banner01.jpg";
import homeBanner02 from "../assets/Images/home/home-banner02.jpg";
const initialState = {
    addsBanners:[
        {id:1,name:"homebanner01",img:homeBanner01},
        {id:2,name:"homebanner02",img:homeBanner02}
    ]
}

const bannersSlice = createSlice({
    name:'banners',
    initialState,
    reducers:{},
})

export default bannersSlice.reducer;
export const selectAddsBanners = (state)=>state.banners.addsBanners;