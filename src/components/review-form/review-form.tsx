import { FormEvent, useState } from 'react';
import { RatingSelect } from './rating-select/rating-select';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../store/action';

type ReviewFormProps = {
  id: string;
}
export const ReviewForm = ({id}: ReviewFormProps) => {
  const [values, setValues] = useState({
    rating: 0,
    comment: '',
  });
  const handleRating = (rating: number) => {
    setValues((prev) => ({
      ...prev,
      rating,
    }));
  };
  const errorMessage = useSelector((state: State) => state.error);
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const handlePostReview = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(postComment({ ...values, id }));
    if (!errorMessage) {
      setValues({
        rating: 0,
        comment: '',
      });
    }
  };

  const isValidReview = values.rating !== 0 && values.comment.length > 50 && values.comment.length < 300;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handlePostReview}>
      <RatingSelect onRatingChange={handleRating} selectedRating={values.rating}></RatingSelect>
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
        value={values.comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
                      your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
          <br/> {errorMessage}
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValidReview}
        >
                      Submit
        </button>
      </div>
    </form>
  );
};
