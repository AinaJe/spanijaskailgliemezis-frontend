// src/hooks/usePagination.js
import { useState, useMemo, useCallback } from 'react';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100, Infinity];

export const usePagination = (data) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[2]);

  const paginatedData = useMemo(() => {
    if (itemsPerPage === Infinity) return data;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const paginationProps = useMemo(() => ({
    totalItems: data.length,
    itemsPerPage,
    currentPage,
    onPageChange: setCurrentPage,
    onItemsPerPageChange: setItemsPerPage,
    itemsPerPageOptions: ITEMS_PER_PAGE_OPTIONS,
  }), [data.length, itemsPerPage, currentPage]);

  return {
    paginatedData,
    paginationProps,
    resetPagination,
  };
};