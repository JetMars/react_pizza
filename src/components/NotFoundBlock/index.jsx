import React from "react";

import style from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
  return (
    <div className={style.root}>
      <span>😕</span>
      <h2>Нет такой страницы</h2>
    </div>
  );
}

export default NotFoundBlock;
