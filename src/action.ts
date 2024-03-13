import { createAction } from '@reduxjs/toolkit';
import { OfferData, CityName } from './types';

export const setCity = createAction('SET_CITY', (city: CityName) => ({
  payload: city,
}));

export const setOffers = createAction('SET_OFFERS', (city: CityName, offers: ReadonlyArray<OfferData>) => ({
  payload: offers.filter((offer) => offer.city.name === city),
}));
