import { useState } from 'react';
import { RatingSelect } from './RatingSelect/RatingSelect';

export const ReviewForm = () => {
  const [, setValues] = useState({
    rating: 0,
    comment: '',
  });
  const handleRating = (rating: number) => {
    setValues((prev) => ({
      ...prev,
      rating,
    }));
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <RatingSelect onRatingChange={handleRating}></RatingSelect>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={(e) => (
          setValues((prev) => ({
            ...prev,
            comment: e.target.value,
          })))}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
                      your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
                      Submit
        </button>
      </div>
    </form>
  );
};
