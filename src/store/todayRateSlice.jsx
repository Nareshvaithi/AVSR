import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    goldPrice:7510,
    silverPrice:104
}
const todayRateSlice = createSlice({
    name:'todayRate',
    initialState,
    reducers:{}
})

export default todayRateSlice.reducer;
export const getGoldRate = (state) => state.todayRate.goldPrice;
export const getSliverRate = (state) => state.todayRate.silverPrice; 