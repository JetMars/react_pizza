import React from "react";

import styles from "./NotFoundPizza.module.scss";

const NotFoundPizza: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h2>Ошибка поиска</h2>
      <p className={styles.text}>Попробуйте зайти позже</p>
    </div>
  );
};

export default NotFoundPizza;
