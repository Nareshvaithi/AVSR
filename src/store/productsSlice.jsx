import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products:[
        {
            id:1,
            category:"Gold",
            items:[
                {id:1,item:"Necklace",subItems:[]}
            ]
        }
    ]
}

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{}
})

export default productSlice.reducer;