import { useSelector } from 'react-redux';
import { ReviewForm } from '../../components/ReviewForm/ReviewForm';
import { Review } from './Review';
import { State } from '../../types';

type Review = {
  date: string;
  comment: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
  };
};

type Props = {
  reviews: Review[];
  id: string;
};

export const OfferReviews = ({ reviews, id }: Props) => {
  const isAuth = useSelector((state: State) => state.authorizationStatus) === 'AUTH';

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
      Reviews {reviews.length > 0 && '·'}<span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => {
          const date = new Date(review.date).toDateString();

          return (
            <Review
              review={review}
              key={`${review.user.name} (${date}) ${review.comment}`}
              date={date}
            />
          );
        })}
      </ul>
      {isAuth && <ReviewForm id={id}></ReviewForm>}
    </section>
  );
};

