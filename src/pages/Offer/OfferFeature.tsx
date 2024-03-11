type OfferFeatureProps = {
  featureType: string;
  value: number | string;
};

const FEATURES = {
  entire: 'Entire place',
  bedrooms: 'Bedroom',
  adults: 'Adult',
};

export const OfferFeature = ({ featureType, value }: OfferFeatureProps) => (
  <li className={`offer__feature offer__feature--${featureType}`}>
    {typeof value === 'number' ? `${value} ${FEATURES[featureType as keyof typeof FEATURES]}${value > 1 && 's'}` : value}
  </li>
);

