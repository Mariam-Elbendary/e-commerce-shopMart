import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/page";
import TopNav from "./_components/topNav/TopNav"
import MyProvider from "./_components/myProvider/MyProvider";
import { Toaster } from "react-hot-toast";
import Providers from "./_components/tanstackProvider/TanstackQueryProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopMart",
  description: "Shop your favorite products",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body>
        <Providers>
        <MyProvider>
          <TopNav />
        <Navbar/>
        {children}
        <Footer/>
        </MyProvider>
         <Toaster position="top-right" />
        </Providers>
        </body>
     
    </html>
  );
}
