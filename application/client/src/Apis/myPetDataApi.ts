import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const myPetDataApi = createApi({
    reducerPath:"myPetDataApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8000/api/v1/breeder"
    }),
    tagTypes:["MyPetDatas"],
    endpoints:(builder) => ({
        getMyPetDatasByUserID:builder.mutation({
            query:(userID) => ({
                url:`/getmypets`,
                method: "POST",
                body: { userID: userID }
            }),
            

        }),
        
    }),
});

export const {useGetMyPetDatasByUserIDMutation} = myPetDataApi;
export default myPetDataApi;
