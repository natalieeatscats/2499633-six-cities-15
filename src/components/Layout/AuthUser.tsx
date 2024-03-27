import { Link } from 'react-router-dom';
import { Addresses } from '../../const';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { State } from '../../types';
import { setAuthStatus } from '../../store/reducer';

export const AuthUser = () => {
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const handleSignOut = () => {
    dispatch(setAuthStatus('NO_AUTH'));
  };
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={Addresses.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">
                  Oliver.conner@gmail.com
          </span>
          <span className="header__favorite-count">3</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to={Addresses.Login} onClick={handleSignOut}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>
  );
};
