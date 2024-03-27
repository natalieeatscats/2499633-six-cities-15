import { OfferData } from '../../types';
import Card from '../card/card';
import { Link } from 'react-router-dom';

type OffersProps = {
  offers: OfferData[];
  onActiveOfferChangeHandler?: (offer: OfferData) => void;
  type: string;
}

export const OffersList = ({ offers, onActiveOfferChangeHandler, type }: OffersProps) => {
  const handleScroll = () => window.scrollTo({top: 0});

  return (

    offers.map((offer) => (
      <Link to={`/offer/${offer.id}`} onMouseEnter={onActiveOfferChangeHandler && (() => onActiveOfferChangeHandler(offer))} onClick={handleScroll} key={offer.id} >
        <Card offer={offer} type={type} />
      </Link>
    ))
  );
};
