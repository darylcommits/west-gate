import React, { useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const SIBLING_COUNT = 1;
const DOTS = '...';

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
}

function usePaginationRange({ currentPage, totalPages, siblingCount = SIBLING_COUNT }) {
  return useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + 2 dots + current

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftCount = 3 + 2 * siblingCount;
      return [...range(1, leftCount), DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightCount = 3 + 2 * siblingCount;
      return [1, DOTS, ...range(totalPages - rightCount + 1, totalPages)];
    }

    return [1, DOTS, ...range(leftSiblingIndex, rightSiblingIndex), DOTS, totalPages];
  }, [currentPage, totalPages, siblingCount]);
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  showTotalCount = true,
  className = '',
  siblingCount = SIBLING_COUNT,
}) => {
  const pages = usePaginationRange({ currentPage, totalPages, siblingCount });

  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Count display */}
      {showTotalCount && (
        <p className="text-sm text-gray-500 order-2 sm:order-1">
          Showing{' '}
          <span className="font-semibold text-[#1C2B4A]">{startItem}</span>
          {' – '}
          <span className="font-semibold text-[#1C2B4A]">{endItem}</span>
          {' of '}
          <span className="font-semibold text-[#1C2B4A]">{totalItems}</span>
          {' results'}
        </p>
      )}

      {/* Pages */}
      <nav
        className="flex items-center gap-1 order-1 sm:order-2"
        aria-label="Pagination"
      >
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-[#1C2B4A] hover:text-white hover:border-[#1C2B4A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>

        {pages.map((page, idx) =>
          page === DOTS ? (
            <span
              key={`dots-${idx}`}
              className="px-2 py-1 text-gray-400 select-none"
            >
              ···
            </span>
          ) : (
            <motion.button
              key={page}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-[#1C2B4A] text-white border border-[#1C2B4A] shadow'
                  : 'border border-gray-200 text-gray-600 hover:bg-[#EDE8E1] hover:border-gray-300'
              }`}
            >
              {page}
            </motion.button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-[#1C2B4A] hover:text-white hover:border-[#1C2B4A] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
