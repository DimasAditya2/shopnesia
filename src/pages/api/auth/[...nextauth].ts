import { looginWithGoogle, signIn } from "@/services/auth/services";
import { compare } from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const isValidPassword = await compare(password, user.password);
          if (isValidPassword) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, profile, user, account }: any) {
      if (account?.provider == "credentials") {
        token.email = user.email;
        token.fullName = user.fullName;
        token.password = user.password;
        token.phoneNumber = user.phoneNumber;
        token.role = user.role;
      }

      if (account?.provider == "google") {
        console.log('google >')
        const data = {
          fullName: user.name,
          email: user.email,
          type: "google",
        };
        await looginWithGoogle(
          data,
          (data: any) => {
            token.email = data.email;
            token.fullName = data.fullName;
            token.role = data.role;
          }
        )
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullName" in token) {
        session.user.fullName = token.fullName;
      }
      if ("phoneNumber" in token) {
        session.user.phoneNumber = token.phoneNumber;
      }
      if ("password" in token) {
        session.user.password = token.password;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
