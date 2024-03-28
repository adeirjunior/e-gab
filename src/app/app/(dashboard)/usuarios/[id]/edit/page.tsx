import prisma from "@/lib/configs/prisma";
import { Button, Card, cn, Switch } from "@nextui-org/react";
import { notFound } from "next/navigation";
import AdminSettingSwitch from "./admin-setting-switch";
import { Grid } from "@tremor/react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: PageProps) {
    const { id } = params;

    const data = await prisma.admin.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!data) {
      notFound();
    }

  return (
    <div className="flex w-full flex-col gap-8">
      <Grid numItems={2} className="gap-4">
        <AdminSettingSwitch name="canViewPosts">Ver posts</AdminSettingSwitch>
        <AdminSettingSwitch name="canEditPosts">
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewLaws">Ver leis</AdminSettingSwitch>
        <AdminSettingSwitch name="canEditLaws">Editar leis</AdminSettingSwitch>
        <AdminSettingSwitch name="canViewProposals">
          Ver propostas
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditProposals">
          Editar propostas
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewPoll">Ver enquetes</AdminSettingSwitch>
        <AdminSettingSwitch name="canEditPoll">
          Editar enquetes
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewSurvey">
          Ver pesquisas
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditSurvey">
          Editar pesquisas
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewMotion">Ver moções</AdminSettingSwitch>
        <AdminSettingSwitch name="canEditMotion">
          Editar moções
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewChatRoom">
          Ver ouvidoria
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditChatRoom">
          Editar ouvidoria
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewAdmins">
          Ver usuários
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditAdmins">
          Editar usuáriso
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewArchives">
          Ver arquivos
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditArchives">
          Editar arquivos
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewGeralSettings">
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditGeralSettings">
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewDesignSettings">
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditDesignSettings">
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewDomainSettings">
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditDomainSettings">
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewContactSettings">
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditContactSettings">
          Editar posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canViewSocialMediaSettings">
          Ver posts
        </AdminSettingSwitch>
        <AdminSettingSwitch name="canEditSocialMediaSettings">
          Editar posts
        </AdminSettingSwitch>
      </Grid>
      <Card
        className="flex w-full items-end justify-center rounded-none border-t-3 border-stone-700 p-4 bg-black"
      >
        <Button variant="bordered" className="border-3">
          Salvar
        </Button>
      </Card>
    </div>
  );
}