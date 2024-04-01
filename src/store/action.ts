import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferData, ReviewData, SelectedOfferData, State } from '../types';
import { api } from '.';
import { AxiosError } from 'axios';
import { setOffers, setError, setReviews, setActiveOffer, setNearbyOffers, setAuthStatus, setUserData, setFavorites, updateOffer, setCity } from './reducer';

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
      console.log('loadOffers');
      const state: State = thunk.getState() as State;
      const user: State['userData'] = state.userData;
      const response = await api.get('/offers', {headers: {'X-Token': user?.token}});
      const offers: OfferData[] = response.data as OfferData[];

      thunk.dispatch(setOffers(offers));
      thunk.dispatch(setCity(offers[0].city));
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
      const state: State = thunk.getState() as State;
      const user: State['userData'] = state.userData;
      const response = await api.get(`/offers/${id}`, {headers: {'X-Token': user?.token}});
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
      const state: State = thunk.getState() as State;
      const user: State['userData'] = state.userData;
      const response = await api.get(`/offers/${id}/nearby`, {headers: {'X-Token': user?.token}});
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
      thunk.dispatch(setError(null));
      thunk.dispatch(loadOffers());

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
      const response = await api.post(`/comments/${data.id}`, { comment: data.comment, rating: data.rating }, { headers: { 'X-Token': user?.token } });
      thunk.dispatch(setError(null));
      thunk.dispatch(setReviews([...state.reviews, response.data as ReviewData]));
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
    }
  }
);

export const loadFavorites = createAsyncThunk(
  'SET_FAVORITES',
  async (_, thunk) => {
    try {
      const state: State = thunk.getState() as State;
      const user: State['userData'] = state.userData;
      const response = await api.get('/favorite', { headers: { 'X-Token': user?.token } });
      const offers: OfferData[] = response.data as OfferData[];
      thunk.dispatch(setFavorites(offers));
    } catch (err: unknown) {
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
    }
  }
);


export const toggleFavorite = createAsyncThunk(
  'TOGGLE_FAVORITE',
  async (data: { id: string; status: boolean}, thunk) => {
    const state: State = thunk.getState() as State;
    const currentOffer = state.offers?.find((offer) => offer.id === data.id);
    if (!currentOffer) {
      return;
    }
    try {
      const user: State['userData'] = state.userData;
      const newStatus = Number(!data.status);
      thunk.dispatch(updateOffer({ id: data.id, offer: {...currentOffer, isFavorite: !currentOffer?.isFavorite} }));
      const response = await api.post(`/favorite/${data.id}/${newStatus}`, {},{ headers: { 'X-Token': user?.token } });
      thunk.dispatch(setError(null));
      if (newStatus === 0) {
        thunk.dispatch(setFavorites([...state.favoriteOffers].toSpliced(state.favoriteOffers.findIndex((offer) => offer.id === data.id), 1)));
      } else {
        thunk.dispatch(setFavorites([...state.favoriteOffers, response.data as OfferData]));
      }
      thunk.dispatch(loadActiveOffer(data.id));
      thunk.dispatch(loadNearbyOffers(data.id));
    } catch (err: unknown) {
      thunk.dispatch(updateOffer({ id: data.id, offer: {...currentOffer, isFavorite: !currentOffer?.isFavorite} }));
      const errResponse: AxiosError = err as AxiosError;
      const errorMessage = extractError(errResponse);
      thunk.dispatch(setError(errorMessage));
    }
  }
);
