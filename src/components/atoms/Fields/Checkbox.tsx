// FormikCheckbox.tsx

import React from 'react';
import { useField } from 'formik';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  name: string;
}

const FormikCheckbox = ({ label, ...props }: Props) => {
  const [field, meta] = useField({
    ...props,
    type: 'checkbox',
  } as any);

  return (
    <>
      <label>
        <input type="checkbox" {...field} {...props} />
        {label}
      </label>

      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};

export default FormikCheckbox;
