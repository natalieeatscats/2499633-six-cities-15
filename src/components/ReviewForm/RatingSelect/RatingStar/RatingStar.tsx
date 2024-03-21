type props = {
  value: number;
  onChange: (value: number) => void;
  isChecked: boolean;
}


export const RatingStar = ({ value, onChange, isChecked}: props) => {
  const ratingText = `${value}-stars`;

  return(
    <>
      <input
        onChange={() => (onChange(value))}
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={value}
        id={ratingText}
        type="radio"
        checked={isChecked}
      />
      <label
        htmlFor={ratingText}
        className="reviews__rating-label form__rating-label"
        title="perfect"
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
};
