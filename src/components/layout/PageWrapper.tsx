import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #f9fafc;
  padding: 24px 32px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export default PageWrapper;
