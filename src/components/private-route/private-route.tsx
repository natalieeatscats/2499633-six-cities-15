import { Navigate } from 'react-router-dom';
import { Addresses } from '../../const';
import { AuthStatus } from '../../types';
import { useSelector } from 'react-redux';
import { getAuthStatus } from '../../store/selector';

type PrivateRouteProps = {
    children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {

  const authStatus: AuthStatus = useSelector(getAuthStatus);
  return (
    authStatus === 'AUTH'
      ? children
      : <Navigate to={Addresses.Login} />
  );
};

