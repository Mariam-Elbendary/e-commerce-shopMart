import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookie = await cookies();

  const nextAuthToken =
    cookie.get("next-auth.session-token")?.value ||
    cookie.get("__Secure-next-auth.session-token")?.value;

  const token = await decode({
    token: nextAuthToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
}