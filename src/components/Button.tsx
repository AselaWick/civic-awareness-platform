
export {}; // 👈 Forces TypeScript to treat file as a module

import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps): React.ReactElement => {

  return (
    <button
      onClick={onClick}
      className="bg-blue-700 text-white px-4 py-2 rounded m-1 hover:bg-blue-800 transition"
    >
      {text}
    </button>
  );
};

export default Button;
