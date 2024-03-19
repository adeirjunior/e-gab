import Form from "@/components/form";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import { editUser } from "@/lib/actions/user/user.update.action";
import CurrentActivePlanCard from "@/components/card/current-active-plan-card";
import { getUserRole } from "@/lib/fetchers/user";
import ThemeSwitch from "@/components/theme-switch";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const userRole = await getUserRole(session.user.id);

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Configurações de Sistema
        </h1>
        <ThemeSwitch />
      </div>
    </div>
  );
}
