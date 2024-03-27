import { Link } from 'react-router-dom';
import { Addresses } from '../../const';
import { Layout } from '../../components/layout/layout';

export const NotFound = () => (
  <Layout>
    <>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to={Addresses.Main}>To Main</Link>
    </>
  </Layout>

);
