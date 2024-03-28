import { Button, Card } from "@nextui-org/react";
import { notFound } from "next/navigation";
import AdminSettingSwitch from "./admin-setting-switch";
import { Grid } from "@tremor/react";
import { getAdminById } from "@/lib/fetchers/admin";

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
      <Grid numItems={2} className="gap-4">
        <AdminSettingSwitch
          defaultSelected={data.canViewPosts}
          name="canViewPosts"
        >
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditPosts}
          name="canEditPosts"
        >
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewLaws}
          name="canViewLaws"
        >
          Ver leis
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditLaws}
          name="canEditLaws"
        >
          Editar leis
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewProposals}
          name="canViewProposals"
        >
          Ver propostas
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditProposals}
          name="canEditProposals"
        >
          Editar propostas
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewPoll}
          name="canViewPoll"
        >
          Ver enquetes
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditPoll}
          name="canEditPoll"
        >
          Editar enquetes
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewSurvey}
          name="canViewSurvey"
        >
          Ver pesquisas
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditSurvey}
          name="canEditSurvey"
        >
          Editar pesquisas
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewMotion}
          name="canViewMotion"
        >
          Ver moções
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditMotion}
          name="canEditMotion"
        >
          Editar moções
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewChatRoom}
          name="canViewChatRoom"
        >
          Ver ouvidoria
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditChatRoom}
          name="canEditChatRoom"
        >
          Editar ouvidoria
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewAdmins}
          name="canViewAdmins"
        >
          Ver usuários
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditAdmins}
          name="canEditAdmins"
        >
          Editar usuáriso
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewArchives}
          name="canViewArchives"
        >
          Ver arquivos
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditArchives}
          name="canEditArchives"
        >
          Editar arquivos
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewGeralSettings}
          name="canViewGeralSettings"
        >
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditGeralSettings}
          name="canEditGeralSettings"
        >
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewDesignSettings}
          name="canViewDesignSettings"
        >
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditDesignSettings}
          name="canEditDesignSettings"
        >
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewDomainSettings}
          name="canViewDomainSettings"
        >
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditDomainSettings}
          name="canEditDomainSettings"
        >
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewContactSettings}
          name="canViewContactSettings"
        >
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditContactSettings}
          name="canEditContactSettings"
        >
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canViewSocialMediaSettings}
          name="canViewSocialMediaSettings"
        >
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch
          defaultSelected={data.canEditSocialMediaSettings}
          name="canEditSocialMediaSettings"
        >
          Editar posts
        </AdminSettingSwitch>
      </Grid>
      <Card className="flex w-full items-end justify-center rounded-none border-t-3 border-stone-700 bg-black p-4">
        <Button type="submit" variant="bordered" className="border-3">
          Salvar
        </Button>
      </Card>
    </form>
  );
}
