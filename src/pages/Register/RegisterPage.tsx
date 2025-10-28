import React from "react";
// import FormContainer from "../../components/layout/FormContainer/FormContainer";
import FormContainer from "@/components/layout/FormContainer/FormContainer";
import RegisterForm from "../../components/molecules/RegisterForm/RegisterForm";
import { FooterLink, Wrapper } from "./Register.styles";

const RegisterPage: React.FC = () => (
  <Wrapper>
    <FormContainer title="Create Account">
      <RegisterForm />
      <FooterLink>
        Already have an account? <a href="/login">Login</a>
      </FooterLink>
    </FormContainer>
  </Wrapper>
);

export default RegisterPage;
