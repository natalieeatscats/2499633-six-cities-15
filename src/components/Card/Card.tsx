import { MouseEventHandler, memo } from 'react';
import { Addresses, handleStars } from '../../const';
import { OfferData, State } from '../../types';
import BookmarkButton from '../BookmarkButton/BookmarkButton';
import { AnyAction, ThunkDispatch, createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/action';
import { useNavigate } from 'react-router-dom';

type CardProps = {
  offer: OfferData;
  type: string;
}


const Card = ({ offer, type }: CardProps) => {
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const currentState = useSelector((state: State) => state);
  const getAuthStatus = createSelector([(state: State) => state.authorizationStatus], (status) => status);
  const isAuth = getAuthStatus(currentState) === 'AUTH';
  const ratingStyle = { width: '80%' };
  const navigate = useNavigate();
  const handleBookmark: MouseEventHandler = (evt) => {
    evt.preventDefault();
    if (isAuth) {
      dispatch(toggleFavorite({ id: offer.id, status: offer.isFavorite }));
      return;
    }
    navigate(Addresses.Login);
  };
  ratingStyle.width = handleStars(offer.rating);

  return (
    <article className={`${type}__card place-card`}>
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${type}__image-wrapper place-card__image-wrapper`}>
        <img
          className="place-card__image"
          src={offer.previewImage}
          width={260}
          height={200}
          alt="Place image"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton type="place" isBookmarked={offer.isFavorite} handleBookmark={handleBookmark}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={ratingStyle} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          {offer.title}
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default memo(Card) as typeof Card;
