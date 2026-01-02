import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user", 
    initialState:{
        userData:null,
        currentCity:null,
        currentState:null,
        currentAddress:null,
        authChecked:false,
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload

        },
        setCurrentCity:(state,action)=>{
            state.currentCity= action.payload;
        },
        setCurrentState:(state,action)=>{
                    state.currentState = action.payload 
        },
        setCurrentAddress:(state,action)=>{
            state.currentAddress = action.payload
        } ,
        setAuthChecked:(state)=>{
            state.authChecked = true;
        },
    },
})
export const {setUserData,setCurrentCity,setAuthChecked,setCurrentState,setCurrentAddress} = userSlice.actions
export default userSlice.reducer