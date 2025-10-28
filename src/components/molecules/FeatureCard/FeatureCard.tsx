import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.SURFACE};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    background: ${({ theme }) => theme.HOVER_BG};
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.CTA_COLOR};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const CardTitle = styled.h4`
  font-size: ${({ theme }) => theme.font.size.h4};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.TEXT};
`;

const CardDesc = styled.p`
  font-size: ${({ theme }) => theme.font.size.body};
  color: ${({ theme }) => theme.TEXT_MUTED};
  line-height: 1.5;
`;

interface Props {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard: React.FC<Props> = ({ icon, title, desc }) => (
  <Card>
    <IconWrapper>{icon}</IconWrapper>
    <CardTitle>{title}</CardTitle>
    <CardDesc>{desc}</CardDesc>
  </Card>
);

export default FeatureCard;
