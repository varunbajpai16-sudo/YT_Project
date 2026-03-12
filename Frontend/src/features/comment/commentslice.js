import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,

  reducers: {

    setComments: (state, action) => {
      state.comments = action.payload;
    },

    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },

    deleteComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

  },
});

export const {
  setComments,
  addComment,
  deleteComment,
  setLoading,
  setError,
} = commentSlice.actions;

export default commentSlice.reducer;