import { useSelector } from 'react-redux';
import { State } from '../../types';

export const Spinner = () => {

  const errorMessage = useSelector((state: State) => state.error);

  return errorMessage ? <b className='cities__status-description places__found'>Error:<br/>{errorMessage}</b> : <b className='cities__status-description places__found'>Loading...</b>;

};
