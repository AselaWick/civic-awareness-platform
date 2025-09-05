import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset'; // 👈 Add this line
}

const Button = ({ text, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-700 text-white px-4 py-2 rounded m-1 hover:bg-blue-800 transition"
    >
      {text}
    </button>
  );
};

export default Button;
