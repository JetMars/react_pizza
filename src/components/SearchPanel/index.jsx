import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setInputSearch } from "../../redux/slices/filterSlice";

import debounce from "lodash";

import styles from "./SearchPanel.module.scss";

import searchIcon from "../../assets/img/search-icon.svg";
import closeIcon from "../../assets/img/closeIcon.svg";

function SearchPanel() {
  const dispatch = useDispatch();
  const inputSearch = useSelector((state) => state.filter.inputSearch);

  const inputRef = React.useRef("");

  const changeSearchInput = (e) => {
    dispatch(setInputSearch(""));
    inputRef.current.focus();
  };

  console.log(debounce);

  return (
    <div className={styles.root}>
      <img className={styles.searchIcon} src={searchIcon} alt="search-icon" />
      <input
        ref={inputRef}
        value={inputSearch}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы....."
        onChange={(event) => dispatch(setInputSearch(event.target.value))}
      />
      {inputSearch && (
        <img
          onClick={() => changeSearchInput()}
          className={styles.closeIcon}
          src={closeIcon}
          alt="search-icon"
        />
      )}
    </div>
  );
}

export default SearchPanel;
