type OfferFeatureProps = {
  featureType: string;
  value: number | string;
};

export const OfferFeature = ({ featureType, value }: OfferFeatureProps) => (
  <li className={`offer__feature offer__feature--${featureType}`}>
    {typeof value === 'number' ? `${value}${value > 1 ? 's' : ''}` : value}
  </li>
);

