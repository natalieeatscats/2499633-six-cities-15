import { NavLink, Navigate, Outlet, useParams } from 'react-router-dom';
import { Layout } from '../../components/layout/layout';
import { useSelector } from 'react-redux';
import { extractCityNames } from '../../store/selector';

export const MainPage = () => {
  const params = useParams();
  const CITIES = useSelector(extractCityNames);
  return(
    <Layout>
      <>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES ? CITIES.map((city) => (
                <NavLink
                  className={({ isActive }) => `locations__item-link tabs__item ${isActive && 'tabs__item--active'}`}
                  to={`/${city}`}
                  key={city}
                >
                  <span>{city}</span>
                </NavLink>
              )) : null}
            </ul>
          </section>
        </div>
        {!params.city && <Navigate to={`/${CITIES ? CITIES[0] : ' '}`} />}
        <Outlet />
      </>
    </Layout>
  );
};

export default MainPage;
