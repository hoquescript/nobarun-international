import { createSlice } from '@reduxjs/toolkit';

type Media = {
  images: string[];
  videos: string[];
};

interface UIState {
  showToolbar: boolean;
  token: string;
  images: { src: string; name: string }[];
  links: { src: string; name: string }[];
  productMedia: Media;
  blogsImage: string[];
  reviewMedia: Media;
}
const initialState: UIState = {
  showToolbar: false,
  token: '',
  images: [],
  links: [],
  productMedia: {
    images: [],
    videos: [],
  },
  blogsImage: [],
  reviewMedia: {
    images: [],
    videos: [],
  },
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleToolbar: (state) => {
      state.showToolbar = !state.showToolbar;
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
        state.productMedia.images.push(action.payload.src);
      }
      if (action.payload.path === '/blogs/add-new-post') {
        // @ts-ignore
        state.blogsImage.push(action.payload.src);
      }
      if (action.payload.path === '/review/add-new-review') {
        // @ts-ignore
        state.reviewMedia.images.push(action.payload.src);
      }
    },
    selectVideo: (state, action) => {
      if (action.payload.path === '/product/add-new-product') {
        // @ts-ignore
        state.productMedia.videos.push(action.payload.src);
      }
      if (action.payload.path === '/blogs/add-new-post') {
        // @ts-ignore
        state.blogsImage.push(action.payload.src);
      }
      if (action.payload.path === '/review/add-new-review') {
        // @ts-ignore
        state.reviewMedia.videos.push(action.payload.src);
      }
    },
    resetMediaSelection: (state) => {
      state.productMedia.images = [];
      state.productMedia.videos = [];
      state.reviewMedia.images = [];
      state.reviewMedia.videos = [];
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
  toggleToolbar,
  addImage,
  addYoutubeLink,
  selectImage,
  selectVideo,
  setAuthToken,
  fetchMedia,
  resetMediaSelection,
} = uiSlice.actions;

export default uiSlice.reducer;
