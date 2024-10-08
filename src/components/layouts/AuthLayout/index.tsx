import { PropLayoutAuth } from "@/types";
import styles from "./AuthLayout.module.scss";
import Link from "next/link";
const AuthLayout = (props: PropLayoutAuth) => {
  const { title, error, children, link, linkText } = props;
  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      {error && <p className={styles.auth__error}>{error}</p>}
      <div className={styles.auth__form}>{children}</div>
      <Link href={link} className={styles.auth__link}>{linkText}</Link>
    </div>
  );
};

export default AuthLayout;
