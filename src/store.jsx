import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./features/headerSlice";
import todayRateReducer from "./features/todayRateSlice";
import frontBannerReducer from "./features/frontBannerSlice";
import shopByCategoryReducer from "./features/shopByCategorySlice";
import latestCollectionsReducer from "./features/latestCollectionSlice";
import bannersReducer from "./features/bannerSlice";
import footerReducer from "./features/footerSlice";

export const store = configureStore({
    reducer:{
        header:headerReducer,
        footer:footerReducer,
        todayRate:todayRateReducer,
        frontBanner:frontBannerReducer,
        shopByCategory:shopByCategoryReducer,
        latestCollections:latestCollectionsReducer,
        banners:bannersReducer,
    }
})

