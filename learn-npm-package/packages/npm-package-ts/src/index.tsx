// Hello command
export const hello = (name: string) => console.log(`Hello ${name}`);

import React from "react";

export interface ButtonProps {
  label: string;
}

const Button = ({ label }: ButtonProps) => {
  return <button>{label}</button>;
};

export default Button;