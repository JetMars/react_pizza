import React from "react";
import ReactPaginate from "react-paginate";

import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

import styles from "./PaginationPanel.module.scss";

function PaginationPanel() {
  const dispatch = useDispatch();
  const onChangePage = (event) => {
    dispatch(setCurrentPage(event.selected + 1));
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event)}
      pageRangeDisplayed={4}
      pageCount={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default PaginationPanel;
