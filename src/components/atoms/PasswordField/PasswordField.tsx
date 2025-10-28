import React, { useState } from "react";
import {
  InputWrapper,
  Label,
  Input,
  ToggleIcon,
  ErrorText,
} from "./PasswordField.styles";

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
}) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow((prev) => !prev);

  return (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <div style={{ position: "relative" }}>
        <Input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          hasError={!!error}
        />
        <ToggleIcon onClick={toggleShow}>
          {show ? "🙈" : "👁️"}
        </ToggleIcon>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};

export default PasswordField;
