import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

import { ShieldCheckIcon, PencilSquareIcon, UserIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";

import { TABLE_KEYS, ROLES } from "../../const";


const getChipPropsByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return { color: "warning", startContent: <ShieldCheckIcon className="size-3.5" /> };
    case ROLES.EDITOR:
      return { color: "secondary", startContent: <PencilSquareIcon className="size-3.5" /> };
    case ROLES.VIEWER:
      return { color: "primary", startContent: <UserIcon className="size-3.5" /> };
  }
};

export const UsersTable = ({ users, sortDescriptor, onSortChange, isLoadingInfo, deleteUserFunc }) => {
  return (
    <Table
      classNames={{
        wrapper: "max-h-[800px]",
      }}
      isHeaderSticky
      isStriped
      aria-label="User Table"
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    >
      <TableHeader>
        <TableColumn key={TABLE_KEYS.FIRST_NAME} allowsSorting>Nombre</TableColumn>
        <TableColumn key={TABLE_KEYS.LAST_NAME} allowsSorting>Apellido</TableColumn>
        <TableColumn key={TABLE_KEYS.EMAIL} allowsSorting>Email</TableColumn>
        <TableColumn>Género</TableColumn>
        <TableColumn>Rol</TableColumn>
        <TableColumn>{""}</TableColumn>
      </TableHeader>
      <TableBody
        items={users}
        isLoading={isLoadingInfo}
        loadingContent={<Spinner label="Loading..." />}
        emptyContent="Sin información que mostrar"
      >
        {
          (item) => (
            <TableRow key={item.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar isBordered src={item.profileImage} size="sm"/>
                {item.firstName}
              </TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell className="capitalize">{item.gender}</TableCell>
              <TableCell>
                <Chip variant="bordered" size="sm" {...getChipPropsByRole(item.role)}>
                  {item.role}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Detalles">
                    <EyeIcon className="size-6 text-default-400 cursor-pointer active:opacity-50"/>
                  </Tooltip>
                  <Tooltip content="Editar usuario">
                    <PencilSquareIcon className="size-6 text-default-400 cursor-pointer active:opacity-50"/>
                  </Tooltip>
                  <Tooltip color="danger" content="Borrar usuario">
                    <TrashIcon
                      className="size-6 text-danger cursor-pointer active:opacity-50"
                      onClick={() => deleteUserFunc(item.id)}
                    />
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
};