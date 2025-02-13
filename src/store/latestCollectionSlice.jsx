import { createSlice } from "@reduxjs/toolkit";
import latestCollectImg01 from "../assets/Images/home/latest01.jpg";
import latestCollectImg02 from "../assets/Images/home/latest02.jpg";
import latestCollectImg03 from "../assets/Images/home/latest03.jpg";
import latestCollectImg04 from "../assets/Images/home/latest04.jpg";

const initialState = {
    title:"Latest Collections",
    latest:[
        {id:1,name:"latest01",img:latestCollectImg01},
        {id:2,name:"latest02",img:latestCollectImg02},
        {id:3,name:"latest03",img:latestCollectImg03},
        {id:4,name:"latest04",img:latestCollectImg04},
        {id:5,name:"latest01",img:latestCollectImg01},
        {id:6,name:"latest02",img:latestCollectImg02},
        {id:7,name:"latest03",img:latestCollectImg03},
        {id:8,name:"latest04",img:latestCollectImg04},
    ]
}

export const latestCollectionsSlice = createSlice({
    name:'latestCollections',
    initialState,
    reducers:{},
})

export default latestCollectionsSlice.reducer;
export const latestCollectionTitle = (state)=> state.latestCollections.title;
export const latestCollections = (state)=> state.latestCollections.latest;
