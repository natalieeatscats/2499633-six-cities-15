import { Link, useLocation, useMatches, useParams } from 'react-router-dom';
import { Addresses } from '../../const';
import { useEffect } from 'react';
import { loadAuthStatus, loadFavorites } from '../../store/action';
import { AuthStatus, State } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AuthUser } from './auth-user';
import { NoAuthUser } from './no-auth-user';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { getAuthStatus } from '../../store/selector';

type LayoutProps = {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const authStatus: AuthStatus = useSelector(getAuthStatus);
  const isAuth = authStatus === 'AUTH';
  const location = useLocation();
  const params = useParams();
  const paramPathname = Object.values(params)[0] as string;
  const pathname: string = location.pathname.replace(paramPathname, '');
  const getClassName = (() => {
    switch (pathname) {
      case '/':
        return {
          wrapper: 'page page--gray page--main',
          main: 'page__main page__main--index',
        };
      case '/favorites':
        return {
          wrapper: 'page',
          main: 'page__main page__main--favorites',
        };
      case '/offer/':
        return {
          wrapper: 'page',
          main: 'page__main page__main--offer',
        };
      case '/login':
        return {
          wrapper: 'page page--gray page--login',
          main: 'page__main page__main--login'
        };
      default:
        return {
          wrapper: 'page page--gray',
          main: 'page__main',
        };
    }
  });
  const { wrapper, main } = getClassName();
  console.log(pathname);

  useEffect(() => {
    if (authStatus === 'UNKNOWN') {
      dispatch(loadAuthStatus());
      return;
    }
    if (authStatus === 'AUTH') {
      dispatch(loadFavorites());
    }
  }, [authStatus]);

  return (
    <div className={wrapper}>
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
      <main className={main}>
        {children}
      </main>
    </div>

  );
};


