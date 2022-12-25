import React from 'react';
import { Input as AntInput } from 'antd';

type Props = {
  label: string;
  value: string;
  updateValue: (value: React.SetStateAction<string>) => void;
  name: string;
  required?: boolean;
};

const Input = ({ label, value, updateValue, name, required = false }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor={name} style={{ marginBottom: '10px' }}>
        {label}
      </label>
      <AntInput type='text' value={value} name={name} onChange={e => updateValue(e.target.value)} required={required} />
    </div>
  );
};

export default Input;
