import styled from "styled-components";

const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  button {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    gap: 8px;
  }
`;

export default ToolbarActions;
