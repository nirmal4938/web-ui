import React from "react";
import styled from "styled-components";
import { FaGithub, FaGitlab, FaBitbucket } from "react-icons/fa";
import Title from "@/components/atoms/Title/Title";

const Wrapper = styled.section`
  padding: 100px 20px;
  background: #f9fafb;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 40px;
  max-width: 900px;
  margin: 60px auto 0;
`;

const Card = styled.div`
  background: white;
  padding: 40px 20px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }

  svg {
    font-size: 48px;
    margin-bottom: 16px;
    color: #333;
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.95rem;
    color: #555;
  }
`;

const IntegrationSection: React.FC = () => {
  return (
    <Wrapper>
      <Title>Seamless Git Integrations</Title>
      <p>Connect your favorite version control systems to automate workflows and sync effortlessly.</p>

      <Grid>
        <Card>
          <FaGithub />
          <h3>GitHub</h3>
          <p>Sync your repositories, manage branches, and automate deployments directly from GitHub.</p>
        </Card>
        <Card>
          <FaGitlab />
          <h3>GitLab</h3>
          <p>Full CI/CD and sync integration for teams using GitLab’s modern DevOps platform.</p>
        </Card>
        <Card>
          <FaBitbucket />
          <h3>Bitbucket</h3>
          <p>Connect Bitbucket repos and manage team sync with Atlassian ecosystem support.</p>
        </Card>
      </Grid>
    </Wrapper>
  );
};

export default IntegrationSection;
