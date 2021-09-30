import { createSlice } from '@reduxjs/toolkit';

type Media = {
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
}
const initialState: UIState = {
  blogsMedia: {
    main: {
      images: [],
      videos: [],
    },
    postSection: {
      // images: [],
      // videos: [],
    },
  },
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
            images: [],
            videos: [],
          };
        const post = state.blogsMedia.postSection[key];
        const noOfMedia = post.images.length + post.videos.length;
        if (noOfMedia < 2) post.images.push(action.payload.src);
      }
    },
    selectBlogVideo: (state, action) => {
      const page = action.payload.page;
      const key = action.payload.key;
      if (page === 'bMain')
        state.blogsMedia.main.videos.push(action.payload.src);
      if (page === 'bPostSection') {
        const noOfMedia =
          state.blogsMedia.postSection[key].images.length +
          state.blogsMedia.postSection[key].videos.length;
        if (noOfMedia < 2)
          state.blogsMedia.postSection[key].videos.push(action.payload.src);
      }
    },
  },
});

export const { selectBlogImage, selectBlogVideo } = blogSlice.actions;

export default blogSlice.reducer;
