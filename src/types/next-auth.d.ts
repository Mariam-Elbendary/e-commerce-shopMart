declare module "next-auth" {
  interface User {
    id: string;
    token: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string;
  }
}
