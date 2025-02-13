import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortOptions:[
        {id:1,sortby:"Name"},
        {id:2,sortby:"Price"},
        {id:3,sortby:"Latest"},
        {id:4,sortby:"Weight"}
    ]
}

const sortBySlice = createSlice({
    name:'sortBy',
    initialState,
    reducers:{},
})

export default sortBySlice.reducer;
export const selectSortOptions = (state) => state.sortBy.sortOptions;