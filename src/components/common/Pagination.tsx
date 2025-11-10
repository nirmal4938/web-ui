import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.CONTENT_BORDER || "#e5e7eb"};
  background: ${({ theme }) => theme.CONTENT_SURFACE || "#fff"};
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.CTA_COLOR || "#2563eb" : theme.CONTENT_BORDER || "#d1d5db"};
  background: ${({ active, theme }) =>
    active ? theme.CTA_COLOR || "#2563eb" : "transparent"};
  color: ${({ active, theme }) => (active ? "#fff" : theme.TEXT_PRIMARY || "#111827")};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.CTA_COLOR_HOVER || "#1d4ed8" : "#f3f4f6"};
  }
`;

const ArrowButton = styled(PageButton)`
  min-width: 2.25rem;
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesToShow = 3;
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <PaginationContainer>
      <ArrowButton onClick={handlePrev} disabled={currentPage === 1}>
        ←
      </ArrowButton>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        return (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        );
      })}
      <ArrowButton onClick={handleNext} disabled={currentPage === totalPages}>
        →
      </ArrowButton>
    </PaginationContainer>
  );
};

export default Pagination;
