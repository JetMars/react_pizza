import React from "react";
import ReactPaginate from "react-paginate";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

import styles from "./PaginationPanel.module.scss";

function PaginationPanel() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.filter.currentPage);
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
      forcePage={page - 1}
    />
  );
}

export default PaginationPanel;
