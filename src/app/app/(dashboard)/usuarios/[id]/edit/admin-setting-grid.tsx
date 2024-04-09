"use client";

import { Admin, User } from "@prisma/client";
import {  useTransition } from "react";
import AdminSettingSwitch from "./admin-setting-switch";
import { updateOneAdminSettings } from "@/lib/actions/admin/admin.update";
import { toast } from "sonner";
import { Grid } from "@tremor/react";

export type Inputs = {
  canViewContents: boolean;
  canViewPosts: boolean;
  canEditPosts: boolean;
  canViewLaws: boolean;
  canEditLaws: boolean;
  canViewProposals: boolean;
  canEditProposals: boolean;
  canViewPoll: boolean;
  canEditPoll: boolean;
  canViewSurvey: boolean;
  canEditSurvey: boolean;
  canViewMotion: boolean;
  canEditMotion: boolean;
  canViewExpenses: boolean;
  canEditExpenses: boolean;
  canViewStatistics: boolean;
  canEditStatistics: boolean;
  canViewChatRoom: boolean;
  canEditChatRoom: boolean;
  canViewArchives: boolean;
  canEditArchives: boolean;
  canViewGeralSettings: boolean;
  canViewContactSettings: boolean;
  canEditContactSettings: boolean;
  canViewSocialMediaSettings: boolean;
  canEditSocialMediaSettings: boolean;
  canViewDesignSettings: boolean;
  canEditDesignSettings: boolean;
};

export default function AdminSettingGrid({
  data,
  id,
}: {
  data: Admin & { user: User };
  id: string;
}) {
  const [pending, start] = useTransition();

  const handleChange = (target: EventTarget & HTMLInputElement) => {
    try {
      toast(target.checked)
      start(async () => {
        const response = await updateOneAdminSettings(target.name, id, target.checked);

        if ("error" in response) {
          toast.error(JSON.stringify(response.error));
        }

      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid numItems={1} className="w-full gap-4">
      <AdminSettingSwitch
        name="canViewContents"
        defaultSelected={data.canViewContents}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Conteúdos
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewStatistics"
        defaultSelected={data.canViewStatistics}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Estatísticas
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewChatRoom"
        defaultSelected={data.canViewChatRoom}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Ouvidoria
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewPosts"
        defaultSelected={data.canViewPosts}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Posts
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewLaws"
        defaultSelected={data.canViewLaws}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Leis
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewProposals"
        defaultSelected={data.canViewLaws}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Propostas
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewPoll"
        defaultSelected={data.canViewPoll}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Enquetes
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewSurvey"
        defaultSelected={data.canViewPoll}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Pesquisas
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewMotion"
        defaultSelected={data.canViewPoll}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Moções
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewExpenses"
        defaultSelected={data.canViewExpenses}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Gastos
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewArchives"
        defaultSelected={data.canViewArchives}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Arquivos
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewGeralSettings"
        defaultSelected={data.canViewGeralSettings}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Configurações Gerais
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewContactSettings"
        defaultSelected={data.canViewContactSettings}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Configurações de Contato
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewSocialMediaSettings"
        defaultSelected={data.canViewSocialMediaSettings}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Configurações de Rede Social
      </AdminSettingSwitch>
      <AdminSettingSwitch
        name="canViewDesignSettings"
        defaultSelected={data.canViewDesignSettings}
        disabled={pending}
        onChange={(e) => handleChange(e.target)}
      >
        Ver Configurações de Aparência
      </AdminSettingSwitch>
    </Grid>
  );
}
