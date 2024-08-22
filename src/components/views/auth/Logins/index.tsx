import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/ui/Input";
import styles from "./Login.module.scss";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

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

      console.log(res?.ok);

      if (!res?.error) {
        console.log("success");
        setLoading(false);
        form.reset();
        push(callbackUrl as string);
      } else {
        console.log("failed");
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
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Dont have an account ? Sign up"
    >
      <form onSubmit={handlerLogin}>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <div className={styles.login__nav__login}>
          <Button type="submit">{loading ? "Loading..." : "Login"}</Button>
        </div>
      </form>
      <Button
        type="button"
        onClick={() =>
          signIn("google", {
            callbackUrl: Array.isArray(callbackUrl)
              ? callbackUrl[0]
              : callbackUrl,
          })
        }
      >
        <span>Login With Google </span> <FaGoogle size={25} />
      </Button>
    </AuthLayout>
  );
};

export default LoginView;
