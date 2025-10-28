import React from "react";
import { CheckboxWrapper, Label } from "./Checkbox.styles";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <CheckboxWrapper>
    <input type="checkbox" checked={checked} onChange={onChange} />
    <Label>{label}</Label>
  </CheckboxWrapper>
);

export default Checkbox;
