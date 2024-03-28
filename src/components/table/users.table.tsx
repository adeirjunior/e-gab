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
  Tooltip,
} from "@nextui-org/react";
import { columns } from "@/lib/data";
import { useCallback } from "react";
import { Admin as AdminType, User as UserType } from "@prisma/client";
import { DeleteIcon, EditIcon, EyeIcon } from "lucide-react";

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
            <p className="text-bold text-sm capitalize">{admin.user.email}</p>
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
                <DeleteIcon />
              </span>
            </Tooltip>
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
