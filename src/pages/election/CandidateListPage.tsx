import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button/Button";
import { PageWrapper, TitleBar, Title, ToolbarActions } from "@components/layout";
import AddCandidateModal from "./AddCandidateModal";

/* -------------------- Styled Components -------------------- */
const TableWrapper = styled.section`
  margin: 0rem;
  background: #fff;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  height: 80vh;
`;

const ScrollContainer = styled(motion.div)`
  flex: 1 1 auto;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  min-width: 900px;
  width: 100%; /* ensures table only takes required width */
  table-layout: fixed;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  z-index: 1;
`;

const Th = styled.th<{ sortable?: boolean }>`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
  white-space: nowrap;
`;

const Tr = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  height: 2.5rem; /* fixed row height */
  &:hover {
    background: #f9fafb;
  }
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #9ca3af;
`;

const TableFooter = styled.div`
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
`;

const Select = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  background: #fff;
  font-size: 0.875rem;
  color: #374151;
`;

/* -------------------- Mobile Card -------------------- */
const MobileCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
`;

const MobileField = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;

  span:first-child {
    font-weight: 600;
    color: #374151;
  }
`;

/* -------------------- Component -------------------- */
const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [modalOpen, setModalOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

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
      setSortDirection(d => (d === "asc" ? "desc" : "asc"));
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
        ) : isMobile ? (
          paginatedCandidates.map(c => (
            <MobileCard
              key={c.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
            >
              <MobileField><span>Name:</span><span>{c.fullName}</span></MobileField>
              <MobileField><span>Gender:</span><span>{c.gender}</span></MobileField>
              <MobileField><span>Age:</span><span>{c.age}</span></MobileField>
              <MobileField><span>Party:</span><span>{c.partyName}</span></MobileField>
              <MobileField><span>Constituency:</span><span>{c.constituency}</span></MobileField>
              <MobileField><span>Votes:</span><span>{c.totalVotes}</span></MobileField>
              <MobileField><span>Status:</span><span>{c.status}</span></MobileField>
              <Button variant="outline" style={{ alignSelf: "flex-end" }}>Actions</Button>
            </MobileCard>
          ))
        ) : (
          <ScrollContainer
            ref={scrollRef}
            drag={isTablet ? "x" : false}
            dragConstraints={{
              left: -(scrollRef.current?.scrollWidth || 0) + window.innerWidth,
              right: 0
            }}
            whileTap={{ cursor: "grabbing" }}
          >
            <Table>
              <Thead>
                <tr>
                  <Th sortable onClick={() => handleSort("fullName")}>Name</Th>
                  <Th>Gender</Th>
                  <Th>Age</Th>
                  <Th sortable onClick={() => handleSort("partyName")}>Party</Th>
                  <Th>Constituency</Th>
                  <Th>Votes</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </Thead>
              <tbody>
                {paginatedCandidates.map(c => (
                  <Tr key={c.id}>
                    <Td>{c.fullName}</Td>
                    <Td>{c.gender}</Td>
                    <Td>{c.age}</Td>
                    <Td>{c.partyName}</Td>
                    <Td>{c.constituency}</Td>
                    <Td>{c.totalVotes}</Td>
                    <Td>{c.status}</Td>
                    <Td><Button variant="outline">⋮</Button></Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </ScrollContainer>
        )}

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
            {[5, 10, 25].map(n => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </Select>
        </TableFooter>
      </TableWrapper>

      {modalOpen && (
        <AddCandidateModal
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            setModalOpen(false);
            fetchCandidates();
          }}
        />
      )}
    </PageWrapper>
  );
};

export default CandidatesPage;
