import { createAction } from '@reduxjs/toolkit';
import { OfferData, cityName } from './types';

export const setCity = createAction('SET_CITY', (city: cityName) => ({
  payload: city,
}));

export const setOffers = createAction('SET_OFFERS', (city: cityName, offers: ReadonlyArray<OfferData>) => ({
  payload: offers.filter((offer) => offer.city.name === city),
}));
