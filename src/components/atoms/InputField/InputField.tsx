import React from "react";
import { InputWrapper, Label, Input, ErrorText } from "./InputField.styles";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
}) => (
  <InputWrapper>
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      hasError={!!error}
    />
    {error && <ErrorText>{error}</ErrorText>}
  </InputWrapper>
);

export default InputField;
