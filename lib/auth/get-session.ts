"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "./config";

export async function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
      stripeCustomerId: string;
    };
  } | null>;
}
