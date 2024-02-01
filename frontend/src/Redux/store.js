import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "./authSlicer";


  
  
  const store = configureStore({
    reducer:{
        Data:authSlicer,
        
    }
  });
  
  export default store;