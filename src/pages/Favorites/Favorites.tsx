import { Layout } from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types';
import { AnyAction, ThunkDispatch, createSelector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { loadFavorites } from '../../store/action';
import { FavoritesList } from './favorites-list';


export const Favorites = () => {

  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const currentState = useSelector((state: State) => state);
  const getFavorites = createSelector([(state: State) => state.favoriteOffers], (favoriteOffers) => favoriteOffers);
  const favoriteOffers = getFavorites(currentState);
  useEffect(() => {
    if (favoriteOffers === null) {
      dispatch(loadFavorites());
    }
  });

  return(
    <Layout>
      {favoriteOffers && favoriteOffers.length > 0 ?
        <div className="page__favorites-container container">
          <section className="favorites">
            <FavoritesList offers={favoriteOffers} type='favorites'/>
          </section>
          <footer className="footer container">
            <a className="footer__logo-link" href="main.html">
              <img
                className="footer__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width={64}
                height={33}
              />
            </a>
          </footer>
        </div>
        :
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>}
    </Layout>
  );
};
