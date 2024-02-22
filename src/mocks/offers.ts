export type OfferData = {
  id: number;
  isPremium?: boolean;
  type: 'Apartment' | 'House' | 'Room';
  rating: 1 | 2 | 3 | 4 | 5;
  price: number;
  title: string;
};

const OFFERS: OfferData[] = [
  {
    id: 122,
    isPremium: true,
    type: 'Apartment',
    rating: 4,
    price: 300,
    title: 'Luxurious flat in the centre of Brussels',
  },
  {
    id: 32,
    type: 'Room',
    rating: 3,
    price: 120,
    title: 'Spacious room in a historical building',
  },
  {
    id: 5223,
    isPremium: true,
    type: 'House',
    rating: 5,
    price: 400,
    title: 'Lovely cabin in the countryside',
  },
  {
    id: 23568,
    isPremium: true,
    type: 'Apartment',
    rating: 2,
    price: 620,
    title: 'Overpriced crumbling apartment',
  }
];

export default OFFERS;
