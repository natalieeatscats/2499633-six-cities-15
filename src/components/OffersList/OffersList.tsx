import { useState } from 'react';
import { OfferData } from '../../mocks/offers';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import { ReviewData } from '../../mocks/reviews';

type OffersProps = {
  offers: OfferData[];
  reviews: ReviewData[];
}

export const OffersList = ({ offers, reviews }: OffersProps) => {

  const [activeOffer, setActiveOffer] = useState('');

  return (

    offers.map((offer) => (
      <Link to={`../offer/${offer.id}`} state={{offers: offers, reviews: reviews}} onMouseEnter={() => setActiveOffer(offer.id)} onMouseLeave={() => setActiveOffer('')} key={offer.id} >
        {activeOffer === offer.id ? <Card isActive offer={offer}/> : <Card offer={offer}/>}
      </Link>
    ))
  );
};
