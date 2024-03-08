export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export enum Addresses {
    Main = '/',
    Login = '/login',
    Favorites = '/favorites',
    Offer = '/offer/:id',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
}

export const handleStars = (width: number) => `${String(Math.round(width * 20))}%`;

export const URL_MARKER_DEFAULT: string = 'img/pin.svg';
export const URL_MARKER_CURRENT: string = 'img/pin-active.svg';

