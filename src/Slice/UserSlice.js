import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export const userLogin=createAsyncThunk('loginuser',async(usercred,thunkApi)=>{
    let response=await axios.post('http://localhost:4000/user-api/login',usercred);
    let data=response.data;
    
    
   
    if(data.message==='login success')
    {
        
        localStorage.setItem("token",data.payload)
        // navigate('/userdashboard')
        return data.userObj;
        
    }
    else if(data.status===200)
    {
        alert("Invalid details")
    }
    
    if(data.message==="Invalid username" || data.message==="Invalid password"){
        
        return thunkApi.rejectWithValue(data); 

    }
})
export const updateUserDetails = createAsyncThunk('updateUser', async (updatedUser, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:4000/user-api/update-user', updatedUser);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

const storedUserToken = localStorage.getItem('token');

let userSlice=createSlice({
    name:'user',
    initialState:{
        userobj:{},
        isError:!!storedUserToken,
        isSuccess:!!storedUserToken,
        isLoading:false,
        errMsg:''
    },
    reducers:{
        clearLoginStatus:(state)=>{
            
            state.isSuccess=false;
            state.userobj=null;
            state.isError=false;
            state.errMsg='';
            
            return state;
        }
    },
    extraReducers:{

        
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },

        [userLogin.fulfilled]:(state,action)=>{
            state.userobj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.errMsg="b"

            localStorage.setItem('token', action.pa);
        },
        [userLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg='error occured'
        }
    }
})


export const {clearLoginStatus}=userSlice.actions;
export default userSlice.reducer;