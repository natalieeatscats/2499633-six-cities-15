import { useParams } from 'react-router-dom';
import { OffersList } from '../../components/OffersList/OffersList';
import { OfferData } from '../../mocks/offers';
import { useState } from 'react';
import { SortOptions } from './SortOptions/SortOptions';
import { MapComponent } from '../../components/Map/MapComponent';

type MainContentProps = {
  offers: OfferData[];
}

export const MainContent = ({ offers }: MainContentProps) => {

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
  const [activeOffer, setActiveOffer] = useState(filteredOffers[0]);
  const onActiveOfferChangeHandler = (offer: OfferData) => setActiveOffer(offer);
  const activePoints = filteredOffers.map((offer) => ({
    id: offer.id,
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
  }));
  const selectedPoint = {
    id: activeOffer.id,
    latitude: activeOffer.location.latitude,
    longitude: activeOffer.location.longitude,
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          {filteredOffers.length !== 0 ?
            <b className="places__found">{filteredOffers.length} place{filteredOffers.length > 1 ? 's' : null} to stay in {selectedCity}</b>
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
              sortByValues={sortByValues}
              sortByHandler={sortByHandler}
            />
          </form>
          <div className="cities__places-list places__list tabs__content">
            <OffersList onActiveOfferChangeHandler={onActiveOfferChangeHandler} offers={filteredOffers} activeOffer={activeOffer} />
          </div>
        </section>
        <MapComponent activeOffer={activeOffer} activePoints={activePoints} selectedPoint={selectedPoint}/>
      </div>
    </div>
  );
};
