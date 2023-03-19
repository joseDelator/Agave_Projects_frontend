import classnames from "classnames";
import { useMemo } from "react";
import { usePagination, DOTS } from "../hooks/usePagination";

const Pagination = props => {
    const {
      onPageChange,
      totalCount,
      siblingCount = 2,
      currentPage,
      pageSize,
    } = props;
  
    const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize
    });
  
    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }
  
    const onNext = () => {
      onPageChange(currentPage + 1);
    };
  
    const onPrevious = () => {
      onPageChange(currentPage - 1);
    };
  
    let lastPage = paginationRange[paginationRange.length - 1];
    return (
      <ul
        className="btn-group m-2 justif"
      >
         {/* Left navigation arrow */}
        <li className={currentPage === 1?"btn btn-disabled btn-xs":"btn btn-xs"}
          onClick={onPrevious}
        >
          «
        </li>
        {paginationRange.map(pageNumber => {
           
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className="btn btn-disabled btn-xs">&#8230;</li>;
          }
          
          // Render our Page Pills
          return (
            <li
              className={pageNumber === currentPage?'btn btn-primary btn-xs':'btn btn-xs'}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          className={currentPage === lastPage? " btn btn-xs btn-disabled":"btn btn-xs"}
          onClick={onNext}
        >
          »
        </li>
      </ul>
    );
  };
  
  export default Pagination;