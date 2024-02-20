import { Link } from 'react-router-dom';
import { Addresses } from '../../const';

export const NotFound = () => (
  <>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <Link to={Addresses.Main}>To Main</Link>
  </>

);
