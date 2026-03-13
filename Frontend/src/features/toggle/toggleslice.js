import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showComments: false,
  showSidebar: true,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {

    // COMMENTS
    toggleComments: (state) => {
      state.showComments = !state.showComments;
    },

    openComments: (state) => {
      state.showComments = true;
    },

    closeComments: (state) => {
      state.showComments = false;
    },

    // SIDEBAR
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },

    openSidebar: (state) => {
      state.showSidebar = true;
    },

    closeSidebar: (state) => {
      state.showSidebar = false;
    }

  },
});

export const {
  toggleComments,
  openComments,
  closeComments,
  toggleSidebar,
  openSidebar,
  closeSidebar
} = toggleSlice.actions;

export default toggleSlice.reducer;