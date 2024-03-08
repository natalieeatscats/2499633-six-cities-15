import { Navigate, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { OfferData } from '../../mocks/offers';
import { handleStars } from '../../const';
import { ReviewData } from '../../mocks/reviews';
import { RatingStars } from './RatingStars';
import { OfferFeatures } from './OfferFeatures';
import { OfferInside } from './OfferInside';
import { Host } from './Host';
import { OfferReviews } from './OfferReviews';
import { NearbyOffers } from './NearbyOffers';
import { BookmarkButton } from '../../components/BookmarkButton/BookmarkButton';

type OfferProps = {
  offers: OfferData[];
  reviews: ReviewData[];
};


export const Offer = ({ offers, reviews }: OfferProps) => {

  const params = useParams();
  const targetOffer = offers.find((offer) => offer.id === params.id);
  const targetReviews = reviews.filter((review) => review.id === params.id);

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
              <OfferReviews reviews={targetReviews} />
            </div>
          </div>
          <section className="offer__map map" />
        </section>
        <NearbyOffers/>
      </>
    </Layout>

  );
};
