import MainPage from '../pages/Main/Main';
import { Addresses, AuthorizationStatus } from '../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { Favorites } from '../pages/Favorites/Favorites';
import { Offer } from '../pages/Offer/Offer';
import { Layout } from '../components/Layout/Layout';
import { NotFound } from '../pages/404/404';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Addresses.Main} element={<Layout><MainPage offerQuant={5}/></Layout>} />
      <Route path={Addresses.Login} element={<Layout><Login/></Layout>} />
      <Route path={Addresses.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><Layout><Favorites/></Layout></PrivateRoute>} />
      <Route path={Addresses.Offer} element={<Layout><Offer/></Layout>} />
      <Route path={'*'} element={<Layout><NotFound/></Layout>} />
    </Routes>

  </BrowserRouter>

);

