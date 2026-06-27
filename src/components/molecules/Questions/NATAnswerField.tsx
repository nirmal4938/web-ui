import styled from "styled-components";
import { NumericInput } from "@/components/atoms/Questions/NumericInput";
import { Typography } from "@/components/atoms/Questions/Typography";

const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export function NATAnswerField({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled?: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <Wrapper>
      <Typography variant="label" muted>
        Your Answer
      </Typography>

      <NumericInput
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </Wrapper>
  );
}
