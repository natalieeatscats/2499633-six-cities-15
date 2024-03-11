import { OfferData } from '../../types';
import { OfferFeature } from './OfferFeature';

type Props = {
  features: OfferData;
};

export const OfferFeatures = ({ features }: Props) => {
  const Features = {
    entire: features.type,
    bedrooms: features.bedrooms,
    adults: features.maxAdults,
  };
  return (
    <ul className="offer__features">
      {Object.entries(Features).map(([key, value]) => (
        <OfferFeature featureType={key} value={value} key={key} />
      ))}
    </ul>
  );
};
