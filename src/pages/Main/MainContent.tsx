import { useParams } from 'react-router-dom';
import { OffersList } from '../../components/OffersList/OffersList';
import { OfferData, CityName } from '../../types';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { SortOptions } from './SortOptions/SortOptions';
import Map from '../../components/Map/Map';
import { useDispatch, useSelector } from 'react-redux';
import { loadOffers, setCity } from '../../store/action';
import { State } from '../../types';
import { CITIES, SORT_BY_VALUES } from '../../const';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Spinner } from './Spinner';


export const MainContent = () => {

  const params = useParams();

  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const selectedCity: CityName = useSelector((state: State) => state.city);
  const offers = useSelector((state: State) => state.offers);


  useEffect(() => {
    if (params.city === undefined) {
      dispatch(setCity(CITIES[0]));
    } else {
      dispatch(setCity(params.city as CityName));
    }

    if (offers.length === 0) {
      dispatch(loadOffers());
    }

  }, [params.city, dispatch, offers]);

  const filteredOffers: OfferData[] = useMemo(() =>
    offers.filter((offer) => offer.city.name === selectedCity),
  [offers, selectedCity]);

  const [sortState, setSortState] = useState({
    sortIsOpened: false,
    sortBy: 'Popular',
  });
  const sortVisibilityHandler = useCallback(() => setSortState((prev) => ({
    ...prev,
    sortIsOpened: !prev.sortIsOpened,
  })), []);
  const sortByHandler = useCallback((sortBy: string) => setSortState((prev) => ({
    ...prev,
    sortBy
  })), []);
  const sortedOffers = useMemo(() =>
    filteredOffers.sort((a, b) => {
      switch (sortState.sortBy) {
        case 'Price: low to high':
          return a.price - b.price;
        case 'Price: high to low':
          return b.price - a.price;
        case 'Top rated first':
          return b.rating - a.rating;
        default:
          return 0;
      }
    }),
  [sortState, filteredOffers]);

  const [activeOffer, setActiveOffer] = useState(sortedOffers[0]);
  const onActiveOfferChangeHandler = useCallback((offer: OfferData) => setActiveOffer(offer), []);
  const activePoints = useMemo(() => sortedOffers.map(({ id, location: { latitude, longitude } }) => ({
    id,
    latitude,
    longitude,
  })), [sortedOffers]);

  const selectedPoint = activeOffer && {
    id: activeOffer.id,
    latitude: activeOffer.location.latitude,
    longitude: activeOffer.location.longitude,
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          {offers.length === 0 && <Spinner/>}
          {sortedOffers.length !== 0 ?
            <b className="places__found">{sortedOffers.length} place{sortedOffers.length > 1 && 's' } to stay in {selectedCity}</b>
            :
            <b className="places__found">No places found in {selectedCity}</b>}
          <form className="places__sorting" action="#" method="get" >
            <span className="places__sorting-caption">Sort by{' '}</span>
            <span className="places__sorting-type" tabIndex={0} onClick={() => sortVisibilityHandler()}>
              {sortState.sortBy}
              <svg className="places__sorting-arrow" width={7} height={4}>
                <use xlinkHref="#icon-arrow-select" />
              </svg>
            </span>
            <SortOptions
              sortIsOpened={sortState.sortIsOpened}
              sortVisibilityHandler={sortVisibilityHandler}
              sortBy={sortState.sortBy}
              sortByValues={SORT_BY_VALUES}
              sortByHandler={sortByHandler}
            />
          </form>
          <div className="cities__places-list places__list tabs__content">
            <OffersList onActiveOfferChangeHandler={onActiveOfferChangeHandler} offers={sortedOffers} />
          </div>
        </section>
        <div className='cities__right-section'>
          {activeOffer && <Map city={activeOffer.city} points={activePoints} selectedPoint={selectedPoint} className='cities__map map'/>}
        </div>
      </div>
    </div>
  );
};
