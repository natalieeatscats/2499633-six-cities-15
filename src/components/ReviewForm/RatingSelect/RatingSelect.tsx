import { RatingStar } from './RatingStar/RatingStar';

type TProps = {
  onRatingChange: (rating: number) => void;
}

export const RatingSelect = ({ onRatingChange }: TProps) => {
  const ratingValues = [
    5,
    4,
    3,
    2,
    1
  ];
  return (
    <>
      <label className="reviews__label form__label" htmlFor="review">
      Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingValues.map((value) => (<RatingStar value={value} onChange={onRatingChange} key={`rating-${value}`}></RatingStar>))}
      </div>
    </>
  );
};
