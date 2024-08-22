"use client";
import styles from "./Register.module.scss";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";
import { emailSchema, fullNameSchema, passwordSchema, phoneNumberSchema } from "@/schemas";
const RegisterView = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handlerRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target as HTMLFormElement;
      const data = {
        email: form.email.value,
        phoneNumber: form.phoneNumber.value,
        fullName: form.fullName.value,
        password: form.password.value,
      };

      const parsedEmail = emailSchema.safeParse(data.email);
      const parsedPassword = passwordSchema.safeParse(data.password);
      const parsedFullName = fullNameSchema.safeParse(data.fullName);
      const parsedPhoneNumber = phoneNumberSchema.safeParse(data.phoneNumber);
    
      if (!parsedEmail.success || !parsedPassword.success || !parsedFullName.success || !parsedPhoneNumber.success) {
        if (!parsedEmail.success) {
          throw new Error(parsedEmail.error.errors[0].message);
        }
        if (!parsedPhoneNumber.success) {
          throw new Error(parsedPhoneNumber.error.errors[0].message);
        }
        if (!parsedFullName.success) {
          throw new Error(parsedFullName.error.errors[0].message);
        }
        if (!parsedPassword.success) {
          throw new Error(parsedPassword.error.errors[0].message);
        }
      }

      const result = await authServices.registerAccount(data);

      if (result.status === 200) {
        form.reset();
        setLoading(false);
        push("/auth/login");
      } 
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      error={error}
      linkText="Already have an account ? Sign in"
    >
      <form onSubmit={handlerRegister}>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="phoneNumber" type="text" placeholder="Phone Number" />
        <Input name="fullName" type="text" placeholder="Full Name" />
        <Input name="password" type="password" placeholder="Password" />
        <div className={styles.register__nav__login}>
          <Button type="submit" variant="primary" className={styles.__button}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
