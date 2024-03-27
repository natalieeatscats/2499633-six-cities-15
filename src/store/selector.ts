import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types';

export const getOffers = createSelector([(state: State) => state.offers], (offers) => offers);
export const getTargetReviews = createSelector([(state: State) => state.reviews], (reviews) => reviews);
export const getTargetOffer = createSelector([(state: State) => state.activeOffer], (offer) => offer);
export const getNearbyOffers = createSelector([(state: State) => state.nearbyOffers], (offers) => offers);
export const getAuthStatus = createSelector([(state: State) => state.authorizationStatus], (status) => status);
export const getSelectedCity = createSelector([(state: State) => state.city], (city) => city);
export const getFavorites = createSelector([(state: State) => state.favoriteOffers], (favoriteOffers) => favoriteOffers);
