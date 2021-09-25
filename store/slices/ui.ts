import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showToolbar: false,
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToolbar: (state) => {
      state.showToolbar = true;
    },
    hideToolbar: (state) => {
      state.showToolbar = false;
    },
    toggleToolbar: (state, action) => {
      state.showToolbar = action.payload;
    },
  },
});

export const { showToolbar, hideToolbar, toggleToolbar } = uiSlice.actions;
export default uiSlice.reducer;
