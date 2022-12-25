import React from 'react';
import { Select as AntSelect } from 'antd';

type Props = {
  label: string;
  value: any;
  defaultValue?: any;
  updateValue: (value: React.SetStateAction<any>) => void;
  name: string;
  options: { value: any; label: string }[];
};

const Select = ({ label, value, updateValue, name, options, defaultValue }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor={name} style={{ marginBottom: '10px' }}>
        {label}
      </label>
      <AntSelect defaultValue={defaultValue} style={{ width: '100%' }} value={value} onChange={updateValue} options={options} labelInValue />
    </div>
  );
};

export default Select;
