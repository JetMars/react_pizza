import React from "react";

import styles from "./SearchPanel.module.scss";

import searchIcon from "../../assets/img/search-icon.svg";
import closeIcon from "../../assets/img/closeIcon.svg";

function SearchPanel({ searchValue, setSearchValue }) {
  return (
    <div className={styles.root}>
      <img className={styles.searchIcon} src={searchIcon} alt="search-icon" />
      <input
        value={searchValue}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы....."
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <img
        onClick={() => setSearchValue("")}
        className={styles.closeIcon}
        src={closeIcon}
        alt="search-icon"
      />
    </div>
  );
}

export default SearchPanel;
