import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, selectCart } from "../../redux/slices/cartSlice";

import { Link } from "react-router-dom";

import styles from "./PizzaBlock.module.scss";

function PizzaBlock({ id, imageUrl, title, types, sizes, price }) {
  const dispath = useDispatch();
  const { items } = useSelector(selectCart);

  const [typeIndex, setTypeIndex] = React.useState(0);
  const [sizeIndex, setSizeIndex] = React.useState(0);

  const typeNames = ["тонкое", "традиционное"];

  const currectCount = items.find((item) => item.id === id);

  const onAddItem = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      types: typeNames[typeIndex],
      sizes: sizes[sizeIndex],
    };
    dispath(addItem(item));
  };

  return (
    <div className={styles.pizza}>
      <Link to={`/pizza/${id}`}>
        <img className={styles.image} src={imageUrl} alt="Pizza" />
        <h4 className={styles.title}>{title}</h4>
      </Link>
      <div className={styles.selector}>
        <ul>
          {types.map((el, i) => {
            return (
              <li
                key={`${el}_${i}`}
                onClick={() => setTypeIndex(i)}
                className={typeIndex === i ? `${styles.active}` : ""}
              >
                {typeNames[i]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((el, i) => {
            return (
              <li
                key={`${el}_${i}`}
                onClick={() => setSizeIndex(i)}
                className={sizeIndex === i ? `${styles.active}` : ""}
              >
                {el}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>от {price} ₽</div>
        <button
          onClick={onAddItem}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {currectCount && <i>{currectCount.count}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
