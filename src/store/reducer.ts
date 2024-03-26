import { AuthStatus, SelectedOfferData } from './../types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  nearbyOffers: null,
  error: null,
  authorizationStatus: 'UNKNOWN',
  userData: null,
  favoriteOffers: null,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<OfferData[]>) => {
      state.offers = action.payload;
    },
  }
});

export const { setCity, setOffers } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;

export const activeOfferSlice = createSlice({
  name: 'activeOffer',
  initialState,
  reducers: {
    setActiveOffer: (state, action: PayloadAction<SelectedOfferData>) => {
      state.activeOffer = action.payload;
    },
    setNearbyOffers: (state, action: PayloadAction<OfferData[] | null>) => {
      state.nearbyOffers = action.payload;
    },
    setReviews: (state, action: PayloadAction<ReviewData[]>) => {
      state.reviews = action.payload;
    },
  }
});

export const { setActiveOffer, setNearbyOffers, setReviews } = activeOfferSlice.actions;
export const activeOfferReducer = activeOfferSlice.reducer;

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<State['userData'] | null>) => {
      state.userData = action.payload;
    },
    setFavorites: (state, action: PayloadAction<OfferData[] | null>) => {
      state.favoriteOffers = action.payload;
    },
  }
});

export const { setError, setAuthStatus, setUserData, setFavorites } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
