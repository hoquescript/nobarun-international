import { createSlice } from '@reduxjs/toolkit';

type Media = {
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
} = productSlice.actions;

export default productSlice.reducer;
