import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserData } from '../../utils/type';

type AuthData = {
  user: TUserData | null,
  isAuth: boolean,
}

const initialState: AuthData = {
  user: null,
  isAuth: false
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthData>) => {
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      state.user?.favorites.push(action.payload);
    },
    deleteFromFavorite: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.favorites = state.user?.favorites.filter(
          (id) => id !== action.payload,
        );
      }
    },
    logout: () => (initialState),
  },
});

export const { setUser, addFavorite, deleteFromFavorite, logout } = userSlice.actions;
export const userReducer =  userSlice.reducer;