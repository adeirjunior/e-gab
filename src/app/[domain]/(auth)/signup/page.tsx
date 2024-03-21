import { getSession } from "@/lib/auth/get-session";
import Form from "./form";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getSession();

  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          Crie sua conta
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Ao ter sua conta você terá acesso a nossa ouvidoria, poderá realizar votações sobre propostas, e fazer denúncias para o político.
        </p>
        <Form />
      </div>
    </div>
  );
}
