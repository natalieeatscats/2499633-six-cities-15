import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Dispatch, State } from './types';
import { axiosInst } from './api';
import { Action, Store, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reduceReducers from 'reduce-reducers';
import { offersReducer, activeOfferReducer, apiReducer } from './store/reducer';
import { api } from './store';

export const createMockStore = configureMockStore();


type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

type ComponentWithStore = {
  withStoreComponent: JSX.Element;
  store: Store;
  mockAxiosAdapter: MockAdapter;
}


export function withMockStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = axiosInst;
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, Dispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
export function withStore(
  component: JSX.Element,
): ComponentWithStore {
  const axios = axiosInst;
  const mockAxiosAdapter = new MockAdapter(axios);
  const store = configureStore({
    reducer: reduceReducers(offersReducer, activeOfferReducer, apiReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });

  return ({
    withStoreComponent: <Provider store={store}>{component}</Provider>,
    store,
    mockAxiosAdapter,
  });
}
export const withRouter = (component: JSX.Element) => (
  <BrowserRouter>
    {component}
  </BrowserRouter>
);
