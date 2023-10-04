import { createSlice } from '@reduxjs/toolkit';

export interface User {
  userName: string | null;
  _id: string | null;
  email: string | null;
  photo: string | null;
}

const initialState: User = {
  userName: null,
  email: null,
  _id: null,
  photo: null,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state._id = action.payload._id;
      state.photo = action.payload.photo;
    },
    removeUser: (state) => {
      state.userName = null;
      state.email = null;
      state._id = null;
      state.photo = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
