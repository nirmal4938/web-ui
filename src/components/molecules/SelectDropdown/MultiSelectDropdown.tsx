// src/components/molecules/MultiSelectDropdown.tsx
import React, { useState } from "react";
// import { DropdownBase } from "../atoms/DropdownBase";
import { DropdownBase } from "@/components/atoms/DropdownBase/DropdownBase";
import styled from "styled-components";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  values: string[];
  onChange: (vals: string[]) => void;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  values,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleValue = (val: string) => {
    onChange(
      values.includes(val)
        ? values.filter((v) => v !== val)
        : [...values, val]
    );
  };

  return (
    <DropdownBase
      label={values.length > 0 ? values.join(", ") : label}
      open={open}
      onToggle={() => setOpen((o) => !o)}
    >
      <List>
        {options.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              checked={values.includes(opt)}
              onChange={() => toggleValue(opt)}
            />
            {opt}
          </label>
        ))}
      </List>
    </DropdownBase>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    padding: 0.3rem 0.5rem;
    border-radius: ${({ theme }) => theme.radius.sm};

    &:hover {
      background: ${({ theme }) => theme.HOVER_BG};
    }
  }
`;
