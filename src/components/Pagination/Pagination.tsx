import cn from 'classnames';
import { DOTS } from '../../common';
import { usePagination } from '../../hooks/usePagination';
import { IPaginationProps } from './Pagination.interface';
import styles from './Pagination.module.scss';

function Pagination({
  onPageChange,
  pageSize,
  currentPage,
  total,
  className,
  siblingCount = 1,
}: IPaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    total,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={cn(styles.paginationContainer, className)}>
      <li
        className={cn(styles.paginationItem, {
          [styles.disabled]: currentPage === 1,
        })}
        onClick={onPrevious}>
        <div className={cn(styles.arrow, styles.left)} />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS || typeof pageNumber === 'string') {
          return <li className={cn(styles.paginationItem, styles.dots)}>&#8230;</li>;
        }

        return (
          <li
            className={cn(styles.paginationItem, {
              [styles.selected]: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cn(styles.paginationItem, {
          [styles.disabled]: currentPage === lastPage,
        })}
        onClick={onNext}>
        <div className={cn(styles.arrow, styles.right)} />
      </li>
    </ul>
  );
}

export default Pagination;
