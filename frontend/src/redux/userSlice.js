import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user", 
    initialState:{
        userData:null,
        currentCity:null,
        currentState:null,
        currentAddress:null,
        authChecked:false,
     shopsInCity:[],
     itemsInCity:[],
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload

        },
        setCurrentCity:(state,action)=>{
            state.currentCity= action.payload
        },
        setCurrentState:(state,action)=>{
                    state.currentState = action.payload 
        },
        setCurrentAddress:(state,action)=>{
            state.currentAddress = action.payload
        } ,
        setAuthChecked:(state)=>{
            state.authChecked = true
        },
        setShopsInCity:(state,action)=>{
            state.shopsInCity = action.payload
        },
        setItemsInCity:(state,action)=>{
            state.itemsInCity = action.payload
        }

    },
})
export const {setUserData,setCurrentCity,setAuthChecked,setCurrentState,setCurrentAddress,setShopsInCity,setItemsInCity} = userSlice.actions
export default userSlice.reducer