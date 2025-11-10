import ActionsMenu from "@/components/common/ActionsMenu";
import Pagination from "@/components/common/Pagination";
// import { FilterBar } from "@/components/organisms/FilterBar/FilterBar";
import FilterBar from "@/components/organisms/FilterBar/FilterBar";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

/* -----------------------------
   ⚙️ Mocked Player Data
------------------------------ */
const mockPlayers = [
  {
    id: 1,
    name: "Virat Kohli",
    avatar: "https://i.pravatar.cc/40?u=virat",
    role: "Batsman",
    team: "RCB",
    runs: 12000,
    matches: 265,
    lastMatch: "2025-11-01",
  },
  {
    id: 2,
    name: "Rohit Sharma",
    avatar: "https://i.pravatar.cc/40?u=rohit",
    role: "Batsman",
    team: "MI",
    runs: 9800,
    matches: 245,
    lastMatch: "2025-10-28",
  },
  {
    id: 3,
    name: "Jasprit Bumrah",
    avatar: "https://i.pravatar.cc/40?u=bumrah",
    role: "Bowler",
    team: "MI",
    runs: 520,
    matches: 180,
    lastMatch: "2025-10-25",
  },
  // add more mock data to visualize pagination
];

/* -----------------------------
   ⚙️ Styled Components
------------------------------ */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.CONTENT_BG || "#f9fafb"};
`;

const TitleBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background: ${({ theme }) => theme.CONTENT_SURFACE || "#fff"};
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER || "#e5e7eb"};
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.TEXT_PRIMARY || "#111827"};
`;

const ToolbarActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button<{ variant?: "primary" | "outline" }>`
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;

  ${({ variant, theme }) =>
    variant === "primary"
      ? `
    background: ${theme.CTA_COLOR || "#2563eb"};
    color: #fff;
    &:hover { background: ${theme.CTA_COLOR_HOVER || "#1d4ed8"}; }
  `
      : `
    background: transparent;
    border: 1px solid ${theme.CONTENT_BORDER || "#d1d5db"};
    color: ${theme.TEXT_PRIMARY || "#374151"};
    &:hover { background: #f3f4f6; }
  `}
`;

const TableWrapper = styled.section`
  margin: 2rem;
  background: #fff;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  height: 80vh; /* CRM-style height */
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #d1d5db transparent;

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
  min-width: 700px;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.CONTENT_SURFACE || "#fff"};
  z-index: 5;
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER || "#e5e7eb"};
`;

const Th = styled.th<{ sortable?: boolean }>`
  text-align: left;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.TEXT_MUTED || "#4b5563"};
  cursor: ${({ sortable }) => (sortable ? "pointer" : "default")};
  user-select: none;

  &:hover {
    color: ${({ sortable, theme }) =>
      sortable ? theme.TEXT_PRIMARY || "#111827" : undefined};
  }
`;

const SortIcon = styled.span<{ direction?: "asc" | "desc" }>`
  font-size: 0.7rem;
  margin-left: 4px;
  opacity: 0.7;
  ${({ direction }) =>
    direction === "desc" && "transform: rotate(180deg); display: inline-block;"}
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER || "#e5e7eb"};
  &:hover {
    background: #f9fafb;
  }
`;

const Td = styled.td`
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.TEXT_PRIMARY || "#111827"};
  vertical-align: middle;
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const ActionsMenuButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.TEXT_MUTED || "#9ca3af"};
  &:hover {
    color: ${({ theme }) => theme.TEXT_PRIMARY || "#111827"};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: ${({ theme }) => theme.TEXT_MUTED || "#9ca3af"};
`;

const TableFooter = styled.div`
  padding: 0.75rem 1.25rem;
  border-top: 1px solid ${({ theme }) => theme.CONTENT_BORDER || "#e5e7eb"};
  background: ${({ theme }) => theme.CONTENT_SURFACE || "#fff"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterInfo = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.TEXT_MUTED || "#6b7280"};
`;

const Select = styled.select`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  background: #fff;
  font-size: 0.875rem;
  color: #374151;
`;

/* -----------------------------
   ⚙️ Component Logic
------------------------------ */

const DEFAULT_ROWS_PER_PAGE = 5;

const PlayersTablePage: React.FC = () => {
  const [players, setPlayers] = useState<typeof mockPlayers>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [sortField, setSortField] = useState<keyof typeof mockPlayers[0] | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [menuOpen, setMenuOpen] = useState(false);
const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

const [selectedTeam, setSelectedTeam] = useState<string>("All");
const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
const [searchQuery, setSearchQuery] = useState<string>("");

const handleMenuClick = (e: React.MouseEvent, player: any) => {
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left });
  setSelectedPlayer(player);
  setMenuOpen(true);
};

const handleCloseMenu = () => {
  setMenuOpen(false);
  setSelectedPlayer(null);
};

  useEffect(() => {
    setTimeout(() => {
      setPlayers(mockPlayers);
      setLoading(false);
    }, 800);
  }, []);

  const handleSort = (field: keyof typeof mockPlayers[0]) => {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedPlayers.length / rowsPerPage);
  const paginatedPlayers = sortedPlayers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(start + rowsPerPage - 1, sortedPlayers.length);


  return (
    <PageWrapper>
      <TitleBar>
        <Title>🏏 Player Performance Dashboard</Title>
        <ToolbarActions>
          <Button variant="primary">+ Add Player</Button>
          <Button variant="outline">⟳ Refresh</Button>
        </ToolbarActions>
      </TitleBar>

 <FilterBar
  teams={["All", "RCB", "MI", "CSK"]}
  roles={["Batsman", "Bowler", "All-Rounder"]}
  selectedTeam={selectedTeam}
  selectedRoles={selectedRoles}
  searchQuery={searchQuery}
  onTeamChange={setSelectedTeam}
  onRolesChange={setSelectedRoles}
  onSearch={setSearchQuery}
/>

      <TableWrapper>
        {loading ? (
          <EmptyState>Loading player data...</EmptyState>
        ) : players.length === 0 ? (
          <EmptyState>No players found.</EmptyState>
        ) : (
          <>
            <ScrollContainer>
              <Table>
                <Thead>
                  <tr>
                    <Th sortable onClick={() => handleSort("name")}>
                      Name {sortField === "name" && <SortIcon direction={sortDirection}>▲</SortIcon>}
                    </Th>
                    <Th sortable onClick={() => handleSort("role")}>
                      Role {sortField === "role" && <SortIcon direction={sortDirection}>▲</SortIcon>}
                    </Th>
                    <Th sortable onClick={() => handleSort("team")}>
                      Team {sortField === "team" && <SortIcon direction={sortDirection}>▲</SortIcon>}
                    </Th>
                    <Th sortable onClick={() => handleSort("runs")}>
                      Runs {sortField === "runs" && <SortIcon direction={sortDirection}>▲</SortIcon>}
                    </Th>
                    <Th sortable onClick={() => handleSort("matches")}>
                      Matches{" "}
                      {sortField === "matches" && <SortIcon direction={sortDirection}>▲</SortIcon>}
                    </Th>
                    <Th>Last Match</Th>
                    <Th>Actions</Th>
                  </tr>
                </Thead>

                <tbody>
                  {paginatedPlayers.map((p) => (
                    <Tr key={p.id}>
                      <Td>
                        <PlayerInfo>
                          <Avatar src={p.avatar} alt={p.name} />
                          {p.name}
                        </PlayerInfo>
                      </Td>
                      <Td>{p.role}</Td>
                      <Td>{p.team}</Td>
                      <Td>{p.runs.toLocaleString()}</Td>
                      <Td>{p.matches}</Td>
                      <Td>{p.lastMatch}</Td>
                        <Td>
                        <ActionsMenuButton onClick={(e) => handleMenuClick(e, p)}>⋮</ActionsMenuButton>
                        </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </ScrollContainer>

            <TableFooter>
              <FooterInfo>
                Showing {start}–{end} of {sortedPlayers.length} players
              </FooterInfo>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {[5, 10, 25, 50].map((n) => (
                    <option key={n} value={n}>
                      {n} / page
                    </option>
                  ))}
                </Select>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </TableFooter>
          </>
        )}
      </TableWrapper>
      {menuOpen && (
  <ActionsMenu
    position={menuPosition}
    onClose={handleCloseMenu}
    onEdit={() => alert(`Edit ${selectedPlayer.name}`)}
    onDelete={() => alert(`Delete ${selectedPlayer.name}`)}
    onAssign={() => alert(`Assign ${selectedPlayer.name} to team`)}
    onViewStats={() => alert(`View stats for ${selectedPlayer.name}`)}
  />
)}
    </PageWrapper>
  );
};

export default PlayersTablePage;
