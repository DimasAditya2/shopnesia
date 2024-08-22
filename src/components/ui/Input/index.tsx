import { FaEye } from "react-icons/fa";
import styles from "./Input.module.scss";
import { InputProps } from "@/types";

const Input = (props: InputProps) => {
  const { name, type, placeholder } = props;
  return (
    <>
      <div className={styles.input}>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`${styles.input__field} ${styles.input__password}`}
        />
        {name === "password" && (
          <div className={styles.input__password__icon}>
            <FaEye />
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
