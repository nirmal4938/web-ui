import styled from "styled-components";
import { Typography } from "@/components/atoms/Questions/Typography";

const Wrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.CONTENT_GRADIENT};
  border: 1px solid ${({ theme }) => theme.CONTENT_BORDER};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const Title = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const ExplanationBlock = () => {
  return (
    <Wrapper>
      <Title>
        <Typography variant="label" muted>
          Explanation
        </Typography>
      </Title>

      <Typography variant="body">
        When a ray of light passes from air into glass, it bends towards the
        normal because the speed of light decreases in a denser medium.
      </Typography>
    </Wrapper>
  );
};
