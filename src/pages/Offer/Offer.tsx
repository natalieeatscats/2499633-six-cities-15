import { Navigate, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { handleStars } from '../../const';
import { RatingStars } from './RatingStars';
import { OfferFeatures } from './OfferFeatures';
import { OfferInside } from './OfferInside';
import { Host } from './Host';
import { OfferReviews } from './OfferReviews';
import { NearbyOffers } from './NearbyOffers';
import { BookmarkButton } from '../../components/BookmarkButton/BookmarkButton';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types';
import { useEffect } from 'react';
import { loadActiveOffer, loadReviews } from '../../store/action';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';


export const Offer = () => {
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const targetReviews = useSelector((state: State) => state.reviews);
  const params = useParams();
  const targetOffer = useSelector((state: State) => state.activeOffer);

  useEffect(() => {
    if (params.id) {
      dispatch(loadActiveOffer(params.id));
      dispatch(loadReviews(params.id));
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
                <BookmarkButton />
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
          <section className="offer__map map" />
        </section>
        <NearbyOffers/>
      </>
    </Layout>

  );
};
