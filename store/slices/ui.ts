import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  showToolbar: boolean;
  token: string;
  images: { src: string; name: string }[];
  links: string[];
  productsImage: string[];
  blogsImage: string[];
}
const initialState: UIState = {
  showToolbar: false,
  token: '',
  images: [],
  links: [],
  productsImage: [],
  blogsImage: [],
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
    addImage: (state, action) => {
      // @ts-ignore
      state.images.push(action.payload);
    },
    addYoutubeLink: (state, action) => {
      // @ts-ignore
      state.links.push(action.payload);
    },
    selectImage: (state, action) => {
      if (action.payload.path === '/product/add-new-product') {
        // @ts-ignore
        state.productsImage.push(action.payload.src);
      }
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {
  showToolbar,
  hideToolbar,
  toggleToolbar,
  addImage,
  addYoutubeLink,
  selectImage,
  setAuthToken,
} = uiSlice.actions;

export default uiSlice.reducer;
