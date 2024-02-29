import { RatingStar } from './RatingStar/RatingStar';

type TProps = {
  onRatingChange: (rating: number) => void;
}

export const RatingSelect = ({ onRatingChange }: TProps) => (
  <>
    <label className="reviews__label form__label" htmlFor="review">
      Your review
    </label>
    <div className="reviews__rating-form form__rating">
      {new Array(5).fill(1).map((_, index) => {
        const key = 5 - index;
        return (<RatingStar value={key} onChange={onRatingChange} key={key}></RatingStar>);
      })}
    </div>
  </>
);
