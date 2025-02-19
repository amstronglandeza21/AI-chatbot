import React from "react";
import styles from "../../styles/Button.module.css"; // Import Button styles

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={`${styles.button} ${props.className || ""}`}>
      {children}
    </button>
  );
};

export default Button;
