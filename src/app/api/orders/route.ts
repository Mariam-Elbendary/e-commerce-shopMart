import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req: req,
  });

  if (!token) {
    return NextResponse.json(
      { message: "unauthorized" },
      { status: 401 }
    );
  }

  const userId = token.id;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        token: token.token,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 400 }
    );
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}