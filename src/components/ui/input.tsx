import React from "react";
import styles from "../../styles/Input.module.css";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return <input {...props} className={`${styles.input} ${props.className || ""}`} />;
};

export default Input;
