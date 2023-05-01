import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./PaginationPanel.module.scss";

function PaginationPanel({ onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={2}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default PaginationPanel;
