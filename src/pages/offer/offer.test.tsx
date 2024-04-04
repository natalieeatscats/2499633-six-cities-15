import { describe } from 'vitest';
import { withRouter, withStore } from '../../util';
import { Offer } from './offer';
import { Params } from 'react-router-dom';
import { mockResponse } from '../../mock';
import { act, render, screen, waitFor } from '@testing-library/react';

describe('Component: Offer', () => {
  const prepared = withStore(withRouter(<Offer />));
  let { withStoreComponent, store, mockAxiosAdapter } = prepared;


  vi.mock('react-router-dom', async () => {
    const actual: typeof import('react-router-dom') = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useParams: (): Readonly<Params<string>> => ({ id: mockResponse.offer.id }),
    };
  });

  afterEach(() => {
    ({ withStoreComponent, store, mockAxiosAdapter } = prepared);
  });

  mockAxiosAdapter.onGet(`/offers/${mockResponse.offer.id}`).reply(200, mockResponse.offer);
  mockAxiosAdapter.onGet(`/comments/${mockResponse.offer.id}`).reply(200, mockResponse.reviews);
  mockAxiosAdapter.onGet(`/offers/${mockResponse.offer.id}/nearby`).reply(200, mockResponse.nearby);

  // it('should dispatch correctly', async() => {

  //   const expectedActions = [
  //     { payload: mockResponse.offer, type: 'activeOffer/setActiveOffer' },
  //     { payload: mockResponse.reviews, type: 'activeOffer/setReviews' },
  //     { payload: mockResponse.nearby, type: 'activeOffer/setNearbyOffers' },
  //   ];

  //   // eslint-disable-next-line @typescript-eslint/await-thenable
  //   await render(withStoreComponent);
  //   // eslint-disable-next-line @typescript-eslint/await-thenable
  //   const actions = await mockStore.getActions();

  //   expectedActions.forEach((action) => {
  //     expect(actions).toContainEqual(action);
  //   });

  // });

  //it should render correctly
  it('should render correctly', async () => {
    const { title: offerTitle, description: offerDescription, price: offerPrice, isFavorite: offerIsFavorite, isPremium: offerIsPremium, rating: offerRating, images: offerImages, maxAdults, type: offerType, goods } = mockResponse.offer;
    const { name: hostName, avatarUrl: hostAvatar, isPro: hostIsPro } = mockResponse.offer.host;
    const ignoreCase = (str: string) => new RegExp(str, 'i');
    mockAxiosAdapter.onGet(`/offers/${mockResponse.offer.id}`).reply(200, mockResponse.offer);
    mockAxiosAdapter.onGet(`/comments/${mockResponse.offer.id}`).reply(200, mockResponse.reviews);
    mockAxiosAdapter.onGet(`/offers/${mockResponse.offer.id}/nearby`).reply(200, mockResponse.nearby);

    // eslint-disable-next-line @typescript-eslint/await-thenable
    let expectedDescription = {};
    let expectedPrice = {};
    let expectedHostName = {};

    act(() => {
      render(withStoreComponent);
    });
    expectedDescription = screen.getByText(offerDescription);
    expectedPrice = screen.getByText(offerPrice);
    expectedHostName = screen.getByText(hostName);
    console.log(expectedDescription);

    expect(expectedDescription).toBeInTheDocument();
    expect(expectedPrice).toBeInTheDocument();
    expect(expectedHostName).toBeInTheDocument();
  });

  // - it should display offer info
  // - it should display reviews
  // - it should display review form if isAuth === true
  // - it should not display review form if isAuth === false
  // - it should display map
  // - it should display nearby offers


});
