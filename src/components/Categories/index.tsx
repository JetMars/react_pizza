import React from "react";

import styles from "./Categories.module.scss";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    console.log("first");
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
);

export default Categories;
