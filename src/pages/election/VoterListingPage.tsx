import React from "react";
import { PageWrapper, TitleBar, Title, ToolbarActions } from "@components/layout";
import Button from "@/components/atoms/Button/Button";
import styled from "styled-components";

const TableWrapper = styled.div`
  margin-top: 24px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const VoterListPage: React.FC = () => (
  <PageWrapper>
    <TitleBar>
      <Title>🧾 Voter List</Title>
      <ToolbarActions>
        <Button variant="outline">Import Voters</Button>
        <Button variant="primary">+ Add Voter</Button>
      </ToolbarActions>
    </TitleBar>

    <TableWrapper>
      <p>Voter list table will appear here.</p>
    </TableWrapper>
  </PageWrapper>
);

export default VoterListPage;
