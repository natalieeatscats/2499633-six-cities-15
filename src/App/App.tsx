import MainPage from '../pages/Main/Main';
import { Addresses } from '../const';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login/Login';
import { Favorites } from '../pages/Favorites/Favorites';
import { Offer } from '../pages/Offer/Offer';
import { NotFound } from '../pages/404/404';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { MainContent } from '../pages/Main/MainContent';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Addresses.Main} element={<MainPage/>}>
        <Route path=':city' element={<MainContent/>}></Route>
      </Route>
      <Route path={Addresses.Login} element={<Login/>} />
      <Route path={Addresses.Favorites} element={<PrivateRoute><Favorites/></PrivateRoute>} />
      <Route path={Addresses.Offer} element={<Offer/>} />
      <Route path={'*'} element={<NotFound/>} />
    </Routes>
  </BrowserRouter>

);
