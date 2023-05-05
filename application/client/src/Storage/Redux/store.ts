import { configureStore } from "@reduxjs/toolkit";
import { currentPetReducer } from "./currentPetSlice";
import { myPetDataReducer } from "./myPetDataSlice";
import myPetDataApi from "../../Apis/myPetDataApi";

const store = configureStore({
    reducer:{
        currentPetStore:currentPetReducer,
        myPetDataStore:myPetDataReducer,
        [myPetDataApi.reducerPath]:myPetDataApi.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(myPetDataApi.middleware),
    
});

export type RootState = ReturnType<typeof store.getState>;

export default store;