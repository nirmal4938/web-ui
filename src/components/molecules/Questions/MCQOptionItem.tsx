import styled, { css } from "styled-components";
import { Checkbox } from "@/components/atoms/Questions/Checkbox";
import { Typography } from "@/components/atoms/Questions/Typography";

const Wrapper = styled.label<{ selected?: boolean; disabled?: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  cursor: pointer;

  ${({ selected, theme }) =>
    selected &&
    css`
      background: ${theme.CTA_COLOR_LIGHT};
      border-color: ${theme.CTA_COLOR};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      cursor: default;
    `}
`;

export function MCQOptionItem({
  index,
  text,
  selected,
  disabled,
  onToggle,
}: {
  index: number;
  text: string;
  selected?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}) {
  return (
    <Wrapper selected={selected} disabled={disabled} onClick={onToggle}>
      <Checkbox checked={selected} readOnly disabled={disabled} />
      <Typography>
        {String.fromCharCode(65 + index)}. {text}
      </Typography>
    </Wrapper>
  );
}
