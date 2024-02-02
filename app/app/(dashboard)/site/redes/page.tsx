import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { AtSign, Instagram, Youtube } from "lucide-react";
import Facebook from "@/components/website/svg/facebook.svg";
import Tiktok from "@/components/website/svg/tiktok.svg";
import Twitter from "@/components/website/svg/twitter.svg";
import { getSession } from "@/lib/auth/get-session";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/configs/prisma";
import { getPoliticianSiteByUser } from "@/lib/fetchers/site";
import CreateSocialForm from "@/components/form/create-social-form";
import { Suspense } from "react";
import SocialMediaCard from "@/components/card/social-card";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    return redirect("/login");
  }
  const data = await getPoliticianSiteByUser(session.user.id);

  if (!data) {
    notFound();
  }

  const socials = await prisma.socialMedia.findMany({
    where: {
      websiteId: data.id,
    },
  });
  return (
    <div>
      <Card shadow="lg" className="w-full p-6">
        <CreateSocialForm />
        <div className="w-full">
          <h2 className="font-cal mb-0 truncate text-xl font-bold dark:text-white sm:w-auto sm:text-xl lg:text-3xl">
            Redes Sociais Adicionadas
          </h2>
        </div>
        <Suspense
          fallback={
            <div className="h-72 w-full animate-pulse rounded-xl bg-slate-500"></div>
          }
        >
          <SocialMediaCard data={socials} />
        </Suspense>
      </Card>
    </div>
  );
}
