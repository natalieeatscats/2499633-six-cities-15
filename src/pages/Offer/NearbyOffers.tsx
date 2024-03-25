import { memo } from 'react';
import { OffersList } from '../../components/OffersList/OffersList';
import { OfferData } from '../../types';

type NearbyOffersProps = {
  offers: OfferData[];
  onActiveOfferChangeHandler: (offer: OfferData) => void;
}

const NearbyOffers = ({offers, onActiveOfferChangeHandler}: NearbyOffersProps) => (
  <div className="container">
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      {/* TODO: replace with nearby offers from props */}
      <div className="near-places__list places__list">
        <OffersList offers={offers} onActiveOfferChangeHandler={onActiveOfferChangeHandler}/>
      </div>
    </section>
  </div>
);

export default memo(NearbyOffers) as typeof NearbyOffers;
