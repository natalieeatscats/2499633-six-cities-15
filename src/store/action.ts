import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferData, ReviewData, CityName, SelectedOfferData, AuthStatus } from '../types';
import { api } from '.';
import { AxiosError } from 'axios';

const extractError = (err: AxiosError) => {
  if (typeof err?.message === 'string') {
    return err?.message;
  }
  return `Unknown error: ${JSON.stringify(err, null, 2)}`;
};

export const setError = createAction('SET_ERROR', (error: string | null) => ({
  payload: error,
}));

export const setCity = createAction('SET_CITY', (city: CityName) => ({
  payload: city,
}));

export const setOffers = createAction('SET_OFFERS', (offers: OfferData[]) => ({
  payload: offers,
}));

export const setReviews = createAction('SET_REVIEWS', (reviews: ReviewData[]) => ({
  payload: reviews,
}));

export const setActiveOffer = createAction('SET_ACTIVE_OFFER', (offer: SelectedOfferData | undefined) => ({
  payload: offer,
}));
export const setAuthStatus = createAction('SET_AUTH_STATUS', (status: AuthStatus) => ({
  payload: status,
}));

export const loadOffers = createAsyncThunk(
  'SET_OFFERS',
  async (_, thunk) => {
    try {
      const response = await api.get('/offers');
      const offers: OfferData[] = response.data as OfferData[];
      thunk.dispatch(setOffers(offers));
      thunk.dispatch(setError(null));
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
    }
  }
);

export const loadReviews = createAsyncThunk(
  'SET_REVIEWS',
  async (id: string, thunk) => {
    try {
      const response = await api.get(`/comments/${id}`);
      const reviews: ReviewData[] = response.data as ReviewData[];
      thunk.dispatch(setReviews(reviews));
      thunk.dispatch(setError(null));
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
    }
  }
);

export const loadActiveOffer = createAsyncThunk(
  'SET_ACTIVE_OFFER',
  async (id: string, thunk) => {
    try {
      const response = await api.get(`/offers/${id}`);
      const offer: SelectedOfferData = response.data as SelectedOfferData;
      thunk.dispatch(setActiveOffer(offer));
      thunk.dispatch(setError(null));
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
    }
  }
);

export const loadAuthStatus = createAsyncThunk(
  'SET_AUTH_STATUS',
  async (_, thunk) => {
    try {
      const response = await api.get('/login');

      if (response.status === 200) {
        thunk.dispatch(setAuthStatus('AUTH'));
        return;
      }

      thunk.dispatch(setAuthStatus('UNKNOWN'));

    } catch (err) {
      thunk.dispatch(setAuthStatus('NO_AUTH'));
    }
  }
);
