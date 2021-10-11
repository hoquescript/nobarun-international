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
  blogsImage: {
    main: Media;
    postSection: Media;
  };
  reviewMedia: Media;
  clientMedia: Media;
  queryMedia: Media;
  contactsMedia: {
    [key: string]: Media;
  };
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
  blogsImage: {
    main: {
      images: [],
      videos: [],
    },
    postSection: {
      images: [],
      videos: [],
    },
  },
  blogCategoryMedia: {
    images: [],
    videos: [],
  },
  reviewMedia: {
    images: [],
    videos: [],
  },
  clientMedia: {
    images: [],
    videos: [],
  },
  queryMedia: {
    images: [],
    videos: [],
  },
  contactsMedia: {},
};
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    closeToolbar: (state) => {
      state.showToolbar = false;
    },
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
      // if (action.payload.path === '/product/add-new-product') {
      //   // @ts-ignore
      //   state.productMedia.images.push(action.payload.src);
      // }
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
      if (action.payload.path.startsWith('/review')) {
        // @ts-ignore
        state.reviewMedia.images.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/client')) {
        if (state.clientMedia.images.length === 1)
          state.clientMedia.images = [];
        // @ts-ignore
        state.clientMedia.images.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/query-report')) {
        // @ts-ignore
        state.reviewMedia.images.push(action.payload.src);
      }
    },
    selectVideo: (state, action) => {
      // if (action.payload.path === '/product/add-new-product') {
      //   // @ts-ignore
      //   state.productMedia.videos.push(action.payload.src);
      // }
      if (action.payload.path === '/review') {
        // @ts-ignore
        state.reviewMedia.videos.push(action.payload.src);
      }
    },

    selectContactImage: (state, action) => {
      const key = action.payload.key;
      if (!state.contactsMedia[key])
        state.contactsMedia[key] = {
          images: [],
          videos: [],
        };
      const post = state.contactsMedia[key];

      if (post.images.length === 1) post.images = [];
      post.images.push(action.payload.src);
    },

    setContactImage: (state, action) => {
      state.contactsMedia = action.payload;
    },

    setMedia: (state, action) => {
      if (action.payload.path.startsWith('/product/categories/')) {
        state.productCategoryMedia.images = [action.payload.src];
      }
      if (action.payload.path.startsWith('/product/collections/')) {
        state.productCollectionMedia.images = [action.payload.src];
      }
      if (action.payload.path.startsWith('/blogs/categories/')) {
        state.blogCategoryMedia.images = [action.payload.src];
      }
      if (action.payload.path.startsWith('/review')) {
        state.reviewMedia.images = action.payload.src?.images;
        state.reviewMedia.videos = action.payload.src?.videos;
      }
      if (action.payload.path.startsWith('/query-report')) {
        state.reviewMedia.images = action.payload.src?.images;
        state.reviewMedia.videos = action.payload.src?.videos;
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
  closeToolbar,
  toggleToolbar,
  addImage,
  addYoutubeLink,
  selectImage,
  selectVideo,
  setAuthToken,
  fetchMedia,
  setMedia,
  resetMediaSelection,
  selectContactImage,
  setContactImage,
} = uiSlice.actions;

export default uiSlice.reducer;
