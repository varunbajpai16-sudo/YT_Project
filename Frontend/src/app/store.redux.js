import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import videoreducer from "../features/video/video.slice";
import commentReducer from "../features/comment/commentslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoreducer,
    comments: commentReducer,  
  }
});