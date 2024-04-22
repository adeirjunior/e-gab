import { getSession } from "@/lib/auth/get-session";
import { Divider } from "@nextui-org/react";
import { Bold } from "@tremor/react";
import { redirect } from "next/navigation";

export default async function VerifyAlert() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <div className="w-full">
        <div className="space-y-1 px-8 pt-6">
          <h2 className="text-medium font-medium">Verifique seu email</h2>
          <p className="text-small text-default-400">
            Vá para sua conta de email <Bold>{`(${session.user.email})`}</Bold>{" "}
            e clique no link enviado para o verificar.
          </p>
        </div>
      </div>
      <Divider className="my-4" />
    </div>
  );
}
