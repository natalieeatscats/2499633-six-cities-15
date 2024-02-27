import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { OffersList } from '../../components/OffersList/OffersList';
import { OfferData } from '../../mocks/offers';
import { ReviewData } from '../../mocks/reviews';
import { MainContent } from './MainContent';


type MainPageProps = {
  offers: OfferData[];
  reviews: ReviewData[];
  city: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
}


export const MainPage = ({ city, offers, reviews }: MainPageProps) => {

  const params = useParams();

  return (
    <Layout>
      <>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <NavLink className={({isActive}) => isActive ? 'locations__item-link tabs__item' : 'locations__item-link tabs__item tabs__item--active'} to={'/Paris'}>
                  <span>Paris</span>
                </NavLink>
              </li>
              <li className="locations__item">
                <NavLink className={({isActive}) => isActive ? 'locations__item-link tabs__item' : 'locations__item-link tabs__item tabs__item--active'} to={'/Cologne'}>
                  <span>Cologne</span>
                </NavLink>
              </li>
              <li className="locations__item">
                <NavLink className={({isActive}) => isActive ? 'locations__item-link tabs__item' : 'locations__item-link tabs__item tabs__item--active'} to={'/Brussels'}>
                  <span>Brussels</span>
                </NavLink>
              </li>
              <li className="locations__item">
                <NavLink className={({isActive}) => isActive ? 'locations__item-link tabs__item' : 'locations__item-link tabs__item tabs__item--active'} to ={'/Amsterdam'}>
                  <span>Amsterdam</span>
                </NavLink>
              </li>
              <li className="locations__item">
                <NavLink className={({isActive}) => isActive ? 'locations__item-link tabs__item' : 'locations__item-link tabs__item tabs__item--active'} to={'/Hamburg'}>
                  <span>Hamburg</span>
                </NavLink>
              </li>
              <li className="locations__item">
                <NavLink className={({isActive}) => isActive ? 'locations__item-link tabs__item' : 'locations__item-link tabs__item tabs__item--active'} to={'/Dusseldorf'}>
                  <span>Dusseldorf</span>
                </NavLink>
              </li>
            </ul>
          </section>
        </div>
        {params.city === undefined ? <h1>Select a city to get started!</h1> : null}
        <Outlet />
      </>
    </Layout>
  );
};

export default MainPage;
