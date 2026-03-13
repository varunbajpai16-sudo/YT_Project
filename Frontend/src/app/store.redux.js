import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import videoreducer from "../features/video/video.slice";
import commentReducer from "../features/comment/commentslice";
import LikeReducer from "../features/like/Likeslice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoreducer,
    comments: commentReducer,  
    likes:LikeReducer
  }
});