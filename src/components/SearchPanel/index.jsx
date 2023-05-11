import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { setInputSearch } from "../../redux/slices/filterSlice";

import debounce from "lodash.debounce";

import styles from "./SearchPanel.module.scss";

import searchIcon from "../../assets/img/search-icon.svg";
import closeIcon from "../../assets/img/closeIcon.svg";

function SearchPanel() {
  const dispatch = useDispatch();
  const { inputSearch } = useSelector((state) => state.filter);
  console.log(inputSearch);

  const [value, setValue] = React.useState("");
  const inputRef = React.useRef("");

  const changeSearchInput = () => {
    dispatch(setInputSearch(""));
    setValue("");
    inputRef.current.focus();
  };

  const updateChangeInput = React.useCallback(
    debounce((value) => {
      dispatch(setInputSearch(value));
    }, 350),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateChangeInput(value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.searchIcon} src={searchIcon} alt="search-icon" />
      <input
        ref={inputRef}
        value={value}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы....."
        onChange={(event) => onChangeInput(event)}
      />
      {value && (
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
