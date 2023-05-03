import React from "react";

import { useSelector, useDispatch } from "react-redux";

import styles from "./Categories.module.scss";

function Categories({ value, onChangeCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((type, i) => {
          return (
            <li
              onClick={() => onChangeCategory(i)}
              key={`${type}_${i}`}
              className={value === i ? `${styles.active}` : ""}
            >
              {type}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
