// src/components/organisms/FilterBar.tsx
import React from "react";
import styled from "styled-components";
// import { SelectDropdown } from "../molecules/SelectDropdown";
import { SelectDropdown } from "@/components/molecules/SelectDropdown/SelectDropdown";
import { MultiSelectDropdown } from "@/components/molecules/SelectDropdown/MultiSelectDropdown";
import { Grid, GridItem } from "@/components/atoms/Grid/Grid";
interface FilterBarProps {
  teams: string[];
  roles: string[];
  selectedTeam: string;
  selectedRoles: string[];
  searchQuery: string;
  onTeamChange: (team: string) => void;
  onRolesChange: (roles: string[]) => void;
  onSearch: (query: string) => void;
}

const FilterBarWrapper = styled.div`
  background: ${({ theme }) => theme.CONTENT_SURFACE || "#fff"};
  padding: 1rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.CONTENT_BORDER || "#e5e7eb"};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER || "#d1d5db"};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.CTA_COLOR || "#2563eb"};
  }
`;

const FilterBar: React.FC<FilterBarProps> = ({
  teams,
  roles,
  selectedTeam,
  selectedRoles,
  searchQuery,
  onTeamChange,
  onRolesChange,
  onSearch,
}) => {
  return (
    <FilterBarWrapper>
      <Grid columns={3} gap="1.5rem">
        <GridItem>
          <SelectDropdown
            label="Team"
            options={teams}
            value={selectedTeam}
            onChange={onTeamChange}
          />
        </GridItem>

        <GridItem>
          <MultiSelectDropdown
            label="Role"
            options={roles}
            values={selectedRoles}
            onChange={onRolesChange}
          />
        </GridItem>

        <GridItem>
          <SearchInput
            type="text"
            placeholder="🔍 Search player..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </GridItem>
      </Grid>
    </FilterBarWrapper>
  );
};

export default FilterBar;
