import React from "react";

import styles from "./SearchPanel.module.scss";

import search from "../../assets/img/search-icon.svg";

function SearchPanel() {
  return (
    <div className={styles.root}>
      <img className={styles.search} src={search} alt="search-icon" />
      <input
        className={styles.input}
        type="text"
        placeholder="Введите что-нибудь"
      />
    </div>
  );
}

export default SearchPanel;
