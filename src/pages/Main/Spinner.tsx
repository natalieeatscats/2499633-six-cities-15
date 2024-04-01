import { useSelector } from 'react-redux';
import { State } from '../../types';
import './spinner.css';

export const Spinner = () => {

  const errorMessage = useSelector((state: State) => state.error);

  return (
    <div className='spinner'>
      { errorMessage ? <b className='spinner__error'>Error:<br />{errorMessage}</b> : <b className='spinner__loading tabs__item--active'>Loading...</b>}
    </div>

  );

};
