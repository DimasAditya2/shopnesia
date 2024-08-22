"use client";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
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

    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      form.reset();
      setLoading(false);
      push("/auth/login");
    } else {
      setLoading(false);
      setError("Email is already registered");
    }
  };
  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Already have an account ? Sign in"
    >
      <form onSubmit={handlerRegister}>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="phoneNumber" type="text" placeholder="Phone Number" />
        <Input name="fullName" type="text" placeholder="Full Name" />
        <Input name="password" type="password" placeholder="Password" />
        <div className={styles.register__nav__login}>
          <Button type="submit" className={styles.__button}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
