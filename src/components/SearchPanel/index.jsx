import React from "react";

import styles from "./SearchPanel.module.scss";

import { SearchContext } from "../../App";

import searchIcon from "../../assets/img/search-icon.svg";
import closeIcon from "../../assets/img/closeIcon.svg";

function SearchPanel() {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

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
      {searchValue && (
        <img
          onClick={() => setSearchValue("")}
          className={styles.closeIcon}
          src={closeIcon}
          alt="search-icon"
        />
      )}
    </div>
  );
}

export default SearchPanel;
