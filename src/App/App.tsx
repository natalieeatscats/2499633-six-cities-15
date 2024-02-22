import MainPage from '../pages/Main/Main';
import { Addresses, AuthorizationStatus } from '../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { Favorites } from '../pages/Favorites/Favorites';
import { Offer } from '../pages/Offer/Offer';
import { NotFound } from '../pages/404/404';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { OfferData } from '../mocks/offers';

type AppProps = {
  offers: OfferData[];
}

export const App = ({offers}: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route path={Addresses.Main} element={<MainPage offers={offers}/>} />
      <Route path={Addresses.Login} element={<Login/>} />
      <Route path={Addresses.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><Favorites/></PrivateRoute>} />
      <Route path={Addresses.Offer} element={<Offer/>} />
      <Route path={'*'} element={<NotFound/>} />
    </Routes>

  </BrowserRouter>

);
