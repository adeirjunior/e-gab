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
    </Grid>
  );
}
