import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from './const';
import { OfferData, State } from './types';
import OFFERS from './mocks/offers';

const initialState : State = {
  city: CITIES[0],
  offers: OFFERS,
  activeOffers: [],
};

export const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SET_CITY', (state, action: {type: 'SET_CITY'; payload: typeof CITIES[number]}) => {
      state.city = action.payload;
    })
    .addCase('SET_OFFERS', (state, action: {type: 'SET_OFFERS'; payload: OfferData[]}) => {
      state.activeOffers = action.payload;
    });
});
