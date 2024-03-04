import { OfferData } from '../../mocks/offers';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

type OffersProps = {
  offers: OfferData[];
  activeOffer: OfferData;
  onActiveOfferChangeHandler: (offer: OfferData) => void;
}

export const OffersList = ({ offers, onActiveOfferChangeHandler, activeOffer }: OffersProps) => (

  offers.map((offer) => (
    <Link to={`/offer/${offer.id}`} onMouseEnter={() => onActiveOfferChangeHandler(offer)} key={offer.id} >
      {activeOffer.id === offer.id ? <Card isActive offer={offer}/> : <Card offer={offer}/>}
    </Link>
  ))
);
