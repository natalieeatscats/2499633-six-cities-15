import { Navigate } from 'react-router-dom';
import { Addresses, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
    authorizationStatus: AuthorizationStatus;
    children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={Addresses.Login} />
  );
}

export default PrivateRoute;
