import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ButtonPrimary from "@/components/atoms/ButtonPrimary/ButtonPrimary";
import { InputWrapper, Input, Label, ErrorText} from '@components/atoms/InputField/InputField.styles'
import { useAuth } from "@/hooks/useAuth";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm: React.FC = () => {
  const handleSubmit = (values: LoginFormValues) => {
    console.log("Login values:", values);
    // TODO: Connect to Redux or API login
  };
  const { loading, error, success, login } = useAuth();

  return (
<Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => await login(values)}
    >
      {({ errors, touched }) => (
        <Form>
          <InputWrapper>
            <Label htmlFor="email">Email</Label>
            <Field
              as={Input}
              id="email"
              name="email"
              type="email"
              hasError={!!errors.email && touched.email}
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component={ErrorText} />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <Field
              as={Input}
              id="password"
              name="password"
              type="password"
              hasError={!!errors.password && touched.password}
              placeholder="Enter your password"
            />
            <ErrorMessage name="password" component={ErrorText} />
          </InputWrapper>

          {error && <ErrorText>{error}</ErrorText>}
          {success && <p style={{ color: "green" }}>Login successful!</p>}

          <ButtonPrimary type="submit" disabled={loading} style={{ marginTop: "16px" }}>
            {loading ? "Logging in..." : "Login"}
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
