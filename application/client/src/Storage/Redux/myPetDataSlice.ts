import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myPetData:[],
};

export const myPetDataSlice = createSlice({
    name:"MyPetData" ,
    initialState:initialState,
    reducers:{
        setMyPetData:(state , action) => {
            state.myPetData = action.payload;
        }
    }
});

export const {setMyPetData} = myPetDataSlice.actions;
export const myPetDataReducer = myPetDataSlice.reducer;