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
  Tooltip,
  ChipProps,
  getKeyValue,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { DeleteDocumentIcon } from "@/components/icons/DeleteDocumentIcon";
import { EditIcon, EyeIcon, Maximize, Minimize } from "lucide-react";
import { columns, users } from "@/lib/data";
import { Title } from "@tremor/react";
import { cn } from "@/lib/utils";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type User = (typeof users)[0];

export default function DemandsTable() {
  const handle = useFullScreenHandle();

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <DeleteDocumentIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
          <Card className="mb-4 flex flex-row items-center justify-between p-4 w-full">
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
            isHeaderSticky
            aria-label="Example table with custom cells"
            classNames={{
              base: cn(
                
                handle.active ? "h-full" : "max-h-[85vh]",
              ),
              table: "min-h-[420px]",
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
            <TableBody items={users}>
              {(item) => (
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
