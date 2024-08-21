"use client";
import Link from "next/link";
import styles from "./Register.module.scss";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
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
          <Input name="email" type="email" placeholder="Email" />
          <Input name="phoneNumber" type="text" placeholder="Phone Number" />
          <Input name="fullName" type="text" placeholder="Full Name" />
          <Input name="password" type="password" placeholder="Password" />
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
            <Button type="submit" className={``}>
              {loading ? "Loading..." : "Register"}
            </Button>

            {/* <button className={styles.register__nav__login__button}>
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
