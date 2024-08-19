import Link from "next/link";
import styles from "./Login.module.scss";
import { FaEye } from "react-icons/fa";
import { FormEvent } from "react";
const LoginView = () => {
    const handlerLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data = {
            email: form.email.value,
            password: form.password.value
        }
    }
  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      <div className={styles.login__form}>
        <form onSubmit={handlerLogin}>
          <div className={styles.login__input}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={styles.login__input__field}
            />
          </div>
          <div className={`${styles.login__input} ${styles.login__input__password}`}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={styles.login__input__field}
            />
            <div className={styles.login__input__password__icon}><FaEye /></div>
          </div>
          <div className={styles.login__nav__login}>
            <p>
              Dont have an account ? <Link href="/auth/register" className={styles.login__nav__login__link}>Sign up</Link>
            </p>
            <button className={styles.login__nav__login__button}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
