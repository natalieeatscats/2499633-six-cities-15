import { Navigate } from 'react-router-dom';
import { Addresses } from '../../const';
import { AuthStatus, State } from '../../types';
import { useSelector } from 'react-redux';

type PrivateRouteProps = {
    children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {

  const authStatus: AuthStatus = useSelector((state: State) => state.authorizationStatus);
  return (
    authStatus === 'AUTH'
      ? children
      : <Navigate to={Addresses.Login} />
  );
};

