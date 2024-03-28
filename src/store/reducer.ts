import { AuthStatus, SelectedOfferData, CityData, OfferData, ReviewData, State } from './../types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState : State = {
  city: {
    name: 'Paris',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    }
  },
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
  favoriteOffers: [],
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<CityData>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<OfferData[]>) => {
      state.offers = action.payload;
    },
    updateOffer: (state, action: PayloadAction<{ id: string; offer: OfferData }>) => {
      const offerToUpdate = state.offers.findIndex((offer) => offer.id === action.payload.id);
      state.offers[offerToUpdate] = action.payload.offer;
    }
  }
});

export const { setCity, setOffers, updateOffer } = offersSlice.actions;
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
    setFavorites: (state, action: PayloadAction<OfferData[]>) => {
      state.favoriteOffers = action.payload;
    },
  }
});

export const { setError, setAuthStatus, setUserData, setFavorites } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;
