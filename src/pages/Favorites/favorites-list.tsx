import { OfferData } from '../../types';
import Card from '../../components/card/card';
import { Link } from 'react-router-dom';
import { CITIES } from '../../const';

type FavoritesProps = {
  offers: OfferData[];
  onActiveOfferChangeHandler?: (offer: OfferData) => void;
}

export const FavoritesList = ({ offers, onActiveOfferChangeHandler}: FavoritesProps) => {
  const handleScroll = () => window.scrollTo({ top: 0 });
  return (
    <ul className="favorites__list">
      {CITIES.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/${city}`}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers.filter((offer) => offer.city.name === city).map((offer) => (
              <Link
                to={`/offer/${offer.id}`}
                className="favorites__card"
                key={offer.id}
                onMouseEnter={() => onActiveOfferChangeHandler && onActiveOfferChangeHandler(offer)}
                onClick={handleScroll}
              >
                <Card offer={offer} type='favorites' />
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

