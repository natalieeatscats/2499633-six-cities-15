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

const OFFERS: OfferData[] = [
  {
    id: '6af6f711',
    title: 'Luxurious apartment in the centre of Brussels',
    type: 'Apartment',
    price: 300,
    city: {
      name: 'Brussels',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },},
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
    description: 'This luxury apartment has all you need for a dream vacation in Europe',
    bedrooms: 2,
    goods: ['Heating', 'TV'],
    host: {
      name: 'Heimich Balooney',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    images: ['img/apartment-01.jpg','img/apartment-02.jpg','img/apartment-03.jpg','img/apartment-small-03.jpg'],
    maxAdults: 3,

  },
  {
    id: 'c28d',
    title: 'Luxurious apartment in the centre of Cologne',
    type: 'Apartment',
    price: 300,
    city: {
      name: 'Cologne',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },},
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 1.2,
    description: 'This luxury apartment has all you need for a dream vacation in Europe',
    bedrooms: 2,
    goods: ['Heating', 'TV'],
    host: {
      name: 'Heimich Balooney',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    images: ['img/apartment-01.jpg','img/apartment-02.jpg','img/apartment-03.jpg','img/apartment-small-03.jpg'],
    maxAdults: 3,

  },
  {
    id: '4121',
    title: 'Luxurious apartment in the centre of Paris',
    type: 'Apartment',
    price: 300,
    city: {
      name: 'Paris',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },},
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 3.5,
    description: 'This luxury apartment has all you need for a dream vacation in Europe',
    bedrooms: 2,
    goods: ['Heating', 'TV'],
    host: {
      name: 'Heimich Balooney',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    images: ['img/apartment-01.jpg','img/apartment-02.jpg','img/apartment-03.jpg','img/apartment-small-03.jpg'],
    maxAdults: 3,

  },
  {
    id: '82cd',
    title: 'Luxurious apartment in the centre of Amsterdam',
    type: 'Apartment',
    price: 300,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },},
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 2.3,
    description: 'This luxury apartment has all you need for a dream vacation in Europe',
    bedrooms: 2,
    goods: ['Heating', 'TV'],
    host: {
      name: 'Heimich Balooney',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    images: ['img/apartment-01.jpg','img/apartment-02.jpg','img/apartment-03.jpg','img/apartment-small-03.jpg'],
    maxAdults: 3,

  }
];

export default OFFERS;
