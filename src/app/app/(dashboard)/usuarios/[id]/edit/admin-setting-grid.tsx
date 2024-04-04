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
    <Grid numItems={2} className="w-full gap-4">
      <Accordion className="w-full" variant="splitted" title="Configurações">
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch />}
          title="Ver Conteúdos"
        >
          <Grid numItems={2} className="gap-4">
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Posts"
              >
                <AdminSettingSwitch name="canEditPosts">
                  Editar Posts
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Leis"
              >
                <AdminSettingSwitch name="canEditLaws">
                  Editar Leis
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Propostas"
              >
                <AdminSettingSwitch name="canEditProposals">
                  Editar Propostas
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Enquetes"
              >
                <AdminSettingSwitch name="canEditPoll">
                  Editar Enquetes
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Pesquisas"
              >
                <AdminSettingSwitch name="canEditSurvey">
                  Editar Pesquisas
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Moções"
              >
                <AdminSettingSwitch name="canEditMotion">
                  Editar Moções
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
          </Grid>
        </AccordionItem>
      </Accordion>
      <Accordion className="w-full" variant="splitted" title="Configurações">
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch />}
          title="Ver Gastos"
        >
          <AdminSettingSwitch name="canEditExpenses">
            Editar Gastos
          </AdminSettingSwitch>
        </AccordionItem>
      </Accordion>
      <Accordion className="w-full" variant="splitted" title="Configurações">
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch />}
          title="Ver Estatísticas"
        >
          <AdminSettingSwitch name="canEditStatistics">
            Editar Estatísticas
          </AdminSettingSwitch>
        </AccordionItem>
      </Accordion>
      <Accordion className="w-full" variant="splitted" title="Configurações">
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch />}
          title="Ver Ouvidoria"
        >
          <AdminSettingSwitch name="canEditChatRoom">
            Editar Ouvidoria
          </AdminSettingSwitch>
        </AccordionItem>
      </Accordion>
      <Accordion className="w-full" variant="splitted" title="Configurações">
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch />}
          title="Ver Arquivos"
        >
          <AdminSettingSwitch name="canEditArchives">
            Editar Arquivos
          </AdminSettingSwitch>
        </AccordionItem>
      </Accordion>
      <Accordion className="w-full" variant="splitted" title="Configurações">
        <AccordionItem
          disableIndicatorAnimation
          indicator={<Switch />}
          title="Ver Configurações do Site"
        >
          <Grid numItems={2} className="gap-4">
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Contatos"
              >
                <AdminSettingSwitch name="canEditPosts">
                  Editar Contatos
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Redes Sociais"
              >
                <AdminSettingSwitch name="canEditLaws">
                  Editar Redes Sociais
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
            <Accordion>
              <AccordionItem
                disableIndicatorAnimation
                indicator={<Switch />}
                title="Ver Design"
              >
                <AdminSettingSwitch name="canEditProposals">
                  Editar Design
                </AdminSettingSwitch>
              </AccordionItem>
            </Accordion>
          </Grid>
        </AccordionItem>
      </Accordion>
    </Grid>
  );
}
