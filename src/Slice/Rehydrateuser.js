import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a function to check local storage for the user token
const getUserTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
}

// Fetch user data based on the token and update the Redux state
const fetchUserBasedOnToken = async (token) => {
  if (token) {
    // Replace this with your API call to fetch user data based on the token
    const response = await axios.get(`http://localhost:4000/user-api/user-data/${token}`);
    return response.data.userObj;
  }
  return null; // If there's no token, return null or an empty object
}

// Create an async thunk to rehydrate the user object
export const rehydrateUser = createAsyncThunk("rehydrateUser", async (_, thunkAPI) => {
  const token = getUserTokenFromLocalStorage();
  return fetchUserBasedOnToken(token);
});

// Your user slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userobj: null,
    isError: !getUserTokenFromLocalStorage(), // Check for the token
    isSuccess: !!getUserTokenFromLocalStorage(), // Check for the token
    isLoading: false,
    errMsg: "",
  },
  reducers: {
    clearLoginStatus: (state) => {
      state.isSuccess = false;
      state.userobj = null;
      state.isError = false;
      state.errMsg = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(rehydrateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(rehydrateUser.fulfilled, (state, action) => {
      state.userobj = action.payload; // Set the user object based on the token
      state.isLoading = false;
      state.isError = !action.payload;
      state.isSuccess = !!action.payload;
      state.errMsg = action.payload ? "User rehydrated successfully" : "No user found";
    });
    builder.addCase(rehydrateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errMsg = "Error rehydrating user";
    });
    // Add your other extraReducers for userLogin, updateUserDetails, etc.
  },
});

export const { clearLoginStatus } = userSlice.actions;
export default userSlice.reducer;
