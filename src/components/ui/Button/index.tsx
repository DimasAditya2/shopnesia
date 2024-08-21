import React from "react";
import styles from "./Button.module.scss";
const Button: React.FC<ButtonProps> = ({ children, className, type, onClick }) => {
    return (
      <button onClick={onClick} className={`${styles.button} ${className}`} type={type}>
        {children}
      </button>
    );
  };

export default Button;
