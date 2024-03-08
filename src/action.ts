import { createAction } from '@reduxjs/toolkit';
import { OfferData } from './types';
import { cities } from './const';

export const setCity = createAction('SET_CITY', (city: typeof cities[number]) => ({
  payload: city,
}));

export const setOffers = createAction('SET_OFFERS', (city: typeof cities[number], offers: ReadonlyArray<OfferData>) => ({
  payload: offers.filter((offer) => offer.city.name === city),
}));
