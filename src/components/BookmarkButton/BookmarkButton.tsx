export const BookmarkButton = () => (
  <button className="offer__bookmark-button button" type="button">
    <svg className="offer__bookmark-icon" width={31} height={33}>
      <use xlinkHref="#icon-bookmark" />
    </svg>
    <span className="visually-hidden">To bookmarks</span>
  </button>
);
