import { createSlice } from '@reduxjs/toolkit';

type Media = {
  featured: string;
  images: string[];
  videos: string[];
};

interface UIState {
  productMedia: {
    main: Media;
    keyPoints: {
      [k: string]: Media;
    };
  };
}
const initialState: UIState = {
  productMedia: {
    main: {
      featured: '',
      images: [],
      videos: [],
    },
    keyPoints: {},
  },
};
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProductImage: (state, action) => {
      const page = action.payload.page;
      const key = action.payload.key;
      if (page === 'pMain')
        state.productMedia.main.images.push(action.payload.src);
      if (page === 'pKeypoint') {
        if (!state.productMedia.keyPoints[key])
          state.productMedia.keyPoints[key] = {
            featured: '',
            images: [],
            videos: [],
          };
        const post = state.productMedia.keyPoints[key];
        const noOfMedia = post.images.length + post.videos.length;
        if (noOfMedia < 2) post.images.push(action.payload.src);
      }
    },
    selectProductVideo: (state, action) => {
      const page = action.payload.page;
      const key = action.payload.key;
      if (page === 'pMain')
        state.productMedia.main.videos.push(action.payload.src);
      if (page === 'pKeypoint') {
        if (!state.productMedia.keyPoints[key])
          state.productMedia.keyPoints[key] = {
            featured: '',
            images: [],
            videos: [],
          };
        const noOfMedia =
          state.productMedia.keyPoints[key].images.length +
          state.productMedia.keyPoints[key].videos.length;
        if (noOfMedia < 2)
          state.productMedia.keyPoints[key].videos.push(action.payload.src);
      }
    },
    featuredProductMedia: (state, action) => {
      const page = action.payload.page;
      const src = action.payload.src;
      const key = action.payload.key;
      if (page === 'pMain') {
        state.productMedia.main.featured = src;
      }
      if (page === 'pKeypoint') {
        state.productMedia.keyPoints[key].featured = src;
      }
    },
    deleteProductMedia: (state, action) => {
      const type = action.payload.type;
      const page = action.payload.page;
      const index = action.payload.index;
      const key = action.payload.key;
      if (page === 'pMain') {
        state.productMedia.main[type].splice(index, 1);
      }
      if (page === 'pKeypoint') {
        state.productMedia.keyPoints[key][type].splice(index, 1);
      }
    },
    setProductMedia: (state, action) => {
      state.productMedia.main.images = action.payload.main.images;
      state.productMedia.main.videos = action.payload.main.videos;
      state.productMedia.keyPoints = action.payload.keypoint;
    },
    resetBlogMedia: (state) => {
      state.productMedia.main.images = [];
      state.productMedia.main.videos = [];
      state.productMedia.keyPoints = {};
    },
  },
});

export const {
  selectProductImage,
  selectProductVideo,
  setProductMedia,
  resetBlogMedia,
  featuredProductMedia,
  deleteProductMedia,
} = productSlice.actions;

export default productSlice.reducer;
