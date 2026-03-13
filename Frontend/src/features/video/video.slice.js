import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  selectedVideo: null,
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      const { videos, page } = action.payload;

      if (page === 1) {
        state.videos = videos;
      } else {
        const map = new Map();

        [...state.videos, ...videos].forEach((v) => {
          map.set(v._id, v);
        });

        state.videos = Array.from(map.values());
      }
    },

    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearSelectedVideo: (state) => {
      state.selectedVideo = null;
    },
  },
});

export const {
  setVideos,
  setSelectedVideo,
  setLoading,
  setError,
  clearSelectedVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
