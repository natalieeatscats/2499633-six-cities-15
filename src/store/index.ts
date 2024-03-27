import { configureStore } from '@reduxjs/toolkit';
import { activeOfferReducer, apiReducer, offersReducer } from './reducer';
import { axiosInst } from '../api';
import reduceReducers from 'reduce-reducers';

export const api = axiosInst;

export const store = configureStore({
  reducer: reduceReducers(offersReducer, activeOfferReducer, apiReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
