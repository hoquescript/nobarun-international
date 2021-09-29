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
  productCategoryMedia: Media;
  productCollectionMedia: Media;
  blogCategoryMedia: Media;
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
  productCategoryMedia: {
    images: [],
    videos: [],
  },
  productCollectionMedia: {
    images: [],
    videos: [],
  },
  blogsImage: [],
  blogCategoryMedia: {
    images: [],
    videos: [],
  },
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
      if (action.payload.path.startsWith('/product/categories/')) {
        if (state.productCategoryMedia.images.length === 1)
          state.productCategoryMedia.images = [];
        // @ts-ignore
        state.productCategoryMedia.images.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/product/collections/')) {
        if (state.productCollectionMedia.images.length === 1)
          state.productCollectionMedia.images = [];
        // @ts-ignore
        state.productCollectionMedia.images.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/blogs/categories/')) {
        if (state.blogCategoryMedia.images.length === 1)
          state.blogCategoryMedia.images = [];
        // @ts-ignore
        state.blogCategoryMedia.images.push(action.payload.src);
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
    setMedia: (state, action) => {
      if (action.payload.path.startsWith('/product/categories/')) {
        state.productCollectionMedia.images = [action.payload.src];
      }
      if (action.payload.path.startsWith('/product/collections/')) {
        state.productCollectionMedia.images = [action.payload.src];
      }
      if (action.payload.path.startsWith('/blogs/categories/')) {
        state.blogCategoryMedia.images = [action.payload.src];
      }
    },
    resetMediaSelection: (state) => {
      state.productMedia.images = [];
      state.productMedia.videos = [];
      state.productCategoryMedia.images = [];
      state.productCollectionMedia.images = [];
      state.blogCategoryMedia.images = [];
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
  setMedia,
  resetMediaSelection,
} = uiSlice.actions;

export default uiSlice.reducer;
