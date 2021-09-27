import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  showToolbar: boolean;
  token: string;
  images: { src: string; name: string }[];
  links: { src: string; name: string }[];
  productsImage: string[];
  blogsImage: string[];
  reviewImage: string[];
}
const initialState: UIState = {
  showToolbar: false,
  token: '',
  images: [],
  links: [],
  productsImage: [],
  blogsImage: [],
  reviewImage: [],
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
      if (action.payload.path === '/blogs/add-new-post') {
        // @ts-ignore
        state.blogsImage.push(action.payload.src);
      }
      if (action.payload.path === '/review/add-new-review') {
        // @ts-ignore
        state.reviewImage.push(action.payload.src);
      }
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    fetchMedia: (state, action) => {
      state.images = action.payload.images;
      state.links = action.payload.videos;
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
  fetchMedia,
} = uiSlice.actions;

export default uiSlice.reducer;
