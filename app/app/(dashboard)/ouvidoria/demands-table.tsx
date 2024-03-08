"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Maximize, Minimize } from "lucide-react";
import { columns } from "@/lib/data/demands";
import { Title } from "@tremor/react";
import { cn } from "@/lib/utils";
import {
  AcceptedChatRoomRequest,
  ChatRoom,
  Client,
  Politician,
  Secretary,
  User as UserType,
} from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import DemandsTableActions from "./demands-table-actions";

type DemandFormatted = ChatRoom & {
  clientAvatar: string;
  clientEmail: string;
  partnerAvatar: string;
  partnerEmail: string;
  from: Date;
  to: Date;
};

const today = (hour?: number, minutes?: number) => {
  const date = new Date()

  if(hour) {
    date.setHours(hour, minutes)
  }

  return date
}

export default function DemandsTable({ demands }: { demands: any }) {
  const handle = useFullScreenHandle();

  const demandsFormatted: DemandFormatted[] = demands.map(
    (
      demand: ChatRoom & { client: Client & { user: UserType } } & {
        politician: Politician & { user: UserType };
      } & { secretary: Secretary & { user: UserType } } & {
        acceptedRequest: AcceptedChatRoomRequest;
      },
    ) => ({
      ...demand,
      clientAvatar: demand.client.user.image,
      clientEmail: demand.client.user.email,
      clientName: demand.client.user.name,
      partnerAvatar:
        demand.politician.user.image || demand.secretary.user.image,
      partnerEmail: demand.politician.user.email || demand.secretary.user.email,
      partnerName: demand.politician.user.name || demand.secretary.user.name,
      from: demand.acceptedRequest.from,
      to: demand.acceptedRequest.to,
    }),
  );

  const renderCell = React.useCallback(
    (demandsFormatted: DemandFormatted, columnKey: React.Key) => {
      const cellValue = String(
        demandsFormatted[columnKey as keyof DemandFormatted],
      );

      switch (columnKey) {
        case "title":
          return <Title>{demandsFormatted.title}</Title>;
        case "clientName":
          return (
            <User
              avatarProps={{ radius: "lg", src: demandsFormatted.clientAvatar }}
              description={demandsFormatted.clientEmail}
              name={cellValue}
            >
              {demandsFormatted.clientEmail}
            </User>
          );
        case "partnerName":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: demandsFormatted.partnerAvatar,
              }}
              description={demandsFormatted.partnerEmail}
              name={cellValue}
            >
              {demandsFormatted.partnerEmail}
            </User>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                demandsFormatted.from > today()
                  ? "success"
                  : !demandsFormatted.to && demandsFormatted.from < today()
                    ? "danger"
                    : demandsFormatted.to && demandsFormatted.to < today(1, 0)
                      ? "danger"
                      : "warning"
              }
              size="sm"
              variant="flat"
            >
              {demandsFormatted.from > today()
                ? "Adiantado"
                : !demandsFormatted.to && demandsFormatted.from < today()
                  ? "Atrasado"
                  : demandsFormatted.to && demandsFormatted.to < today(1, 0)
                    ? "Atrasado"
                    : "Período previsto"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <DemandsTableActions
                isFullscreen={handle.active}
                demandsFormatted={demandsFormatted}
              />
            </div>
          );
        case "expected":
          return (
            <div className="relative flex items-center gap-2">
              <Title>
                {demandsFormatted.from &&
                  (!demandsFormatted.to ? (
                    <>
                      <p>
                        Em{" "}
                        {format(demandsFormatted.from, "P", {
                          locale: ptBR,
                        })}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Entre{" "}
                        {format(demandsFormatted.from, "P", {
                          locale: ptBR,
                        })}{" "}
                        e {format(demandsFormatted.to, "P", { locale: ptBR })}
                      </p>
                    </>
                  ))}
              </Title>
            </div>
          );
        default:
          return <Title>{cellValue}</Title>;
      }
    },
    [handle.active],
  );

  return (
    <FullScreen
      className={cn(
        "w-full",
        handle.active && "flex h-screen flex-col overflow-hidden p-6",
      )}
      handle={handle}
    >
      <Card className={cn(handle.active && "grow")}>
        <CardHeader>
          <Card
            className="mb-4 flex w-full flex-row items-center justify-between p-4"
            shadow="lg"
          >
            <Title>Demandas</Title>
            {handle.active ? (
              <Button
                className="relative float-right"
                isIconOnly
                onClick={handle.exit}
              >
                <Minimize />
              </Button>
            ) : (
              <Button
                className="relative float-right"
                isIconOnly
                onClick={handle.enter}
              >
                <Maximize />
              </Button>
            )}
          </Card>
        </CardHeader>
        <CardBody>
          <Table
            isStriped
            isHeaderSticky
            aria-label="Example table with custom cells"
            selectionMode="multiple"
            selectionBehavior="toggle"
            classNames={{
              base: cn(handle.active ? "h-full" : "max-h-[85vh]"),
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={demandsFormatted}>
              {(item: DemandFormatted) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </FullScreen>
  );
}
