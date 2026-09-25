import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req : NextRequest){

    const protectedPages = [
  '/cart',
  '/wishList',
  '/profile',
  '/checkout',
  '/address',
  '/allorders'
]
    const authPages = ['/login' , '/register' ]

    const pathName = req.nextUrl.pathname;
    const myToken = await getToken({
        req : req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV==='production',
        
        
    })

    const accessToken = myToken?.token;
    if(!accessToken && protectedPages.some((path)=> pathName.startsWith(path))){
           
        return NextResponse.redirect(new URL('/login' , req.nextUrl))
    }

     if(accessToken && authPages.some((path)=> pathName.startsWith(path))){
           
        return NextResponse.redirect(new URL('/' , req.nextUrl))
    }

    return NextResponse.next()
}



export const config = {
  
  matcher: [
    '/cart/:path*',
    '/wishList/:path*',
    '/profile/:path*',
    '/checkout/:path*',
    '/address/:path*',
    '/allorders/:path*',
    '/login/:path*',
    '/register/:path*',
  ]

}