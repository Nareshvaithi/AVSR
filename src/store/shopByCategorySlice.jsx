import { createSlice } from "@reduxjs/toolkit";
import storeImg1 from "../assets/Images/home/store01.jpg";
import storeImg2 from "../assets/Images/home/store02.jpg";
import storeImg3 from "../assets/Images/home/store03.jpg";
import storeImg4 from "../assets/Images/home/store04.jpg";
import shortNecklaceImg from "../assets/Images/home/short-necklace.jpg";
import longNecklaceImg from "../assets/Images/home/long-necklace.jpg";
import bangleImg from "../assets/Images/home/bangle.jpg";
import mangalyamImg from "../assets/Images/home/mangalyam.jpg";
import ringImg from "../assets/Images/home/ring.jpg";
import chainImg from "../assets/Images/home/chain.jpg";
import studImg from "../assets/Images/home/stud.jpg";
const initialState = {
    storeImgs:[
        {id:1,img:storeImg1},
        {id:2,img:storeImg2},
        {id:3,img:storeImg3},
        {id:4,img:storeImg4},
    ],
    categorys:[
        {id:1,category:"Short Necklace",img:shortNecklaceImg},
        {id:2,category:"Bangle",img:bangleImg},
        {id:3,category:"Long Necklace",img:longNecklaceImg},
        {id:4,category:"Mangalyam",img:mangalyamImg},
        {id:5,category:"Ring",img:ringImg},
        {id:6,category:"Chain",img:chainImg},
        {id:7,category:"Stud",img:studImg},
    ]
}

export const shopByCategorySlice = createSlice({
    name:'storeImgs',
    initialState,
    reducers:{},
}) 

export default shopByCategorySlice.reducer;
export const selectStoreImg = (state) => state.shopByCategory.storeImgs;
export const selectAllCategory = (state) => state.shopByCategory.categorys;