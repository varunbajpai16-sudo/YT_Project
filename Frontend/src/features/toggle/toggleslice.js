import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showComments: false,
  showSidebar: true,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {

    toggleComments: (state) => {
      state.showComments = !state.showComments;
    },

    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },

    closeComments: (state) => {
      state.showComments = false;
    },

    openComments: (state) => {
      state.showComments = true;
    }

  },
});

export const {
  toggleComments,
  toggleSidebar,
  closeComments,
  openComments
} = toggleSlice.actions;

export default toggleSlice.reducer;