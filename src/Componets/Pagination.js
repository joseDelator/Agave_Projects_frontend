
import { usePagination, DOTS } from "../hooks/usePagination";

const Pagination = props => {
    const {
      onPageChange,
      totalCount,
      siblingCount = 1,
      currentPage,
      pageSize,
    } = props;
  
    const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize
    });
    const buttonsyltin = " btn btn-outline btn-xs  sm:btn-sm md:btn-md  "
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
        className="btn-group w-full justify-center m-2"
      >
         {/* Left navigation arrow */}
        <li className={ currentPage === 1?`${buttonsyltin} btn-disabled `:`${buttonsyltin} btn-primary`}
          onClick={onPrevious}
        >
          «
        </li>
        {paginationRange.map(pageNumber => {
           
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li  className={`${buttonsyltin} btn-disabled`}>&#8230;</li>;
          }
          
          // Render our Page Pills
          return (
            <li key={pageNumber}
              className={pageNumber === currentPage?`${buttonsyltin} btn-active`:`${buttonsyltin} btn-primary`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li 
          className={currentPage === lastPage? `${buttonsyltin} btn-disabled`:`${buttonsyltin} btn-primary`}
          onClick={onNext}
        >
          »
        </li>
      </ul>
    );
  };
  
  export default Pagination;