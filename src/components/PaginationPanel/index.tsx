import React from "react";
import ReactPaginate from "react-paginate";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

import styles from "./PaginationPanel.module.scss";
import { RootState } from "../../redux/store";

const PaginationPanel: React.FC = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.filter.currentPage);
  const onChangePage = (event: { selected: number }) => {
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
};

export default PaginationPanel;
