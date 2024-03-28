import { createSelector } from '@reduxjs/toolkit';
import { CityData, State } from '../types';

export const getOffers = createSelector([(state: State) => state.offers], (offers) => offers);
export const getTargetReviews = createSelector([(state: State) => state.reviews], (reviews) => reviews);
export const getTargetOffer = createSelector([(state: State) => state.activeOffer], (offer) => offer);
export const getNearbyOffers = createSelector([(state: State) => state.nearbyOffers], (offers) => offers);
export const getAuthStatus = createSelector([(state: State) => state.authorizationStatus], (status) => status);
export const getSelectedCity = createSelector([(state: State) => state.city], (city) => city);
export const getFavorites = createSelector([(state: State) => state.favoriteOffers], (favoriteOffers) => favoriteOffers);
export const extractCitiesData = createSelector([(state: State) => state.offers], (offers) => offers.reduce((acc: CityData[], offer) => {
  if (acc.some((value) => offer.city.name === value.name)) {
    return acc;
  }
  return [...acc, offer.city];
}, []));
export const extractCityNames = createSelector(extractCitiesData, (cities) => cities.map((city) => city.name));
export const getOffersByCity = createSelector([(state: State) => state.offers, (state: State) => state.city], (offers, city) => offers.filter((offer) => offer.city.name === city.name));