"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./config";
import { UserRole } from "@prisma/client";

export type userSession = {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string;
    stripeCustomerId: string;
    role: UserRole;
  };
};

export async function getSession() {
  return getServerSession(authOptions) as Promise<userSession | null>;
}
