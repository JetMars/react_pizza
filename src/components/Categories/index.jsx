import React from "react";

import style from "./Categories.module.scss";

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
    <div className={style.categories}>
      <ul>
        {categories.map((type, i) => {
          return (
            <li
              onClick={() => onChangeCategory(i)}
              key={`${type}_${i}`}
              className={value === i ? `${style.active}` : ""}
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
