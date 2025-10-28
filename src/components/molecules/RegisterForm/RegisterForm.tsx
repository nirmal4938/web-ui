import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormWrapper,
  FormSection,
  CheckboxRow,
  ErrorText,
} from "./RegisterForm.styles";
import InputField from "../../atoms/InputField/InputField";
import PasswordField from "../../atoms/PasswordField/PasswordField";
import Checkbox from "../../atoms/Checkbox/Checkbox";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import FormikImageUploader from "../FormikImageUploader";
import PaymentForm from "@/components/organisms/PaymentForm";

// ✅ Validation Schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
  otp: Yup.string()
    .when("otpSent", (otpSent, schema) =>
      otpSent
        ? schema.length(6, "OTP must be 6 digits").required("Please enter the OTP")
        : schema
    )
    .nullable(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
  agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),

  // ✅ Logo validation with correct File type
  logo: Yup.mixed<File>()
    .required("Logo is required")
    .test("fileSize", "Logo size should be less than 2MB", (file) =>
      file ? file.size <= 2 * 1024 * 1024 : true
    )
    .test("fileType", "Only JPEG/PNG supported", (file) =>
      file ? ["image/jpeg", "image/png"].includes(file.type) : true
    ),
});


const RegisterForm: React.FC = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleSendOtp = async (phone: string) => {
    if (!phone.match(/^[6-9]\d{9}$/)) {
      setOtpMessage("⚠️ Enter a valid 10-digit number before sending OTP.");
      return;
    }
    setLoading(true);
    setOtpMessage("Sending OTP...");
    await new Promise((res) => setTimeout(res, 1200));
    setOtpSent(true);
    setOtpMessage("📨 OTP sent successfully! Please check your phone.");
    setLoading(false);
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!otp || otp.length !== 6) {
      setOtpMessage("⚠️ Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    setOtpMessage("Verifying OTP...");
    await new Promise((res) => setTimeout(res, 1000));
    setOtpVerified(true);
    setOtpMessage("✅ Mobile number verified successfully!");
    setLoading(false);
  };

  const handleSubmit = async (values: any) => {
    if (!otpVerified) {
      setOtpMessage("⚠️ Please verify your mobile number before registering.");
      return;
    }
    setLoading(true);
    console.log("Form Submitted:", values);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setOtpMessage("🎉 Registration successful!");
  };

  return (
    <PaymentForm amount={1} onSuccess={(id) => console.log("Payment ID:", id)} />
    // <Formik
    //   initialValues={{
    //     name: "",
    //     email: "",
    //     phone: "",
    //     otp: "",
    //     password: "",
    //     confirmPassword: "",
    //     agreeToTerms: false,
    //     otpSent: false,
    //     logo: null,
    //     paymentConfirmed: false
    //   }}
    //   validationSchema={RegisterSchema}
    //   onSubmit={handleSubmit}
    // >
    //   {({ values, handleChange, setFieldValue }) => (
    //     <FormWrapper as={Form}>
    //       <FormSection>
    //         <div className="form-body">
    //           {/* --- Basic Details --- */}
    //           <Field
    //             as={InputField}
    //             label="Organization Name"
    //             name="name"
    //             onChange={handleChange}
    //           />
    //           <ErrorMessage name="name" component={ErrorText} />

    //           <Field
    //             as={InputField}
    //             label="Email"
    //             name="email"
    //             type="email"
    //             onChange={handleChange}
    //           />
    //           <ErrorMessage name="email" component={ErrorText} />

    //           {/* --- Logo Upload --- */}
    //             <Field
    //             name="logo"
    //             component={FormikImageUploader}
    //             label="Organization Logo"
    //             />

    //           {/* --- Mobile + OTP --- */}
    //           <div
    //             className="form-row"
    //             style={{
    //               display: "flex",
    //               alignItems: "flex-end",
    //               gap: "8px",
    //               width: "100%",
    //               flexWrap: "nowrap",
    //             }}
    //           >
    //             <div style={{ flex: 1 }}>
    //               <Field
    //                 as={InputField}
    //                 label="Mobile Number"
    //                 name="phone"
    //                 placeholder="Enter 10-digit number"
    //                 value={values.phone}
    //                 onChange={handleChange}
    //               />
    //               <ErrorMessage name="phone" component={ErrorText} />
    //             </div>

    //             <div style={{ flexShrink: 0 }}>
    //               <ButtonPrimary
    //                 type="button"
    //                 disabled={loading || otpSent}
    //                 onClick={() => handleSendOtp(values.phone)}
    //                 style={{
    //                   height: "42px",
    //                   minWidth: "110px",
    //                   marginBottom: "2px",
    //                 }}
    //               >
    //                 {otpSent ? "Sent" : "Send OTP"}
    //               </ButtonPrimary>
    //             </div>
    //           </div>

    //           {/* --- OTP Verification --- */}
    //           {otpSent && !otpVerified && (
    //             <div
    //               className="form-row"
    //               style={{
    //                 display: "flex",
    //                 gap: "8px",
    //                 alignItems: "flex-end",
    //                 width: "100%",
    //                 marginTop: "8px",
    //               }}
    //             >
    //               <div style={{ flex: 1 }}>
    //                 <Field
    //                   as={InputField}
    //                   label="Enter OTP"
    //                   name="otp"
    //                   placeholder="6-digit code"
    //                   value={values.otp}
    //                   onChange={handleChange}
    //                 />
    //                 <ErrorMessage name="otp" component={ErrorText} />
    //               </div>
    //               <div style={{ flexShrink: 0 }}>
    //                 <ButtonPrimary
    //                   type="button"
    //                   onClick={() => handleVerifyOtp(values.otp)}
    //                   style={{
    //                     height: "42px",
    //                     minWidth: "110px",
    //                     marginBottom: "2px",
    //                   }}
    //                 >
    //                   Verify
    //                 </ButtonPrimary>
    //               </div>
    //             </div>
    //           )}

    //           {/* --- Dynamic Message --- */}
    //           {otpMessage && (
    //             <p
    //               style={{
    //                 color: otpVerified ? "green" : "#cc8800",
    //                 fontSize: "14px",
    //                 marginTop: "6px",
    //               }}
    //             >
    //               {otpMessage}
    //             </p>
    //           )}
    //           {otpVerified && !values.paymentConfirmed && (
    //             <PaymentForm
    //               amount={499}
    //               onSuccess={(paymentId) => {
    //                 setFieldValue("paymentConfirmed", true);
    //                 setFieldValue("paymentId", paymentId);
    //               }}
    //             />
    //           )}
    //           {/* --- Passwords --- */}
    //            <Field
    //             as={PasswordField}
    //             label="Password"
    //             name="password"
    //             onChange={handleChange}
    //           />
    //           <ErrorMessage name="password" component={ErrorText} />

    //           <Field
    //             as={PasswordField}
    //             label="Confirm Password"
    //             name="confirmPassword"
    //             onChange={handleChange}
    //           /> 
    //           <ErrorMessage name="confirmPassword" component={ErrorText} />

    //           {/* --- Terms --- */}
    //           <CheckboxRow>
    //             <Field
    //               as={Checkbox}
    //               label="I agree to Terms"
    //               name="agreeToTerms"
    //               checked={values.agreeToTerms}
    //               onChange={handleChange}
    //             />
    //             <ErrorMessage name="agreeToTerms" component={ErrorText} />
    //           </CheckboxRow>

    //           {/* --- Submit --- */}
    //           <ButtonPrimary type="submit" disabled={loading}>
    //             {loading ? "Processing..." : "Register"}
    //           </ButtonPrimary>
    //         </div>
    //       </FormSection>
    //     </FormWrapper>
    //   )}
    // </Formik>
  );
};

export default RegisterForm;
