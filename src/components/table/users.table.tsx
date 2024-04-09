"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  User,
  ChipProps,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Link
} from "@nextui-org/react";
import { columns } from "@/lib/data";
import { useCallback } from "react";
import { Admin as AdminType, User as UserType } from "@prisma/client";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

type Admin = AdminType & { user: UserType }

export default function UsersTable({ admins }: { admins: Admin[] }) {

  const renderCell = useCallback((admin: Admin, columnKey: React.Key) => {
    const cellValue = admin[columnKey as keyof Admin];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: admin.user.image }}
            description={admin.user.email}
            name={admin.user.name}
          >
            {admin.user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{admin.user.role}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{admin.user.email}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[String(admin.user.isActive)]}
            size="sm"
            variant="flat"
          >
            {String(admin.user.isActive)}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown className="border-1 border-default-200 bg-background">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem href={`/usuarios/${admin.id}`} as={Link}>
                  Ver
                </DropdownItem>
                <DropdownItem href={`/usuarios/${admin.id}/edit`} as={Link}>
                  Editar
                </DropdownItem>
                <DropdownItem>Deletar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
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
      <TableBody items={admins}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey) as unknown as any}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
