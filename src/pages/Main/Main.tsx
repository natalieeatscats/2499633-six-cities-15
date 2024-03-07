import { NavLink, Navigate, Outlet, useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';


export const MainPage = () => {

  const params = useParams();
  const cities = [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf'
  ];

  return (
    <Layout>
      <>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <NavLink className={({isActive}) => !isActive ? 'locations__item-link tabs__item' : 'locations__item-link tabs__item tabs__item--active'} to={`/${city}`} key={city}>
                  <span>{city}</span>
                </NavLink>
              ))}
            </ul>
          </section>
        </div>
        {params.city === undefined ? <Navigate to={'/Paris'} /> : null}
        <Outlet />
      </>
    </Layout>
  );
};

export default MainPage;
