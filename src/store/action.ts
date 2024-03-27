import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferData, ReviewData, SelectedOfferData, State } from '../types';
import { api } from '.';
import { AxiosError } from 'axios';
import { setOffers, setError, setReviews, setActiveOffer, setNearbyOffers, setAuthStatus, setUserData } from './reducer';

const extractError = (err: AxiosError) => {
  if (typeof err?.message === 'string') {
    return err?.message;
  }
  return `Unknown error: ${JSON.stringify(err, null, 2)}`;
};

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

export const loadNearbyOffers = createAsyncThunk(
  'SET_NEARBY_OFFERS',
  async (id: string, thunk) => {
    try {
      const response = await api.get(`/offers/${id}/nearby`);
      const offers: OfferData[] = response.data as OfferData[];
      thunk.dispatch(setNearbyOffers(offers));
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
      thunk.dispatch(setUserData(null));

    } catch (err) {
      thunk.dispatch(setAuthStatus('NO_AUTH'));
      thunk.dispatch(setUserData(null));
    }
  }
);

export const tryAuth = createAsyncThunk(
  'TRY_AUTH',
  async (data: {email: string; password: string}, thunk) => {
    try {
      const response = await api.post('/login', data);

      thunk.dispatch(setAuthStatus('AUTH'));
      thunk.dispatch(setUserData(response.data as State['userData']));

    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);

      thunk.dispatch(setError(errorMessage));
    }
  }
);


export const postComment = createAsyncThunk(
  'POST_COMMENT',
  async (data: { comment: string; rating: number; id: string }, thunk) => {
    try {
      const state: State = thunk.getState() as State;
      const user: State['userData'] = state.userData;
      await api.post(`/comments/${data.id}`, { comment: data.comment, rating: data.rating }, { headers: { 'X-Token': user?.token } });
      thunk.dispatch(setError(null));
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
    }
  }
);
