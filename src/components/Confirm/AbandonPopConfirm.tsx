import React from 'react';
import { Popconfirm } from "antd";

interface AbandonPopConfirmProps {
  title: string;
  text: string;
  onConfirm: () => void;
}

const AbandonPopConfirm: React.FC<AbandonPopConfirmProps> = ({ title, text, onConfirm }) => {
  return (
      <Popconfirm title={title} onConfirm={onConfirm}>
        <a>{text}</a>
      </Popconfirm>
  );
}

export default AbandonPopConfirm;
