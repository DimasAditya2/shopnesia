import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/ui/Input";
import styles from "./Login.module.scss";
import Button from "@/components/ui/Button";

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
        console.log('success');
        setLoading(false);
        form.reset();
        push(callbackUrl as string);
      } else {
        console.log('failed');
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
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
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
            <Button type="submit">{loading ? "Loading..." : "Login"}</Button>
          </div>
        </form>
        <Button type="button" onClick={() => signIn("google", {callbackUrl: Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl,})}>
          <span>Login With Google </span> <FaGoogle size={25} />
        </Button>
      </div>
    </div>
  );
};

export default LoginView;
