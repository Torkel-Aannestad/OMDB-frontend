"use client";

import { usePagination } from "@/hooks/usePagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ListPaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function ListPagination({
  currentPage,
  totalPages,
}: ListPaginationProps) {
  const { numbers, prevLink, nextLink, pageLink } = usePagination({
    currentPage,
    totalPages: totalPages > 500 ? 500 : totalPages,
  });

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious className="hidden md:flex" href={prevLink} />
          </PaginationItem>
        )}

        {totalPages > 1 &&
          numbers.map((number, idx) =>
            number === "ellipsis" ? (
              <PaginationItem key={number + idx}>
                <PaginationEllipsis className="hidden md:flex" />
              </PaginationItem>
            ) : (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={number === currentPage}
                  href={pageLink(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            )
          )}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext className="hidden md:flex" href={nextLink} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
