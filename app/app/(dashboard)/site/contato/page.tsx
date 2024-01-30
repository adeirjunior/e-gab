import { Input } from "@nextui-org/react";
import ContactButton from "./button";
import prisma from "@/lib/configs/prisma";
import { getSession } from "@/lib/auth/get-session";
import { getWebsiteByUserId } from "@/lib/fetchers/site";

export default async function Page() {
  const session = await getSession();
  const website = await getWebsiteByUserId(session?.user.id!);

  const handleEmailClick = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;

    await prisma.contact.update({
      data: {
        email,
      },
      where: {
        id: website?.contactId,
      },
    });
  };

  const handlePhoneClick = async (formData: FormData) => {
    "use server";
    const phone = formData.get("phone") as string;

    await prisma.contact.update({
      data: {
        phone
      },
      where: {
        id: website?.contactId,
      },
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <form
        action={handleEmailClick}
        className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
      >
        <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
          <h2 className="font-cal text-xl dark:text-white">Email</h2>
          <Input
            variant="bordered"
            name="email"
            isRequired
            type="email"
            placeholder="Escreva aqui o email"
            className="z-10 flex-1 border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Seu plano atual.
          </p>
          <ContactButton />
        </div>
      </form>
      <form
        action={handlePhoneClick}
        className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
      >
        <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
          <h2 className="font-cal text-xl dark:text-white">Número</h2>
          <Input
            variant="bordered"
            name="phone"
            isRequired
            type="tel"
            placeholder="Escreva aqui o número"
            className="z-10 flex-1 border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 dark:border-stone-700 dark:bg-stone-800">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Seu plano atual.
          </p>
          <ContactButton />
        </div>
      </form>
    </div>
  );
}
