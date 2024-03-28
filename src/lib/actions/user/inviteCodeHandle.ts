"use server"

import { getSession } from "@/lib/auth/get-session";
import prisma from "@/lib/configs/prisma"
import { redirect } from "next/navigation";

export const inviteCodeHandle = async (formData: FormData) => {
    const session = await getSession();
    if(!session) {
        throw new Error("Not logged.")
    }
const inviteToken = formData.get("inviteToken") as string;

    try {
        const invitedUser = await prisma.userInvite.findUnique({
            where: {
                inviteToken
            }
        })
        const user = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                role:"admin",
                admin: {
                    create: {
                        websiteId: invitedUser?.websiteId!
                    }
                }
            }
        })

        redirect("/")
          
    } catch (error) {
        
    }
}