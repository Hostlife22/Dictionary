import { useMemo } from 'react';

interface IUsePaginationProps {
  pageSize: number;
  total: number;
  currentPage: number;
  siblingCount?: number;
}

export const usePagination = ({
  pageSize,
  total,
  currentPage,
  siblingCount = 1,
}: IUsePaginationProps) => {
  const paginationRange = useMemo(() => {}, [pageSize, total, currentPage, siblingCount]);

  return paginationRange;
};
