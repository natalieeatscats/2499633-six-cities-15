import { CITIES } from './const';

export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type Point = {
  id: string;
  latitude: number;
  longitude: number;
};

export type Points = Point[];

export type OfferData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
  name: string;
  location: {
  latitude: number;
  longitude: number;
  zoom: number;
  };};
  location: {
  latitude: number;
  longitude: number;
  zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type SelectedOfferData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
  name: string;
  location: {
  latitude: number;
  longitude: number;
  zoom: number;
  };};
  location: {
  latitude: number;
  longitude: number;
  zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};

export type CityName = typeof CITIES[number];

export type State = {
  city: CityName;
  offers: OfferData[];
  reviews: ReviewData[];
  activeOffer: SelectedOfferData;
  error: string | null;
};

export type ReviewData = {
id: string;
date: string;
user: {
name: string;
avatarUrl: string;
isPro: boolean;
};
comment: string;
rating: number;
}

