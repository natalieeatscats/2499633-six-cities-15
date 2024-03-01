import { useParams } from 'react-router-dom';
import { OffersList } from '../../components/OffersList/OffersList';
import { OfferData } from '../../mocks/offers';
import { ReviewData } from '../../mocks/reviews';
import { useState } from 'react';
import { SortOptions } from './SortOptions/SortOptions';

type MainContentProps = {
  reviews: ReviewData[];
  offers: OfferData[];
}

export const MainContent = ({ reviews, offers }: MainContentProps) => {

  const params = useParams();
  const selectedCity = params.city;
  const filteredOffers = offers.filter((offer) => offer.city.name === selectedCity);
  const [sortState, setSortState] = useState({
    sortIsOpened: false,
    sortBy: 'Popular',
  });
  const sortVisibilityHandler = () => setSortState((prev) => ({
    ...prev,
    sortIsOpened: !prev.sortIsOpened,
  }));
  const sortByValues: string[] = [
    'Popular',
    'Price: low to high',
    'Price: high to low',
    'Top rated first',
  ];
  const sortByHandler = (sortBy: string) => setSortState((prev) => ({
    ...prev,
    sortBy
  }));

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{filteredOffers.length} places to stay in {selectedCity}</b>
          <form className="places__sorting" action="#" method="get" >
            <span className="places__sorting-caption">Sort by{' '}</span>
            <span className="places__sorting-type" tabIndex={0} onClick={() => sortVisibilityHandler()}>
              {sortState.sortBy}
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <SortOptions sortIsOpened={sortState.sortIsOpened} sortVisibilityHandler={sortVisibilityHandler} sortBy={sortState.sortBy} sortByValues={sortByValues} sortByHandler={sortByHandler}></SortOptions>
          </form>
          <div className="cities__places-list places__list tabs__content">
            <OffersList reviews={reviews} offers={filteredOffers} />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map" />
        </div>
      </div>
    </div>
  );
};
