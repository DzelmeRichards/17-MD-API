import React, { FC } from 'react';
import './button.scss';

type ButtonProps = {
  text: string,
  onClick?: () => void,
}

const Button: FC<ButtonProps> = ({ text, onClick }) => (
  <div>
    <button
      className="button"
      onClick={onClick}
    >
      {text}
    </button>
  </div>
);

export default Button;
