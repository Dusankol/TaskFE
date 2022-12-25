import React from 'react';
import { notification } from 'antd';

type Props = {
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
};

export const toast = ({ message, type }: Props) => {
  notification.open({
    placement: 'bottomLeft',
    message: message,
    duration: 3,
    type: type
  });
};
