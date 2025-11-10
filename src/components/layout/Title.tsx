import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export default Title;
