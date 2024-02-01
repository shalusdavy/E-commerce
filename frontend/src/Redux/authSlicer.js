import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authPost = createAsyncThunk("postData", async (data) => {
  try {
    console.log(data);
    const response = await axios.post("http://localhost:3001/signup", data);
    console.log(response.data); 
    return response.data; 
  } catch (error) {
    console.error("API failed", error);
    throw error; 
  }
});


export const authLogin = createAsyncThunk("postdata",async(data)=>{
  try {

    const response = await axios.post("http://localhost:3001/login",data);
    console.log(response.data); 
    return response.data; 
    
  } catch (error) {
    console.error("API failed", error);
    throw error; 
  }
})



const authSlice=createSlice({
    name:"AuthPost",
    initialState:{
authPost:[],
authLogin:[],
    },

    reducers:{
        post: (state, action) => {
            state.authPost = action.payload;
          },
          post: (state, action) => {
            state.authLogin = action.payload;
          },

    },
    extraReducers:(builder)=>{
        builder
        .addCase(authPost.pending, (state) => {
            state.status = "pending";
          })
          .addCase(authPost.fulfilled, (state, action) => {
            console.log("Fulfilled action payload:", action.payload);
            state.authPost = action.payload;
            state.status = "fulfilled";
        })
        
          .addCase(authPost.rejected, (state) => {
            state.status = "rejected";
          })

          .addCase(authLogin.pending, (state) => {
            state.status = "pending";
          })
          .addCase(authLogin.fulfilled, (state, action) => {
            console.log("Fulfilled action payload:", action.payload);
            state.authPost = action.payload;
            state.status = "fulfilled";
        })
        
          .addCase(authLogin.rejected, (state) => {
            state.status = "rejected";
          })
    }
})
export const { post } = authSlice.actions;

export default authSlice.reducer;