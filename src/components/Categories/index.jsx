import React from "react";

import style from "./Categories.module.scss";

function Categories() {
  const [activeType, setActiveType] = React.useState(0);

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
              onClick={() => setActiveType(i)}
              key={`${type}_${i}`}
              className={activeType === i ? `${style.active}` : ""}
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
