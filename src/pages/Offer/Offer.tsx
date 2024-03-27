import { Navigate, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { handleStars } from '../../const';
import { RatingStars } from './RatingStars';
import { OfferFeatures } from './OfferFeatures';
import { OfferInside } from './OfferInside';
import { Host } from './Host';
import { OfferReviews } from './OfferReviews';
import NearbyOffers from './NearbyOffers';
import { BookmarkButton } from '../../components/BookmarkButton/BookmarkButton';
import { useDispatch, useSelector } from 'react-redux';
import { OfferData, State } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import { loadActiveOffer, loadNearbyOffers, loadReviews } from '../../store/action';
import { AnyAction, ThunkDispatch, createSelector } from '@reduxjs/toolkit';
import Map from '../../components/Map/Map';


export const Offer = () => {
  const params = useParams();
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const currentState = useSelector((state: State) => state);
  const getTargetReviews = createSelector([(state: State) => state.reviews], (reviews) => reviews);
  const targetReviews = getTargetReviews(currentState);
  const getTargetOffer = createSelector([(state: State) => state.activeOffer], (offer) => offer);
  const targetOffer = getTargetOffer(currentState);
  const getNearbyOffers = createSelector([(state: State) => state.nearbyOffers], (offers) => offers);
  const nearbyOffers = getNearbyOffers(currentState);
  const [activeOffer, setActiveOffer] = useState(nearbyOffers?.[0]);
  const onActiveOfferChangeHandler = useCallback((offer: OfferData) => {
    setActiveOffer(offer);
  }, []);

  const activePoints = nearbyOffers && nearbyOffers.map(({ id, location: { latitude, longitude } }) => ({
    id,
    latitude,
    longitude,
  }));

  const selectedPoint = activeOffer && {
    id: activeOffer.id,
    latitude: activeOffer.location.latitude,
    longitude: activeOffer.location.longitude,
  };

  useEffect(() => {
    if (params.id) {
      dispatch(loadActiveOffer(params.id));
      dispatch(loadReviews(params.id));
      dispatch(loadNearbyOffers(params.id));
    }
  }, [dispatch, params]);

  if (targetOffer === undefined) {
    return <Navigate to='*'/>;
  }

  const ratingStyle = { width: '80%' };
  ratingStyle.width = handleStars(targetOffer.rating);

  return (
    <Layout>
      <>
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">

              {targetOffer.images.map((image, index) => {
                const key = index;
                return(
                  <div className="offer__image-wrapper" key={key}>
                    <img
                      className="offer__image"
                      src={image}
                      alt="Photo studio"

                    />
                  </div>);
              })}

            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {targetOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {targetOffer.title}
                </h1>
                <BookmarkButton type={'offer'} isBookmarked={targetOffer.isFavorite} />
              </div>
              <RatingStars rating={targetOffer.rating} />
              <OfferFeatures features={targetOffer} />
              <div className="offer__price">
                <b className="offer__price-value">€{targetOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferInside goods={targetOffer.goods} />
              <Host
                host={targetOffer.host}
                avatarUrl={targetOffer.host.avatarUrl}
                description={targetOffer.description}
              />
              <OfferReviews reviews={targetReviews} id={targetOffer.id} />
            </div>
          </div>
          {activeOffer && nearbyOffers && <Map city={activeOffer.city} points={activePoints} selectedPoint={selectedPoint} className='offer__map map'/>}
        </section>
        {nearbyOffers && <NearbyOffers offers={nearbyOffers} onActiveOfferChangeHandler={onActiveOfferChangeHandler}/>}
      </>
    </Layout>

  );
};
