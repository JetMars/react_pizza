import React from "react";

import { useDispatch } from "react-redux";
import { setInputSearch } from "../../redux/slices/filterSlice";

import debounce from "lodash.debounce";

import styles from "./SearchPanel.module.scss";

import searchIcon from "../../assets/img/search-icon.svg";
import closeIcon from "../../assets/img/closeIcon.svg";

const SearchPanel: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const changeSearchInput = () => {
    dispatch(setInputSearch(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateChangeInput = React.useCallback(
    debounce((value: string) => {
      dispatch(setInputSearch(value));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateChangeInput(event.target.value);
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
};

export default SearchPanel;
