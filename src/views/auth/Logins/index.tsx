import Link from "next/link";
import styles from "./Login.module.scss";
import { FaEye } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
const LoginView = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handlerLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl: Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl,
      });

      console.log(res?.ok)

      if (!res?.error) {
        setLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setLoading(false);
        setError("Wrong email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  };
  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
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
          <div
            className={`${styles.login__input} ${styles.login__input__password}`}
          >
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={styles.login__input__field}
            />
            <div className={styles.login__input__password__icon}>
              <FaEye />
            </div>
          </div>
          <div className={styles.login__nav__login}>
            <p>
              Dont have an account ?{" "}
              <Link
                href="/auth/register"
                className={styles.login__nav__login__link}
              >
                Sign up
              </Link>
            </p>
            <button type="submit" className={styles.login__nav__login__button}>
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
