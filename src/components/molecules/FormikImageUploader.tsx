import React from "react";
import { ErrorMessage } from "formik";
import type { FieldProps } from "formik";
// import ImageUploader from "../../atoms/ImageUploader";
import ImageUploader from "../atoms/ImageUploader";
import { ErrorText } from "@/components/molecules/RegisterForm/RegisterForm.styles";

interface FormikImageUploaderProps extends FieldProps {
  label?: string;
  direction?: "row" | "column";
  inputFlex?: number;
  previewFlex?: number;
  accept?: string;
}

const FormikImageUploader: React.FC<FormikImageUploaderProps> = ({
  field,
  form,
  label,
  direction = "row",
  inputFlex = 8,
  previewFlex = 2,
  accept,
}) => {
  const handleChange = (file: File | null) => {
    form.setFieldValue(field.name, file);
  };

  return (
    <div>
      <ImageUploader
        label={label}
        value={field.value}
        onChange={handleChange}
        direction={direction}
        inputFlex={inputFlex}
        previewFlex={previewFlex}
        accept={accept}
      />
      <ErrorMessage name={field.name} component={ErrorText} />
    </div>
  );
};

export default FormikImageUploader;
