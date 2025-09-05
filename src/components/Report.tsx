
export {}; // 👈 Forces TypeScript to treat file as a module

import React from 'react';

interface ReportProps {
  title: string;
  description: string;
}

const Report: React.FC<ReportProps> = ({ title, description }) => {
  return (
    <div className="border-b py-2">
      <strong>{title}</strong>: {description}
    </div>
  );
};

export default Report;
