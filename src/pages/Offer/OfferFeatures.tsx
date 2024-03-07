import { OfferData } from '../../mocks/offers';
import { OfferFeature } from './OfferFeature';

type TProps = {
  features: OfferData;
};

export const OfferFeatures = ({ features }: TProps) => (
  <ul className="offer__features">
    <OfferFeature featureType="entire" value={features.type} />
    <OfferFeature featureType="bedrooms" value={features.bedrooms} />
    <OfferFeature featureType="adults" value={features.maxAdults} />
  </ul>
);

