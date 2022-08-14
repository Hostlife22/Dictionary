import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { LOCALSTORAGE_KEY_ID, LOCALSTORAGE_KEY_USER } from '../../common';
import { IAuthTokens } from './authApiSlice.interface';
import { AuthState, IAuthPayload } from './authSlice.interface';

const initialState: AuthState = {
  name: null,
  refreshToken: null,
  token: null,
  userId: null,
  newAccount: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthPayload>) => {
      localStorage.setItem(LOCALSTORAGE_KEY_USER, JSON.stringify(action.payload));
      state.name = action.payload.name;
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    newUser: (state, action: PayloadAction<string>) => {
      localStorage.setItem(LOCALSTORAGE_KEY_ID, JSON.stringify(action.payload));
      state.newAccount = true;
    },
    logout: (state) => {
      localStorage.removeItem(LOCALSTORAGE_KEY_USER);
      return initialState;
    },
    updateUserTokens: (state, action: PayloadAction<IAuthTokens>) => {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
      localStorage.setItem(
        LOCALSTORAGE_KEY_USER,
        JSON.stringify({
          ...state,
        }),
      );
    },
  },
});

export const { setUser, logout, updateUserTokens, newUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
