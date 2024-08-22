import React from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "@/types";
const Button: React.FC<ButtonProps> = ({ children, className, type, onClick, variant }) => {
    return (
      <button onClick={onClick} className={`${styles[variant]} ${className} ${styles.button}`} type={type}>
        {children}
      </button>
    );
  };

export default Button;
