import React from "react";
import { PageWrapper, TitleBar, Title, ToolbarActions } from "@components/layout";
import Button from "@/components/atoms/Button/Button";
import styled from "styled-components";

const ChartSection = styled.div`
  margin-top: 24px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const ResultDashboardPage: React.FC = () => (
  <PageWrapper>
    <TitleBar>
      <Title>📊 Result Dashboard</Title>
      <ToolbarActions>
        <Button variant="outline">Refresh Results</Button>
      </ToolbarActions>
    </TitleBar>

    <ChartSection>
      <p>Results chart and winner summary will appear here.</p>
    </ChartSection>
  </PageWrapper>
);

export default ResultDashboardPage;
