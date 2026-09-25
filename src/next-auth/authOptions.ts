import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "myLogin",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your Email",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",

            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),

            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Invalid email or password");
        }

        const payload = await response.json();


        const userData: { id: string } = jwtDecode(payload.token);

        return {
          id: userData.id,
          name: payload.user.name,
          email: payload.user.email,
          token: payload.token,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }


      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.token = token.token;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};