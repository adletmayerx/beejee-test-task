import React from "react";
import "./Pagination.css";

const Pagination = ({ pages, setPage }) => {
  const handleClick = (e, value) => setPage(value);
  return (
    <div className="pag">
      <ul className="pag__list">
        {pages.map((page) => {
          return (
            <li
              className="pag__list-item"
              key={page}
              data-value={page}
              onClick={(event) => {
                handleClick(event, page);
              }}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
