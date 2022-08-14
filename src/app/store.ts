import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';
import settingsReducer from '../features/settings/settingsSlice';
import statisticReducer from '../features/statistic/statisticSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    statistic: statisticReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch);
