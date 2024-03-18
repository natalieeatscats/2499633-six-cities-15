import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import { axiosInst } from '../api';

export const api = axiosInst;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
