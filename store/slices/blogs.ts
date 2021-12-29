import { createSlice } from '@reduxjs/toolkit';

type Media = {
  featured: string;
  images: string[];
  videos: string[];
};

interface UIState {
  blogsMedia: {
    main: Media;
    postSection: {
      [k: string]: Media;
    };
  };
  postSection: {
    [k: string]: string;
  };
}
const initialState: UIState = {
  blogsMedia: {
    main: {
      featured: '',
      images: [],
      videos: [],
    },
    postSection: {},
  },
  postSection: {},
};
export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    selectBlogImage: (state, action) => {
      const page = action.payload.page;
      const key = action.payload.key;
      if (page === 'bMain')
        state.blogsMedia.main.images.push(action.payload.src);
      if (page === 'bPostSection') {
        if (!state.blogsMedia.postSection[key])
          state.blogsMedia.postSection[key] = {
            featured: '',
            images: [],
            videos: [],
          };
        const post = state.blogsMedia.postSection[key];
        if (post.images.length === 1) post.images = [];
        post.images.push(action.payload.src);
      }
    },
    selectBlogVideo: (state, action) => {
      const page = action.payload.page;
      const key = action.payload.key;
      if (page === 'bMain')
        state.blogsMedia.main.videos.push(action.payload.src);
      if (page === 'bPostSection') {
        return;
      }
    },
    featuredBlogMedia: (state, action) => {
      const page = action.payload.page;
      const src = action.payload.src;
      if (page === 'bMain') {
        state.blogsMedia.main.featured = src;
      }
    },
    deleteBlogMedia: (state, action) => {
      const type = action.payload.type;
      const page = action.payload.page;
      const index = action.payload.index;
      const key = action.payload.key;
      if (page === 'bMain') {
        state.blogsMedia.main[type].splice(index, 1);
      }
      if (page === 'bPostSection') {
        state.blogsMedia.postSection[key][type].splice(index, 1);
      }
    },
    setBlogMedia: (state, action) => {
      state.blogsMedia.main.featured = action.payload.main.featured;
      state.blogsMedia.main.images = action.payload.main.images;
      state.blogsMedia.main.videos = action.payload.main.videos;
      state.blogsMedia.postSection = action.payload.postSection;
    },
    resetBlogMedia: (state) => {
      state.blogsMedia.main.images = [];
      state.blogsMedia.main.videos = [];
      state.blogsMedia.postSection = {};
      state.postSection = {};
    },
    setAllKeypoints: (state, action) => {
      state.postSection = action.payload;
    },
    setKeypoints: (state, action) => {
      const { id, content } = action.payload;
      state.postSection[id] = content;
    },
  },
});

export const {
  selectBlogImage,
  selectBlogVideo,
  setBlogMedia,
  resetBlogMedia,
  featuredBlogMedia,
  deleteBlogMedia,
  setKeypoints,
  setAllKeypoints,
} = blogSlice.actions;

export default blogSlice.reducer;
