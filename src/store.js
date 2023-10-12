import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/UserSlice'
import adminReducer from './Slice/AdminSlice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer
    }
    
})