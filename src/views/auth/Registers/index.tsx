"use client";
import Link from "next/link";
import styles from "./Register.module.scss";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
const RegisterView = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handlerRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      fullName: form.fullName.value,
      password: form.password.value,
    };
    try {
      const result = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (result.status === 200) {
        form.reset();
        setLoading(false);
        push("/auth/login");
      } else {
        setLoading(false);
        setError("Email is already registered");
      }
    } catch (error) {
      setLoading(false);
      setError(error as string);
      console.log(error);
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handlerRegister}>
          <div className={styles.register__input}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className={styles.register__input__field}
            />
          </div>
          <div className={styles.register__input}>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              id="phoneNumber"
              className={styles.register__input__field}
            />
          </div>
          <div className={styles.register__input}>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              name="fullName"
              className={styles.register__input__field}
            />
          </div>
          <div
            className={`${styles.register__input} ${styles.register__input__password}`}
          >
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={styles.register__input__field}
            />
            <div className={styles.register__input__password__icon}>
              <FaEye />
            </div>
          </div>
          <div className={styles.register__nav__login}>
            <p>
              Have an account?{" "}
              <Link
                href="/auth/login"
                className={styles.register__nav__login__link}
              >
                Sign in
              </Link>
            </p>
            <button className={styles.register__nav__login__button}>
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
