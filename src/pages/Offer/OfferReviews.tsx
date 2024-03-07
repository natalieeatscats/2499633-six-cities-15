import { ReviewForm } from '../../components/ReviewForm/ReviewForm';
import { Review } from './Review';

type TReview = {
  date: string;
  comment: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
  };
};

type TProps = {
  reviews: TReview[];
};

export const OfferReviews = ({ reviews }: TProps) => (
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
            key={`${review.user.name}(${date})`}
          />
        );
      })}
    </ul>
    <ReviewForm></ReviewForm>
  </section>
);

