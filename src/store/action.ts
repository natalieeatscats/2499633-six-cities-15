import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferData, ReviewData, CityName, SelectedOfferData } from '../types';
import { api } from '.';

export const setCity = createAction('SET_CITY', (city: CityName) => ({
  payload: city,
}));

export const setOffers = createAction('SET_OFFERS', (offers: OfferData[]) => ({
  payload: offers,
}));

export const loadOffers = createAsyncThunk(
  'SET_OFFERS',
  async (_, thunk) => {
    const response = await api.get('/offers');
    const offers: OfferData[] = response.data as OfferData[];
    thunk.dispatch(setOffers(offers));
  }

);

export const setReviews = createAction('SET_REVIEWS', (reviews: ReviewData[]) => ({
  payload: reviews,
}));

export const loadReviews = createAsyncThunk(
  'SET_REVIEWS',
  async (id: string, thunk) => {
    const response = await api.get(`/comments/${id}`);
    const reviews: ReviewData[] = response.data as ReviewData[];
    thunk.dispatch(setReviews(reviews));
  }
);

export const setActiveOffer = createAction('SET_ACTIVE_OFFER', (offer: SelectedOfferData | undefined) => ({
  payload: offer,
}));

export const loadActiveOffer = createAsyncThunk(
  'SET_ACTIVE_OFFER',
  async (id: string, thunk) => {
    const response = await api.get(`/offers/${id}`);
    const offer: SelectedOfferData = response.data as SelectedOfferData;
    thunk.dispatch(setActiveOffer(offer));
  }
);

