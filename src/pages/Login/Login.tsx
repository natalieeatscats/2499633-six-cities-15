import { ChangeEvent, FormEvent, useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStatus, State } from '../../types';
import { tryAuth } from '../../store/action';
import { Navigate } from 'react-router-dom';
import { Addresses } from '../../const';


export const Login = () => {
  const authStatus: AuthStatus = useSelector((state: State) => state.authorizationStatus);
  const errorMessage = useSelector((state: State) => state.error);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch: ThunkDispatch<State, void, AnyAction> = useDispatch();
  const handleSignIn = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(tryAuth(formData));
  };

  return (
    <Layout>
      <>
        {authStatus === 'AUTH' && <Navigate to={Addresses.Main} />}
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSignIn}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleFieldChange}
                  value={formData.email}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleFieldChange}
                  value={formData.password}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
            {errorMessage && <p className="login__error">{errorMessage}</p>}
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </>
    </Layout>
  );
};
