import React from "react";

import styles from "./Categories.module.scss";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
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
};

export default Categories;
