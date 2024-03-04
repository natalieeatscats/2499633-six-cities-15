import { OfferData } from '../../mocks/offers';
import { Points, Point } from '../../types';
import Map from './MapFunc';
type TProps = {
  activeOffer: OfferData;
  activePoints: Points;
  selectedPoint: Point;
}

export const MapComponent = ({activeOffer, activePoints, selectedPoint}: TProps) => (
  <div className="cities__right-section cities__map" id='map'>
    {Map({city: activeOffer.city, points: activePoints, selectedPoint: selectedPoint})}
  </div>
);
