import { OfferData } from '../../types';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

type OffersProps = {
  offers: OfferData[];
  onActiveOfferChangeHandler?: (offer: OfferData) => void;
}

export const OffersList = ({ offers, onActiveOfferChangeHandler }: OffersProps) => {
  const handleScroll = () => window.scrollTo({top: 0});

  return (

    offers.map((offer) => (
      <Link to={`/offer/${offer.id}`} onMouseEnter={onActiveOfferChangeHandler && (() => onActiveOfferChangeHandler(offer))} onClick={handleScroll} key={offer.id} >
        <Card offer={offer}/>
      </Link>
    ))
  );
};

