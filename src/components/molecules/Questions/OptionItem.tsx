import styled, { css } from "styled-components";
import { RadioInput } from "@/components/atoms/Questions/Input";
import { Typography } from "@/components/atoms/Questions/Typography";

const OptionWrapper = styled.label<{
  selected?: boolean;
  disabled?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  background: ${({ theme }) => theme.CONTENT_SURFACE};

  ${({ selected, theme }) =>
    selected &&
    css`
      border-color: ${theme.CTA_COLOR};
      background: ${theme.CTA_COLOR_LIGHT};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      cursor: default;
    `}

  &:hover {
    background: ${({ theme, disabled }) =>
      disabled ? "inherit" : theme.HOVER_BG};
  }
`;

interface OptionItemProps {
  index: number;
  text: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function OptionItem({
  index,
  text,
  selected,
  disabled,
  onClick,
}: OptionItemProps) {
  return (
    <OptionWrapper
      selected={selected}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
    >
      <RadioInput
        checked={selected}
        disabled={disabled}
        readOnly
      />

      <Typography>
        {String.fromCharCode(65 + index)}. {text}
      </Typography>
    </OptionWrapper>
  );
}
