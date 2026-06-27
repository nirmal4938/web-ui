import styled from "styled-components";
import { MatchCheckbox } from "@/components/atoms/Questions/MatchCheckbox";

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover input:not(:disabled) {
    transform: scale(1.2);
  }
`;

export function MatchCell({
  checked,
  disabled,
  onToggle,
}: {
  checked?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}) {
  return (
    <Cell>
      <MatchCheckbox checked={checked} disabled={disabled} onClick={onToggle} />
    </Cell>
  );
}
