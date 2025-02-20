import React from 'react';
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { data } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";
import { LiaImagesSolid } from "react-icons/lia";
import { HiOutlineCollection } from "react-icons/hi";
import { RiAdvertisementLine } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";



const initialValue=[
      {
            data:"Rate",
            icon:<FaRupeeSign />

      },
      {
            data:"Home Banner",
            icon:<LiaImagesSolid />

      },
      {
            data:"Latest Collections",
            icon:<HiOutlineCollection />

      },
      {
            data:"Ads Banner",
            icon:<RiAdvertisementLine />

      },
      {
            data:"Products",
            icon:<AiOutlineProduct />

      }
]

const sidebarDataSlice=createSlice({
      name: "SideBar",
      initialState:initialValue,
})
export default sidebarDataSlice.reducer