'use server'

import { ChangeMyPasswordFormData, ChangePasswordFormData, VerifyCodeFormData } from "@/schemas/changePasswordSchema";
import { LoginFormData, loginFormDataEmailOnly } from "@/schemas/loginSchema";
import { RegisterFormData } from "@/schemas/registerSchema";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/next-auth/authOptions";
export async function userRegister(data : RegisterFormData ){ 
 try {
   const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup' , {
      method: "POST",
      body : JSON.stringify(data),
      headers :{
        'Content-Type' : 'application/json'
      }

    })
  const payload = await response.json();
     return response.ok
  
} catch (error) {
  throw error
}
}



export async function userLogin(data: LoginFormData) { 
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }

    })
    const payload = await response.json();
    if (response.ok) {
      const cookie = await cookies()
      cookie.set('userToken', payload.token, {
        httpOnly: true
      })
    }

  } catch (error) {
    throw error
  }

} 

export async function forgotPassword(data: loginFormDataEmailOnly) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const payload = await response.json();

  return {
    success: response.ok,
    data: payload,
  };
}
export async function verifyCode(data: VerifyCodeFormData) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const payload = await response.json();

  return {
    success: response.ok,
    data: payload,
  };
}
export async function changePass(data: {
  email: string;
  newPassword: string;
}) {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const payload = await response.json();

  return {
    success: response.ok,
    data: payload,
  };
}

export async function changeMyPassword(data: ChangeMyPasswordFormData) {
const session = await getServerSession(authOptions) as {user?: { token?: string}}

const token = session?.user?.token

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        password: data.password,
        rePassword: data.confirmPassword,
      }),
    }
  );

  const payload = await response.json();
  return {
    success: response.ok,
    data: payload,
  };
}