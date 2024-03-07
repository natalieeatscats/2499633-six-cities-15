import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { OffersList } from '../../components/OffersList/OffersList';
import { OfferData } from '../../mocks/offers';

type FavoritesProps = {
  offers: OfferData[];
};


export const Favorites = ({ offers}: FavoritesProps) => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite === true);
  const [activeOffer, setActiveOffer] = useState(favoriteOffers[0]);
  const onActiveOfferChangeHandler = (offer: OfferData) => setActiveOffer(offer);


  return(
    <Layout>
      <div className="page__favorites-container container">
        <section className="favorites">
          <OffersList activeOffer={activeOffer} onActiveOfferChangeHandler={onActiveOfferChangeHandler} offers={favoriteOffers}></OffersList>
        </section>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </a>
        </footer>
      </div>
    </Layout>
  );
};
