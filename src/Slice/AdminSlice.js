import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";


//make http post req to login user

export const adminLogin=createAsyncThunk('loginadmin',async(usercred,thunkApi)=>{
    let response=await axios.post('http://localhost:4000/admin-api/login',usercred);
    let data=response.data;
    
    
    // let navigate=useNavigate();
    if(data.message==='login success')
    {
        //local storage token
        localStorage.setItem("admintoken",data.payload)
        // navigate('/userdashboard')
        return data.adminObj;
        
    }
    else if(data.status===200)
    {
        alert("Invalid details")
        
    }
    
    if(data.message==="Invalid username" || data.message==="Invalid password"){
        
        return thunkApi.rejectWithValue(data); 

    }
})
export const updateAdminDetails = createAsyncThunk('updateAdmin', async (updatedAdmin, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:4000/admin-api/update-admin', updatedAdmin);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
const storedAdminToken = localStorage.getItem('admintoken');

let adminSlice=createSlice({
    name:'admin',
    initialState:{
        adminobj:{},
        isError:!!storedAdminToken,
        isSuccessadmin:!!storedAdminToken,
        isLoading:false,
        errMsg:''
    },
    reducers:{
        clearAdminLoginStatus:(state)=>{
            // console.log("he;;       ")
            state.isSuccessadmin=false;
            state.adminobj=null;
            state.isError=false;
            state.errMsg='';
            // console.log(state)
            return state;
        }
    },
    extraReducers:{

        //  track life cycle promise returned by createasyncTHunk function
        [adminLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },

        [adminLogin.fulfilled]:(state,action)=>{
            state.adminobj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.isSuccessadmin=true;
            state.errMsg="b"

        localStorage.setItem('admintoken', storedAdminToken);
        },
        [adminLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccessadmin=false;
            state.errMsg='error occured'
        }
    }
})


export const {clearAdminLoginStatus}=adminSlice.actions;
export default adminSlice.reducer;