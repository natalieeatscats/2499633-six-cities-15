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


export const handleStars = (width: number) => `${String(width * 20)}%`;
