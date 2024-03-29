import { ReviewForm } from '../../components/review-form/review-form';
import { Review } from './review';
import { getAuthStatus } from '../../store/selector';
import { useSelector } from 'react-redux';
import { REVIEWS_TO_DISPLAY } from '../../const';

type TReview = {
  date: string;
  comment: string;
  rating: number;
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
};

type Props = {
  reviews: TReview[];
  id: string;
};

export const OfferReviews = ({ reviews, id }: Props) => {
  const isAuth = useSelector(getAuthStatus) === 'AUTH';
  const splicedReviews = reviews.toSpliced(REVIEWS_TO_DISPLAY);
  const reviewsToMap = reviews.length > REVIEWS_TO_DISPLAY ? splicedReviews : reviews;
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
      Reviews {reviews.length > 0 && '·'}<span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewsToMap.map((review) => {
          const date = new Date(review.date);
          const month = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date.getMonth());

          return (
            <Review
              review={review}
              key={`${review.id} (${month} ${date.getFullYear()}) ${review.comment}`}
              date={`${month} ${date.getFullYear()}`}
            />
          );
        })}
      </ul>
      {isAuth && <ReviewForm id={id}></ReviewForm>}
    </section>
  );
};

