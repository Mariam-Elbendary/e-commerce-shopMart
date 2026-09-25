import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest , {params} :{params : {id :string}}) {
  const token = await getToken({
    req: req,
  });

  if (!token) {
    return NextResponse.json(
      { message: "unauthorized" },
      { status: 401 }
    );
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${params.id}`,
    {
      headers: {
        "Content-Type": "application/json",
        token: token.token,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: "unauthorized" },
      { status: 401 }
    );
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}

