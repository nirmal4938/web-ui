import React from "react";
import { PageWrapper, TitleBar, Title, ToolbarActions } from "@components/layout";
import Button from "@/components/atoms/Button/Button";
import styled from "styled-components";

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 24px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  padding: 20px;
`;

const Label = styled.h4`
  font-size: 1rem;
  color: #555;
`;

const Value = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 6px;
`;

const ElectionDashboardPage: React.FC = () => (
  <PageWrapper>
    <TitleBar>
      <Title>🗳️ Election Dashboard</Title>
      <ToolbarActions>
        <Button variant="outline">⟳ Refresh</Button>
        <Button variant="primary">+ New Election</Button>
      </ToolbarActions>
    </TitleBar>

    <DashboardGrid>
      <StatCard>
        <Label>Total Candidates</Label>
        <Value>24</Value>
      </StatCard>
      <StatCard>
        <Label>Registered Voters</Label>
        <Value>3,420</Value>
      </StatCard>
      <StatCard>
        <Label>Booths Active</Label>
        <Value>12</Value>
      </StatCard>
    </DashboardGrid>
  </PageWrapper>
);

export default ElectionDashboardPage;
