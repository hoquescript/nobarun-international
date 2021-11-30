import { createSlice } from '@reduxjs/toolkit';

type Media = {
  featured?: string;
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
  productKeypoints: {
    [k: string]: string;
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
  productKeypoints: {},
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
        if (post.images.length === 1) post.images = [];
        post.images.push(action.payload.src);
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
        if (state.productMedia.keyPoints[key].images.length === 1)
          state.productMedia.keyPoints[key].images = [];
        state.productMedia.keyPoints[key].videos.push(action.payload.src);
      }
    },
    featuredProductMedia: (state, action) => {
      const page = action.payload.page;
      const src = action.payload.src;
      if (page === 'pMain') {
        state.productMedia.main.featured = src;
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
      state.productMedia.main.featured = action.payload.main.featured;
      state.productMedia.main.images = action.payload.main.images;
      state.productMedia.main.videos = action.payload.main.videos;
      state.productMedia.keyPoints = action.payload.keypoint;
    },
    resetProductMedia: (state) => {
      state.productMedia.main.featured = '';
      state.productMedia.main.images = [];
      state.productMedia.main.videos = [];
      state.productMedia.keyPoints = {};
    },
    setAllKeypoints: (state, action) => {
      state.productKeypoints = action.payload;
    },
    setKeypoints: (state, action) => {
      const { id, content } = action.payload;
      state.productKeypoints[id] = content;
    },
  },
});

export const {
  selectProductImage,
  selectProductVideo,
  setProductMedia,
  resetProductMedia,
  featuredProductMedia,
  deleteProductMedia,
  setKeypoints,
  setAllKeypoints,
} = productSlice.actions;

export default productSlice.reducer;
