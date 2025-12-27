"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type AppPaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const AppPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: AppPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);

  return (
    <div className="flex justify-center pt-6">
      <Pagination>
        <PaginationContent>

          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-40"
                  : ""
              }
            />
          </PaginationItem>

          {/* First page */}
          {startPage > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Ellipsis before */}
          {startPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Middle pages (max 3) */}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis after */}
          {endPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Last page */}
          {endPage < totalPages && (
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-40"
                  : ""
              }
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AppPagination;
