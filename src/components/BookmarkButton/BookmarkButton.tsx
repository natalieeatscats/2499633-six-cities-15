type BookmarkButtonProps = {
  type: 'offer' | 'place';
  isBookmarked: boolean;
}

export const BookmarkButton = ({ type, isBookmarked }: BookmarkButtonProps) => {

  const mapBookmarkType = {
    offer: {
      className: 'offer__bookmark-button',
      classNameIcon: 'offer__bookmark-icon',
      width: 31,
      height: 33,
    },
    place: {
      className: 'place-card__bookmark-button',
      classNameIcon: 'place-card__bookmark-icon',
      width: 18,
      height: 19,
    }
  };


  return (
    <button className={`${mapBookmarkType[type].className} button ${isBookmarked && `${mapBookmarkType[type].className}--active`}`} type="button">
      <svg className={mapBookmarkType[type].classNameIcon} width={mapBookmarkType[type].width} height={mapBookmarkType[type].height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};
