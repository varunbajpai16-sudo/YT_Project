import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "likes",

  initialState: {
    videoLikes: {}
  },

  reducers: {
    setVideoLikes: (state, action) => {
      const { videoId, likes } = action.payload;
      state.videoLikes[videoId] = likes;
    },

    toggleVideoLike: (state, action) => {
      const { videoId } = action.payload;

      if (!state.videoLikes[videoId]) {
        state.videoLikes[videoId] = 0;
      }

      state.videoLikes[videoId] += 1;
    }
  }
});

export const { setVideoLikes, toggleVideoLike } = likeSlice.actions;

export default likeSlice.reducer;