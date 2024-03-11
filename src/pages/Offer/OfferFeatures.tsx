import { OfferData } from '../../types';

type Props = {
  features: OfferData;
};

export const OfferFeatures = ({ features }: Props) => {
  const FEATURES = {
    bedrooms: {
      text: 'Bedroom',
      value: features.bedrooms,
    },
    adults: {
      text: 'Adult',
      value: features.maxAdults,
    },
  };
  return (
    <ul className="offer__features">
      <li className='offer__feature offer__feature--entire'>{features.type}</li>
      {Object.entries(FEATURES).map(([key, value]) => (
        <li className={`offer__feature offer__feature--${key}`} key={key} >
          {value.value} {value.text}{value.value > 1 && 's'}
        </li>
      ))}
    </ul>
  );
};
