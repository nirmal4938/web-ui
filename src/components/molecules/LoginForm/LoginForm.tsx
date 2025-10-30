// src/components/molecules/LoginForm/LoginForm.tsx
import React, { forwardRef, useImperativeHandle } from "react";
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

const LoginForm = forwardRef((props, ref) => {
  const { loading, error, user, login } = useAuth();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
            <InputWrapper>
              <Label>Email</Label>
              <Field
                as={Input}
                name="email"
                type="email"
                disabled={isDisabled}
              />
              <ErrorMessage name="email" component={ErrorText} />
            </InputWrapper>

            <InputWrapper>
              <Label>Password</Label>
              <Field
                as={Input}
                name="password"
                type="password"
                disabled={isDisabled}
              />
              <ErrorMessage name="password" component={ErrorText} />
            </InputWrapper>

            {error && <ErrorText>{error}</ErrorText>}
            {user && (
              <p style={{ color: "green" }}>Welcome, {user.fullName}</p>
            )}

            <ButtonPrimary type="submit" disabled={isDisabled}>
              {isAuthenticated
                ? "Already Logged In"
                : loading
                ? "Logging in..."
                : "Login"}
            </ButtonPrimary>
          </Form>
        );
      }}
    </Formik>
  );
});

export default LoginForm;
