import React from "react";

import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <span>😕</span>
      <h2>Нет такой страницы</h2>
    </div>
  );
}

export default NotFoundBlock;
