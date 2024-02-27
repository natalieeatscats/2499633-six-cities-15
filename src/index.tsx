import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import OFFERS from './mocks/offers';
import { REVIEWS } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App reviews={REVIEWS} offers = {OFFERS}/>
  </React.StrictMode>
);
