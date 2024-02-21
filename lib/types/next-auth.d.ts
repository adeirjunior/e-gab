import { UserRole } from "@prisma/client";
import type { User } from "next-auth";
import "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    user: User & {
      id: UserId;
      role: userRole;
      stripeCustomerId: string;
      username: string;
      gh_username: string;
      image: string | null;
      email: string;
    };
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: UserRole;
      stripeCustomerId: string;
      username: string;
    };
  }
}
