export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
] as const;

export const SORT_BY_VALUES: string[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

export enum Addresses {
    Main = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer/:id',
}

export enum AuthorizationStatus {
    AUTH = 'AUTH',
    NO_AUTH = 'NO_AUTH',
    UNKNOWN = 'UNKNOWN'
}

export const handleStars = (width: number) => `${String(Math.round(width) * 20)}%`;

export const URL_MARKER_DEFAULT: string = 'img/pin.svg';
export const URL_MARKER_CURRENT: string = 'img/pin-active.svg';


