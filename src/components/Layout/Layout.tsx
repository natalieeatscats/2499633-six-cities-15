import { Link } from 'react-router-dom';
import { Addresses } from '../../const';
import { useEffect } from 'react';
import { loadAuthStatus, loadFavorites } from '../../store/action';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthStatus, State } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUser } from './AuthUser';
import { NoAuthUser } from './NoAuthUser';

type LayoutProps = {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const authStatus: AuthStatus = useSelector((state: State) => state.authorizationStatus);
  const isAuth = authStatus === 'AUTH';

  useEffect(() => {
    if (authStatus === 'UNKNOWN') {
      dispatch(loadAuthStatus());
      return;
    }
    if (authStatus === 'AUTH') {
      dispatch(loadFavorites());
    }
  }, [authStatus, dispatch]);

  return (
    <div className='page page--gray'>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={Addresses.Main} className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              {isAuth ? <AuthUser /> : <NoAuthUser />}
            </nav>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>

  );
};


