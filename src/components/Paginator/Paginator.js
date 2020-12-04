import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const Paginator = ({ current, changePageCallback, hasPrev, hasNext, hide, searching, sorting }) => {
  const [currentPage, setCurrentPage] = useState(current);

  useEffect(() => {
    if (sorting || searching) {
      setCurrentPage(1);
    }
  }, [sorting, searching]);

  const toNextPage = () => {
    setCurrentPage(currentPage + 1);
    changePageCallback(currentPage + 1);
  };

  const toPrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    changePageCallback(currentPage - 1);
  };

  return (
    !hide && (
      <Pagination className="paginator">
        <Pagination.Prev disabled={!hasPrev} style={{ width: "75px" }} onClick={toPrevPage} />
        <Pagination.Ellipsis disabled={!hasPrev} />
        <Pagination.Item>{currentPage}</Pagination.Item>
        <Pagination.Ellipsis disabled={!hasNext} />
        <Pagination.Next disabled={!hasNext} style={{ width: "75px" }} onClick={toNextPage} />
      </Pagination>
    )
  );
};

export default Paginator;
