import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../../redux/slices/filterSlice";

import styles from "./Sort.module.scss";
import { RootState } from "../../redux/store";

type SortItem = {
  name: string;
  sortProperty: string;
};

export const popupList: SortItem[] = [
  { name: "популярности (низ)", sortProperty: "rating" },
  { name: "популярности (выс)", sortProperty: "-rating" },
  { name: "цене (низ)", sortProperty: "price" },
  { name: "цене (выс)", sortProperty: "-price" },
  { name: "алфавиту (низ)", sortProperty: "title" },
  { name: "алфавиту (выс)", sortProperty: "-title" },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);

  const [isPopup, setIsPopup] = React.useState<boolean>(false);
  const popup = React.useRef<HTMLDivElement>(null);

  function onChangeSort(obj: SortItem) {
    setIsPopup(false);
    dispatch(setSort(obj));
  }

  React.useEffect(() => {
    const handleClick = (event: any) => {
      const path = event.composedPath();
      if (!path.includes(popup.current)) {
        setIsPopup(false);
      }
    };
    document.body.addEventListener("click", handleClick);

    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={popup} className={styles.sort}>
      <div className={styles.label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsPopup(!isPopup)}>{sort.name}</span>
      </div>
      {isPopup && (
        <div className={styles.popup}>
          <ul>
            {popupList.map((obj, i) => {
              return (
                <li
                  key={`${obj.name}_${i}`}
                  onClick={() => onChangeSort(obj)}
                  className={
                    sort.sortProperty === obj.sortProperty
                      ? `${styles.active}`
                      : ""
                  }
                >
                  {obj.name};
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
