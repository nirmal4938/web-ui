import styled from "styled-components";

export const SplitWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 400px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const BannerSection = styled.div<{ width?: string }>`
  width: ${({ width }) => width || "40%"};
  background: #f8f9fb;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #e6e6e6;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e6e6e6;
  }
`;

export const BannerTextBlock = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  h4 {
    font-family: 'JioType', sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #141414;
    margin: 0;
  }

  p {
    font-family: 'JioType', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #141414;
    margin: 0;
  }

  img {
    width: 28px;   /* adjustable size */
    height: 28px;
    flex-shrink: 0;
  }
`;

export const ContentSection = styled.div<{ width?: string }>`
  width: ${({ width }) => width || "60%"};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FooterLink = styled.div`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
