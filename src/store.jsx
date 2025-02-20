import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./store/headerSlice";
import todayRateReducer from "./store/todayRateSlice";
import frontBannerReducer from "./store/frontBannerSlice";
import shopByCategoryReducer from "./store/shopByCategorySlice";
import latestCollectionsReducer from "./store/latestCollectionSlice";
import bannersReducer from "./store/bannerSlice";
import footerReducer from "./store/footerSlice";
import productsReducer from "./store/ProductSlice";
import sortByReducer from "./store/sortBySlice";
// import sideBarReducer from "./store/AdminStore/AdminStore"
// import activeSideBarReducer from "./store/AdminStore/ActiveSideBarData"

export const store = configureStore({
    reducer:{
        header:headerReducer,
        footer:footerReducer,
        todayRate:todayRateReducer,
        frontBanner:frontBannerReducer,
        shopByCategory:shopByCategoryReducer,
        latestCollections:latestCollectionsReducer,
        banners:bannersReducer,
        products:productsReducer,
        sortBy:sortByReducer,
        // sideBar:sideBarReducer,
        // activeSideBar:activeSideBarReducer
    }
})
