import React from "react";
import styled from "styled-components";
import Title from "@/components/atoms/Title/Title";

const Section = styled.section`
  background: ${({ theme }) => theme.SURFACE};
  color: ${({ theme }) => theme.TEXT};
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(6)};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.WHITE};
  border: 1px solid ${({ theme }) => theme.BORDER};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.CONTENT_SHADOW};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const Quote = styled.p`
  font-size: ${({ theme }) => theme.font.size.body};
  line-height: 1.6;
  color: ${({ theme }) => theme.TEXT_MUTED};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const Author = styled.h4`
  font-size: ${({ theme }) => theme.font.size.h5};
  font-weight: 600;
  color: ${({ theme }) => theme.TEXT};
`;

const Role = styled.p`
  font-size: ${({ theme }) => theme.font.size.small};
  color: ${({ theme }) => theme.TEXT_MUTED};
`;

const testimonials = [
  {
    quote:
      "Synqware helped us digitize our school management system seamlessly. The team’s attention to detail was exceptional!",
    author: "Ravi Kumar",
    role: "Director, Sunrise Public School",
  },
  {
    quote:
      "We integrated Synqware’s cloud-based APIs into our healthcare system — everything just worked perfectly from day one.",
    author: "Dr. Neha Sharma",
    role: "Administrator, LifeCare Hospital",
  },
  {
    quote:
      "The team delivered a custom IoT dashboard for our manufacturing unit — it’s fast, reliable, and visually stunning.",
    author: "Ankit Verma",
    role: "CTO, NexGen Automation",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <Section>
      <Title level="h2">What Our Clients Say</Title>
      <Grid>
        {testimonials.map((item, index) => (
          <Card key={index}>
            <Quote>“{item.quote}”</Quote>
            <Author>{item.author}</Author>
            <Role>{item.role}</Role>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default TestimonialsSection;
