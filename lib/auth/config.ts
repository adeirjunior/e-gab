import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/configs/prisma";
import Credentials from "next-auth/providers/credentials";
import { UserRole } from "@prisma/client";
import { AuthenticatedUser } from "../types";
import { ErrorType, userService } from "../services/user.service";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

type UserCredentialsConfig<T> = {
  name: string;
  credentials: T;
  authorize: (
    credentials: Record<string, string> | undefined,
    req: any,
  ) => Promise<any>; // ajuste de acordo com sua implementação real
};

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "string" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req,
      ): Promise<AuthenticatedUser | ErrorType> {
        const { email, password, role } = credentials as {
          email: string;
          password: string;
          role: UserRole;
        };

        try {
          const user = await userService.authenticate(email, password);

          if ("error" in user) {
            return {
              error: user.error,
            };
          }

          return user as AuthenticatedUser;
        } catch (error) {
          return { error } as ErrorType;
        }
      },
    } as UserCredentialsConfig<{
      email: { label: string; type: string; placeholder: string };
      password: { label: string; type: string };
      role: { label: string; type: string };
    }>),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
    newUser: "/new",
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    async signIn({ user }) {
      const isNotFound = "error" in user;

      if (isNotFound) return false;

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        // @ts-expect-error
        stripeCustomerId: token?.user?.stripeCustomerId,
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
};
