import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterLink = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.font.size.label};

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    margin-left: 4px;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
