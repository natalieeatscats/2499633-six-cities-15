export const NearbyOffers = () => (
  <div className="container">
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      {/* TODO: replace with nearby offers from props */}
      <div className="near-places__list places__list">
        {[
          {
            name: 'Wood and stone place',
            type: 'Room',
            price: '€80',
            rating: '80%',
            image: 'img/room.jpg',
            isBookmarked: true,
          },
          {
            name: 'Canal View Prinsengracht',
            type: 'Apartment',
            price: '€132',
            rating: '80%',
            image: 'img/apartment-02.jpg',
            isBookmarked: false,
          },
          {
            name: 'Nice, cozy, warm big bed apartment',
            type: 'Apartment',
            price: '€180',
            rating: '100%',
            image: 'img/apartment-03.jpg',
            isBookmarked: false,
            isPremium: true,
          },
        ].map(({
          name, type, price, rating, image, isBookmarked, isPremium,
        }) => (
          <article
            key={name}
            className={`near-places__card place-card${isPremium && ' place-card--premium'}`}
          >
            {isPremium && (
              <div className="place-card__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="near-places__image-wrapper place-card__image-wrapper">
              <a href="#">
                <img
                  className="place-card__image"
                  src={image}
                  width={260}
                  height={200}
                  alt="Place image"
                />
              </a>
            </div>
            <div className="place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">{price}</b>
                  <span className="place-card__price-text">/&nbsp;night</span>
                </div>
                <button
                  type="button"
                  className={`place-card__bookmark-button${isBookmarked && ' place-card__bookmark-button--active'} button`}
                >
                  <svg
                    className="place-card__bookmark-icon"
                    width={18}
                    height={19}
                  >
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {isBookmarked ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="place-card__rating rating">
                <div className="place-card__stars rating__stars">
                  <span style={{ width: rating }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <h2 className="place-card__name">
                <a href="#">{name}</a>
              </h2>
              <p className="place-card__type">{type}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  </div>
);

