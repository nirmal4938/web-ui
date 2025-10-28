import React from "react";
import { Container, Card } from "./FormContainer.styles";

interface FormContainerProps {
  children: React.ReactNode;
  title?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, title }) => (
  <Container>
    <Card>
      {title && <h2>{title}</h2>}
      {children}
    </Card>
  </Container>
);

export default FormContainer;
