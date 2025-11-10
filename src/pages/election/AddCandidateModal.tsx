import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled, { keyframes } from "styled-components";
import axios from "axios";

/* -------------------- Animations -------------------- */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* -------------------- Styled Components -------------------- */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 500px;
  max-width: 95%;
  animation: ${fadeIn} 0.3s ease-out;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: span 2;
  @media (max-width: 480px) {
    grid-column: span 1;
  }
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  resize: vertical;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Button = styled.button<{ variant?: "primary" | "outline" }>`
  padding: 0.6rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  ${({ variant }) =>
    variant === "primary"
      ? `
    background: #2563eb;
    color: #fff;
    &:hover { background: #1d4ed8; }
  `
      : `
    background: #fff;
    border: 1px solid #d1d5db;
    color: #111;
    &:hover { background: #f3f4f6; }
  `}
`;

const PartySymbolPreview = styled.img`
  max-width: 60px;
  max-height: 60px;
  margin-top: 0.25rem;
  border-radius: 6px;
  object-fit: contain;
  border: 1px solid #d1d5db;
`;

/* -------------------- Validation -------------------- */
const candidateSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  gender: Yup.string().oneOf(["male", "female", "other"]).required("Gender is required"),
  age: Yup.number().min(18, "Must be 18+").required("Age is required"),
  partyName: Yup.string().required("Party name is required"),
  constituency: Yup.string().required("Constituency is required"),
});

/* -------------------- Component -------------------- */
const AddCandidateModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({
  onClose,
  onSuccess,
}) => {
  const [partySymbolPreview, setPartySymbolPreview] = useState<string | null>(null);

  const initialValues = {
    electionId: "8ac6246f-1c1b-4224-82b8-d3d312565469",
    fullName: "",
    gender: "",
    age: "",
    partyName: "",
    partySymbol: "",
    constituency: "41 Nirmali",
    manifesto: "",
    createdBy: "9403269f-0c51-48c9-9c2b-ea9c8fc69f20",
  };

  const handleSubmit = async (values: any) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_PROD_URL}/candidates`, values);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Overlay>
      <Modal>
        <h2>Add Candidate</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={candidateSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Grid>
                <div>
                  <Label>Full Name</Label>
                  <Input name="fullName" />
                  <ErrorMessage name="fullName" component={ErrorText} />
                </div>

                <div>
                  <Label>Gender</Label>
                  <Field as="select" name="gender">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component={ErrorText} />
                </div>

                <div>
                  <Label>Age</Label>
                  <Input type="number" name="age" />
                  <ErrorMessage name="age" component={ErrorText} />
                </div>

                <div>
                  <Label>Constituency</Label>
                  <Input name="constituency" value={values.constituency} disabled />
                </div>

                <div>
                  <Label>Party Name</Label>
                  <Input name="partyName" />
                  <ErrorMessage name="partyName" component={ErrorText} />
                </div>

                <div>
                  <Label>Party Symbol URL</Label>
                  <Input
                    name="partySymbol"
                    onChange={(e: any) => {
                      setFieldValue("partySymbol", e.target.value);
                      setPartySymbolPreview(e.target.value);
                    }}
                  />
                  {partySymbolPreview && <PartySymbolPreview src={partySymbolPreview} />}
                </div>

                <FullWidth>
                  <Label>Manifesto</Label>
                  <TextArea as="textarea" name="manifesto" rows={3} />
                </FullWidth>
              </Grid>

              <ButtonGroup>
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Candidate
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal>
    </Overlay>
  );
};

export default AddCandidateModal;
