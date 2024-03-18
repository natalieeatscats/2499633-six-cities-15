import { Navigate } from 'react-router-dom';
import { Addresses } from '../../const';
import { AuthStatus } from '../../types';

type PrivateRouteProps = {
    authorizationStatus: AuthStatus;
    children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === 'AUTH'
      ? children
      : <Navigate to={Addresses.Login} />
  );
}

export default PrivateRoute;
