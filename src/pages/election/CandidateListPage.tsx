import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "@/components/atoms/Button/Button";
import { PageWrapper, TitleBar, Title, ToolbarActions } from "@components/layout";
import ActionsMenu from "@/components/common/ActionsMenu";
import Pagination from "@/components/common/Pagination";
import AddCandidateModal from "./AddCandidateModal"; // we'll create this

/* ----------------------------- Styled Components ----------------------------- */
const TableWrapper = styled.section`
  margin: 2rem;
  background: #fff;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  height: 80vh;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
`;

const Th = styled.th<{ sortable?: boolean }>`
  text-align: left;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
`;

const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  &:hover {
    background: #f9fafb;
  }
`;

const Td = styled.td`
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  vertical-align: middle;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #9ca3af;
`;

const Select = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  background: #fff;
  font-size: 0.875rem;
  color: #374151;
`;

const TableFooter = styled.div`
  padding: 0.75rem 1.25rem;
  border-top: 1px solid #e5e7eb;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* ----------------------------- Component ----------------------------- */
const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_PROD_URL}/candidates`);
      setCandidates(res.data.candidates || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField];
    const valueB = b[sortField];
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }
    return sortDirection === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const totalPages = Math.ceil(sortedCandidates.length / rowsPerPage);
  const paginatedCandidates = sortedCandidates.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <PageWrapper>
      <TitleBar>
        <Title>🏅 Candidate List</Title>
        <ToolbarActions>
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            + Add Candidate
          </Button>
        </ToolbarActions>
      </TitleBar>

      <TableWrapper>
        {loading ? (
          <EmptyState>Loading candidates...</EmptyState>
        ) : candidates.length === 0 ? (
          <EmptyState>No candidates found.</EmptyState>
        ) : (
          <>
            <ScrollContainer>
              <Table>
                <Thead>
                  <tr>
                    <Th sortable onClick={() => handleSort("fullName")}>
                      Name
                    </Th>
                    <Th>Gender</Th>
                    <Th>Age</Th>
                    <Th sortable onClick={() => handleSort("partyName")}>
                      Party
                    </Th>
                    <Th>Constituency</Th>
                    <Th>Votes</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </tr>
                </Thead>
                <tbody>
                  {paginatedCandidates.map((c) => (
                    <Tr key={c.id}>
                      <Td>{c.fullName}</Td>
                      <Td>{c.gender}</Td>
                      <Td>{c.age}</Td>
                      <Td>{c.partyName}</Td>
                      <Td>{c.constituency}</Td>
                      <Td>{c.totalVotes}</Td>
                      <Td>{c.status}</Td>
                      <Td>
                        <Button variant="outline">⋮</Button>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </ScrollContainer>

            <TableFooter>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <Select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[5, 10, 25].map((n) => (
                  <option key={n} value={n}>
                    {n} / page
                  </option>
                ))}
              </Select>
            </TableFooter>
          </>
        )}
      </TableWrapper>

      {modalOpen && (
        <AddCandidateModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchCandidates(); // refresh list after add
          }}
        />
      )}
    </PageWrapper>
  );
};

export default CandidatesPage;
