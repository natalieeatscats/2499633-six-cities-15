import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App/App';
import OFFERS from './mocks/offers';
import { REVIEWS } from './mocks/reviews';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { cityReducer } from './reducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: cityReducer,
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={REVIEWS} offers = {OFFERS}/>
    </Provider>
  </React.StrictMode>
);
