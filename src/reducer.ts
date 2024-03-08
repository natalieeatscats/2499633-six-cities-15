import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  city: 'Paris',
  offers: [],
};

export const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SET_CITY', (state, action) => {
      state.city = action.payload;
      state.offers = action.payload;
    });
});
