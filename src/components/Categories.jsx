import React from "react";

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
    <div className="categories">
      <ul>
        {categories.map((type, i) => {
          return (
            <li
              onClick={() => setActiveType(i)}
              key={`${type}_${i}`}
              className={activeType === i ? "active" : ""}
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
