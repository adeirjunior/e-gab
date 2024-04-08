"use client";

import { Accordion, AccordionItem, Switch } from "@nextui-org/react";
import { Admin, User } from "@prisma/client";
import { Grid } from "@tremor/react";
import { ReactNode } from "react";
import AdminSettingSwitch from "./admin-setting-switch";

export default function AdminSettingGrid({
  data,
  children,
}: {
  data: Admin & { user: User };
  children?: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full space-y-6">
      <Accordion
        defaultSelectedKeys={"all"}
        className="w-full"
        variant="splitted"
        title="Configurações"
      >
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch name="canViewContents" defaultSelected={data.canViewContents} />}
          title="Ver Conteúdos"
        > 
          <Grid numItems={2} className="gap-4">
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={
                  <Switch
                    name="canViewPosts"
                    defaultSelected={data.canViewPosts}
                  />
                }
                title="Ver Posts"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditPosts}
                  name="canEditPosts"
                >
                  Editar Posts
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch defaultSelected={data.canViewLaws} />}
                title="Ver Leis"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditLaws}
                  name="canEditLaws"
                >
                  Editar Leis
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch defaultSelected={data.canViewProposals} />}
                title="Ver Propostas"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditProposals}
                  name="canEditProposals"
                >
                  Editar Propostas
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch defaultSelected={data.canViewPoll} />}
                title="Ver Enquetes"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditPoll}
                  name="canEditPoll"
                >
                  Editar Enquetes
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch defaultSelected={data.canViewSurvey} />}
                title="Ver Pesquisas"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditSurvey}
                  name="canEditSurvey"
                >
                  Editar Pesquisas
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch defaultSelected={data.canViewMotion} />}
                title="Ver Moções"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditMotion}
                  name="canEditMotion"
                >
                  Editar Moções
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
          </Grid>
        </AccordionItem>
      </Accordion>
      <Accordion
        defaultSelectedKeys={"all"}
        className="w-full"
        variant="splitted"
        title="Configurações"
      >
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch defaultSelected={data.canViewExpenses} />}
          title="Ver Gastos"
        >
          <AdminSettingSwitch
            defaultSelected={data.canEditExpenses}
            name="canEditExpenses"
          >
            Editar Gastos
          </AdminSettingSwitch>
        </AccordionItem>
      </Accordion>
      <Accordion
        defaultSelectedKeys={"all"}
        className="w-full"
        variant="splitted"
        title="Configurações"
      >
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch defaultSelected={data.canViewStatistics} />}
          title="Ver Estatísticas"
        >
          <AdminSettingSwitch
            defaultSelected={data.canEditStatistics}
            name="canEditStatistics"
          >
            Editar Estatísticas
          </AdminSettingSwitch>
        </AccordionItem>
      </Accordion>
      <Accordion
        defaultSelectedKeys={"all"}
        className="w-full"
        variant="splitted"
        title="Configurações"
      >
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch defaultSelected={data.canViewChatRoom} />}
          title="Ver Ouvidoria"
        >
          <AdminSettingSwitch
            defaultSelected={data.canEditChatRoom}
            name="canEditChatRoom"
          >
            Editar Ouvidoria
          </AdminSettingSwitch>
        </AccordionItem>
      </Accordion>
      <Accordion
        defaultSelectedKeys={"all"}
        className="w-full"
        variant="splitted"
        title="Configurações"
      >
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch defaultSelected={data.canViewArchives} />}
          title="Ver Arquivos"
        >
          <AdminSettingSwitch
            defaultSelected={data.canEditArchives}
            name="canEditArchives"
          >
            Editar Arquivos
          </AdminSettingSwitch>
        </AccordionItem>
      </Accordion>
      <Accordion
        defaultSelectedKeys={"all"}
        className="w-full"
        variant="splitted"
        title="Configurações"
      >
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch defaultSelected={data.canViewGeralSettings} />}
          title="Ver Configurações do Site"
        >
          <Grid numItems={2} className="gap-4">
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={
                  <Switch defaultSelected={data.canViewContactSettings} />
                }
                title="Ver Contatos"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditContactSettings}
                  name="canEditContactSettings"
                >
                  Editar Contatos
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={
                  <Switch defaultSelected={data.canViewSocialMediaSettings} />
                }
                title="Ver Redes Sociais"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditSocialMediaSettings}
                  name="canEditSocialMediaSettings"
                >
                  Editar Redes Sociais
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion defaultSelectedKeys={"all"}>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch defaultSelected={data.canViewProposals} />}
                title="Ver Design"
              >
                <AdminSettingSwitch
                  defaultSelected={data.canEditProposals}
                  name="canEditProposals"
                >
                  Editar Design
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
          </Grid>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
