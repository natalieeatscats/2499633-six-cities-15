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

  const getReviewRatingStyle = (rating: number) => {
    let reviewRatingStyle = ratingStyle;
    reviewRatingStyle = { width: `${handleStars(rating)}%` };
    return reviewRatingStyle;
  };


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
              {targetOffer.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div> : null}
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
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {targetOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={targetOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{targetOffer.host.name}</span>
                  {targetOffer.host.isPro ? <span className="offer__user-status">Pro</span> : null}
                </div>
                <div className="offer__description">
                  {targetOffer.description}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews {targetReviews.length > 0 ? '·' : null}<span className="reviews__amount">{targetReviews.length > 0 ? targetReviews.length : null}</span>
                </h2>
                <ul className="reviews__list">
                  {targetReviews.map((review) => {
                    const date = new Date(review.date).toDateString();

                    return (
                      <li className="reviews__item" key={`${review.user.name}(${date})`}>
                        <div className="reviews__user user">
                          <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img
                              className="reviews__avatar user__avatar"
                              src={review.user.avatarUrl}
                              width={54}
                              height={54}
                              alt="Reviews avatar"
                            />
                          </div>
                          <span className="reviews__user-name">{review.user.name}</span>
                        </div>
                        <div className="reviews__info">
                          <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                              <span style={getReviewRatingStyle(review.rating)} />
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <p className="reviews__text">
                            {review.comment}
                          </p>
                          <time className="reviews__time" dateTime={review.date}>
                            {date}
                          </time>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <ReviewForm></ReviewForm>
              </section>
            </div>
          </div>
          <section className="offer__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/room.jpg"
                      width={260}
                      height={200}
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€80</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button
                      className="place-card__bookmark-button place-card__bookmark-button--active button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width={18}
                        height={19}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Wood and stone place</a>
                  </h2>
                  <p className="place-card__type">Room</p>
                </div>
              </article>
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-02.jpg"
                      width={260}
                      height={200}
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€132</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width={18}
                        height={19}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Canal View Prinsengracht</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
              <article className="near-places__card place-card">
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-03.jpg"
                      width={260}
                      height={200}
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€180</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width={18}
                        height={19}
                      >
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '100%' }} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </>
    </Layout>

  );
};
