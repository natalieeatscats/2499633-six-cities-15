import { activeOfferState } from './reducer';
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
  userData: null
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
  }
});

export const { setError, setAuthStatus, setUserData } = apiSlice.actions;
export const apiReducer = apiSlice.reducer;

// export const rootReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase('SET_CITY', (state, action: { type: 'SET_CITY'; payload: CityName }) => {
//       state.city = action.payload;
//     })
//     .addCase('SET_OFFERS', (state, action: { type: 'SET_OFFERS'; payload: OfferData[] }) => {
//       state.offers = action.payload;
//     })
//     .addCase('SET_REVIEWS', (state, action: { type: 'SET_REVIEWS'; payload: ReviewData[] }) => {
//       state.reviews = action.payload;
//     })
//     .addCase('SET_ACTIVE_OFFER', (state, action: { type: 'SET_ACTIVE_OFFER'; payload: SelectedOfferData }) => {
//       state.activeOffer = action.payload;
//     })
//     .addCase('SET_NEARBY_OFFERS', (state, action: { type: 'SET_NEARBY_OFFERS'; payload: OfferData[] | null }) => {
//       state.nearbyOffers = action.payload;
//     })
//     .addCase('SET_ERROR', (state, action: { type: 'SET_ERROR'; payload: string | null }) => {
//       state.error = action.payload;
//     })
//     .addCase('SET_AUTH_STATUS', (state, action: { type: 'SET_AUTH_STATUS'; payload: AuthStatus }) => {
//       state.authorizationStatus = action.payload;
//     })
//     .addCase('SET_USER_DATA', (state, action: { type: 'SET_USER_DATA'; payload: State['userData'] | null }) => {
//       state.userData = action.payload;
//     });
// });
