import { createSlice } from '@reduxjs/toolkit';

type Media = {
  featured?: '';
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
  productCategoryCoverMedia: Media;
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
  pageName: string;
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
    featured: '',
    images: [],
    videos: [],
  },
  productCategoryCoverMedia: {
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
    featured: '',
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
  pageName: '',
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
      state.images.push(action.payload);
    },
    addYoutubeLink: (state, action) => {
      state.links.push(action.payload);
    },
    selectImage: (state, action) => {
      if (action.payload.path.startsWith('/product/categories/')) {
        if (state.pageName === 'pCategoryFeatured') {
          if (state.productCategoryCoverMedia.images.length < 1)
            state.productCategoryCoverMedia.images.push(action.payload.src);
        } else {
          if (state.productCategoryMedia.images.length < 2)
            state.productCategoryMedia.images.push(action.payload.src);
        }
      }
      if (action.payload.path.startsWith('/product/collections/')) {
        if (state.productCollectionMedia.images.length === 1)
          state.productCollectionMedia.images = [];
        state.productCollectionMedia.images.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/blogs/categories/')) {
        if (state.blogCategoryMedia.images.length === 1)
          state.blogCategoryMedia.images = [];
        state.blogCategoryMedia.images.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/review')) {
        state.reviewMedia.images.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/client')) {
        if (state.clientMedia.images.length === 1)
          state.clientMedia.images = [];
        state.clientMedia.images.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/query-report')) {
        state.queryMedia.images.push(action.payload.src);
      }
    },
    selectVideo: (state, action) => {
      if (action.payload.path.startsWith('/review')) {
        state.reviewMedia.videos.push(action.payload.src);
      }
      if (action.payload.path.startsWith('/query-report')) {
        state.queryMedia.videos.push(action.payload.src);
      }
    },
    featuredMedia: (state, action) => {
      const page = action.payload.page;
      const src = action.payload.src;
      if (page === 'review') {
        state.reviewMedia.featured = src;
      }
      if (page === 'pCategory') {
        state.productCategoryMedia.featured = src;
      }
    },
    deleteMedia: (state, action) => {
      const type = action.payload.type;
      const page = action.payload.page;
      const index = action.payload.index;
      if (page === 'pCategory') {
        state.productCategoryMedia[type].splice(index, 1);
      }
      if (page === 'pCategoryFeatured') {
        state.productCategoryCoverMedia[type].splice(index, 1);
      }
      if (page === 'pCollection') {
        state.productCollectionMedia[type].splice(index, 1);
      }
      if (page === 'bCategory') {
        state.blogCategoryMedia[type].splice(index, 1);
      }
      if (page === 'review') {
        state.reviewMedia[type].splice(index, 1);
      }
      if (page === 'client') {
        state.clientMedia[type].splice(index, 1);
      }
      if (page === 'query') {
        state.queryMedia[type].splice(index, 1);
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
    deleteContactImage: (state, action) => {
      const page = action.payload.page;
      const key = action.payload.key;
      const index = action.payload.index;

      if (page === 'contact') {
        state.contactsMedia[key].images.splice(index, 1);
      }
    },
    setContactImage: (state, action) => {
      state.contactsMedia = action.payload;
    },

    setMedia: (state, action) => {
      if (action.payload.path.startsWith('/product/categories/')) {
        state.productCategoryMedia.images = action.payload.src;
        state.productCategoryMedia.featured =
          action.payload.src && action.payload.src[1];
        state.productCategoryCoverMedia.images = action.payload.featured;
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
        state.queryMedia.images = action.payload.src?.images;
        state.queryMedia.videos = action.payload.src?.videos;
      }
      if (action.payload.path.startsWith('/client')) {
        state.clientMedia.images = [action.payload.src];
      }
    },
    resetMediaSelection: (state) => {
      state.productMedia.images = [];
      state.productMedia.videos = [];
      state.productCategoryMedia.images = [];
      state.productCategoryCoverMedia.images = [];
      state.productCollectionMedia.images = [];
      state.blogCategoryMedia.images = [];
      state.reviewMedia.images = [];
      state.reviewMedia.videos = [];
      state.queryMedia.images = [];
      state.queryMedia.videos = [];
      state.clientMedia.images = [];
      state.clientMedia.videos = [];
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    fetchMedia: (state, action) => {
      state.images = action.payload.images;
      state.links = action.payload.videos;
    },
    deleteMediaGallery: (state, action) => {
      const content =
        action.payload.type === 'image' ? state.images : state.links;
      const index = content.findIndex(
        (media) => media.src === action.payload.src,
      );
      console.log(action.payload.src, index);
      content.splice(index, 1);
    },
    setGlobalPage: (state, action) => {
      state.pageName = action.payload;
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
  deleteMedia,
  featuredMedia,
  resetMediaSelection,
  selectContactImage,
  deleteContactImage,
  setContactImage,
  deleteMediaGallery,
  setGlobalPage,
} = uiSlice.actions;

export default uiSlice.reducer;
