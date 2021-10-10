import { createSlice } from '@reduxjs/toolkit';

interface PermissionProps {
  [key: string]: {
    view: boolean;
    edit: boolean;
    delete: boolean;
  };
}
interface ProfileState {
  userId: string;
  info: {
    displayName: string;
    image: string;
  };
  permission: PermissionProps;
}
const initialState: ProfileState = {
  userId: '',
  info: {
    displayName: '',
    image: '',
  },
  permission: {
    Dashboard: {
      view: false,
      edit: false,
      delete: false,
    },
    Product: {
      view: false,
      edit: false,
      delete: false,
    },
    Blogs: {
      view: false,
      edit: false,
      delete: false,
    },
    Review: {
      view: false,
      edit: false,
      delete: false,
    },
    Appearance: {
      view: false,
      edit: false,
      delete: false,
    },
    Settings: {
      view: false,
      edit: false,
      delete: false,
    },
  },
};
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.userId = action.payload.userId;
      state.info.image = action.payload.image;
      state.info.displayName = action.payload.displayName;
      state.permission = action.payload.permission;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
