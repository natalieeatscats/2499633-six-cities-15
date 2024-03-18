import { SelectedOfferData } from './../types';
import { createReducer } from '@reduxjs/toolkit';
import { CityName, OfferData, ReviewData, State } from '../types';
import { CITIES } from '../const';

export const initialState : State = {
  city: CITIES[0],
  offers: [],
  reviews: [],
  activeOffer: {
    id: '',
    title: '',
    type: '',
    price: 0,
    city: {
      name: '',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    },
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    },
    isFavorite: false,
    isPremium: false,
    rating: 0,
    description: '',
    bedrooms: 0,
    goods: [],
    host: {
      name: '',
      avatarUrl: '',
      isPro: false
    },
    images: [],
    maxAdults: 0
  },
  error: null,
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('SET_CITY', (state, action: { type: 'SET_CITY'; payload: CityName }) => {
      state.city = action.payload;
    })
    .addCase('SET_OFFERS', (state, action: { type: 'SET_OFFERS'; payload: OfferData[] }) => {
      state.offers = action.payload;
    })
    .addCase('SET_REVIEWS', (state, action: { type: 'SET_REVIEWS'; payload: ReviewData[] }) => {
      state.reviews = action.payload;
    })
    .addCase('SET_ACTIVE_OFFER', (state, action: { type: 'SET_ACTIVE_OFFER'; payload: SelectedOfferData }) => {
      state.activeOffer = action.payload;
    })
    .addCase('SET_ERROR', (state, action: { type: 'SET_ERROR'; payload: string | null }) => {
      state.error = action.payload;
    });
});
