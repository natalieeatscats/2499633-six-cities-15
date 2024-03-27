import { useParams } from 'react-router-dom';
import { OffersList } from '../../components/offers-list/offers-list';
import { OfferData, CityName } from '../../types';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { SortOptions } from './sort-options/sort-options';
import Map from '../../components/map/map';
import { useDispatch, useSelector } from 'react-redux';
import { loadOffers } from '../../store/action';
import { setCity } from '../../store/reducer';
import { State } from '../../types';
import { CITIES, SORT_BY_VALUES } from '../../const';
import { AnyAction, ThunkDispatch, createSelector } from '@reduxjs/toolkit';
import { Spinner } from './spinner';
import { MainEmpty } from './main-empty';


export const MainContent = () => {

  const params = useParams();
  const currentState = useSelector((state: State) => state);
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const getSelectedCity = createSelector([(state: State) => state.city], (city) => city);
  const selectedCity: CityName = getSelectedCity(currentState);
  const getOffers = createSelector([(state: State) => state.offers], (offers) => offers);
  const offers = getOffers(currentState);

  useEffect(() => {
    if (params.city === undefined) {
      dispatch(setCity(CITIES[0]));
    } else {
      dispatch(setCity(params.city as CityName));
    }
  }, [params.city, dispatch]);

  useEffect(() => {

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
      {sortedOffers.length !== 0 ?
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            {offers.length === 0 && <Spinner/>}
            <b className="places__found">{sortedOffers.length} place{sortedOffers.length > 1 && 's' } to stay in {selectedCity}</b>
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
              <OffersList onActiveOfferChangeHandler={onActiveOfferChangeHandler} offers={sortedOffers} type='cities' />
            </div>
          </section>
          <div className='cities__right-section'>
            {activeOffer && <Map city={activeOffer.city} points={activePoints} selectedPoint={selectedPoint} className='cities__map map'/>}
          </div>
        </div> : <MainEmpty city={selectedCity}/>}
    </div>
  );
};
