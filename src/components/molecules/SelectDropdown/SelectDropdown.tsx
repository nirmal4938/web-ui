// src/components/molecules/SelectDropdown.tsx
import React, { useState } from "react";
import { DropdownBase } from "@/components/atoms/DropdownBase/DropdownBase";
import styled from "styled-components";

interface SelectDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownBase
      label={value || label}
      open={open}
      onToggle={() => setOpen((o) => !o)}
    >
      <List>
        {options.map((opt) => (
          <Item
            key={opt}
            $active={opt === value}
            onClick={() => {
              onChange(opt);
              setOpen(false);
            }}
          >
            {opt}
          </Item>
        ))}
      </List>
    </DropdownBase>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Item = styled.div<{ $active?: boolean }>`
  padding: 0.35rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $active, theme }) => ($active ? theme.HOVER_BG : "transparent")};
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    background: ${({ theme }) => theme.HOVER_BG};
  }
`;
