import { Button, Card, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";
import { getAdminById } from "@/lib/fetchers/admin";
import AdminSettingGrid from "./admin-setting-grid";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const data = await getAdminById(id);

  if (!data) {
    notFound();
    return null;
  }

  const handleSubmit = async (formData: FormData) => {
    "use server"
    
    try {
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form action={handleSubmit} className="flex w-full flex-col gap-8">
      <Card className="flex w-full items-end justify-center rounded-none border-t-3 border-stone-700 bg-black p-4">
        <AdminSettingGrid data={data}><p>asdas</p></AdminSettingGrid>
        <Divider className="border-3 my-6" />
        <Button type="submit" variant="bordered" className="border-3">
          Salvar
        </Button>
      </Card>
    </form>
  );
}
