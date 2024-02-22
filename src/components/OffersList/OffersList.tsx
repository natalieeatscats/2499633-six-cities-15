import { OfferData } from '../../mocks/offers';
import Card from '../Card/Card';

type OffersProps = {
  offers: OfferData[];
}

export const OffersList = ({offers}: OffersProps) => (

  offers.map((offer) => (
    <Card offer={offer} key={offer.id} />
  ))
);
