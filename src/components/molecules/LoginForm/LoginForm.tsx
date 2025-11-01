// src/components/molecules/LoginForm/LoginForm.tsx
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";
import {
  InputWrapper,
  Input,
  Label,
  ErrorText,
} from "@components/atoms/InputField/InputField.styles";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@state/selectors/authSelectors";
import { Eye, EyeOff } from "lucide-react";
import styled from "styled-components";

// ---------- Styled Enhancements ----------
const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: #111;
  }
`;


const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

const LoginForm = forwardRef((props, ref) => {
  const { loading, error, user, login } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [showPassword, setShowPassword] = useState(false);
  const isDisabled = loading || isAuthenticated;

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Min 6 characters")
          .required("Password is required"),
      })}
      onSubmit={async (values, { resetForm }) => {
        if (isAuthenticated) return; // Prevent redundant login

        const success = await login(values.email, values.password);
        if (success) {
          resetForm();
          navigate("/");
        }
      }}
    >
      {(formik) => {
        useImperativeHandle(ref, () => ({
          resetForm: formik.resetForm,
        }));

        return (
          <Form>
            {/* Email Field */}
            <InputWrapper>
              <Label>Email</Label>
              <Field
                as={Input}
                name="email"
                type="email"
                disabled={isDisabled}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component={ErrorText} />
            </InputWrapper>

            {/* Password Field with Toggle */}
   <InputWrapper>
  <Label>Password</Label>
  <PasswordWrapper>
    <Field
      as={Input}
      name="password"
      type={showPassword ? "text" : "password"}
      disabled={isDisabled}
      placeholder="Enter your password"
      style={{ width: "100%", paddingRight: "40px" }} // add right padding for icon
    />
    <ToggleButton
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      tabIndex={-1}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </ToggleButton>
  </PasswordWrapper>
  <ErrorMessage name="password" component={ErrorText} />
</InputWrapper>


            {/* Error or Success Message */}
            {error && <ErrorText>{error}</ErrorText>}
            {user && (
              <p style={{ color: "green", textAlign: "center" }}>
                Welcome, {user.fullName}
              </p>
            )}

            {/* Submit Button Centered */}
            <ButtonContainer>
              <ButtonPrimary type="submit" disabled={isDisabled}>
                {isAuthenticated
                  ? "Already Logged In"
                  : loading
                  ? "Logging in..."
                  : "Login"}
              </ButtonPrimary>
            </ButtonContainer>
          </Form>
        );
      }}
    </Formik>
  );
});

export default LoginForm;
