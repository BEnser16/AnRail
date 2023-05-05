import { createSlice } from "@reduxjs/toolkit";


interface CurrentPetState {
    CurrentPetState: string;
};

interface UpdateCurrentPetAction {
    type: "UPDATE_STATE";
    payload: string;
};

const initialState:CurrentPetState = {
    CurrentPetState:"",
};


  
export const updateCurrentPet = (currentPetState: string): UpdateCurrentPetAction => ({
    type: "UPDATE_STATE",
    payload: currentPetState,
});

export const currentPetSlice = createSlice({
    name:"CurrentPet" ,
    initialState:initialState,
    reducers:{
        setCurrentPetState:(state , action) => {
            state.CurrentPetState = action.payload;
        }
    }
});

export const {setCurrentPetState} = currentPetSlice.actions;
export const currentPetReducer = currentPetSlice.reducer;