import { createReducer } from '@reduxjs/toolkit';
import { cities } from './const';
import { OfferData, TState } from './types';
import OFFERS from './mocks/offers';

const initialState : TState = {
  city: cities[0],
  offers: OFFERS,
  activeOffers: [],
};

export const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SET_CITY', (state, action: {type: 'SET_CITY'; payload: typeof cities[number]}) => {
      state.city = action.payload;
    })
    .addCase('SET_OFFERS', (state, action: {type: 'SET_OFFERS'; payload: OfferData[]}) => {
      state.activeOffers = action.payload;
    });
});
