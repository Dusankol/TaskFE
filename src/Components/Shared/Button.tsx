import React from 'react';
import { Button as AntButton } from 'antd';

type Props = {
  label: string;
  onClick?: any;
  type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  htmlType?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
};

const Button = ({ label, onClick, type, htmlType, isLoading = false }: Props) => {
  return (
    <AntButton type={type} onClick={onClick} htmlType={htmlType} loading={isLoading}>
      {label}
    </AntButton>
  );
};

export default Button;
