import Navbar from "@/components/fragments/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const disabledNavbar = ["/auth/login", "/auth/register", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      <main className={`${poppins.variable} font-sans`}>
        {!disabledNavbar.includes(pathname.split('/')[1]) && <Navbar />}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
