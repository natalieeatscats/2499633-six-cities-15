import MainPage from '../pages/Main/Main';
import { Addresses, AuthorizationStatus } from '../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { Favorites } from '../pages/Favorites/Favorites';
import { Offer } from '../pages/Offer/Offer';
import { NotFound } from '../pages/404/404';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { ReviewData } from '../mocks/reviews';
import { MainContent } from '../pages/Main/MainContent';

type AppProps = {
  reviews: ReviewData[];
}

export const App = ({ reviews }: AppProps) => (
  <BrowserRouter>
    <Routes>
      <Route path={Addresses.Main} element={<MainPage/>}>
        <Route path=':city' element={<MainContent/>}></Route>
      </Route>
      <Route path={Addresses.Login} element={<Login/>} />
      <Route path={Addresses.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.AUTH}><Favorites/></PrivateRoute>} />
      <Route path={Addresses.Offer} element={<Offer reviews={reviews} />} />
      <Route path={'*'} element={<NotFound/>} />
    </Routes>
  </BrowserRouter>

);
