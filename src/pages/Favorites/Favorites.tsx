import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { OffersList } from '../../components/OffersList/OffersList';
import { OfferData } from '../../mocks/offers';
import { ReviewData } from '../../mocks/reviews';

type FavoritesProps = {
  offers: OfferData[];
  reviews: ReviewData[];
};


export const Favorites = ({ offers, reviews }: FavoritesProps) => {
  const params = useParams();
  const favoriteOffers = offers.filter((offer) => offer.isFavorite === true);


  return(
    <Layout>
      <div className="page__favorites-container container">
        <section className="favorites">
          <OffersList reviews={reviews} offers={favoriteOffers}></OffersList>
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
