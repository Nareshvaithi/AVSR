import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "../src/features/headerSlice";
import todayRateReducer from "../src/features/todayRateSlice";
import frontBannerReducer from "../src/features/frontBannerSlice";
import shopByCategoryReducer from "./features/shopByCategorySlice";
export const store = configureStore({
    reducer:{
        header:headerReducer,
        todayRate:todayRateReducer,
        frontBanner:frontBannerReducer,
        shopByCategory:shopByCategoryReducer,
        
        
    }
})

