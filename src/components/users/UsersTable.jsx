import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

import { ShieldCheckIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/24/solid";

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

export const UsersTable = ({ users, sortDescriptor, onSortChange, isLoadingInfo }) => {
  return (
    <Table
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
        <TableColumn>Role</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoadingInfo}
        loadingContent={<Spinner label="Loading..." />}
      >
        {
          users.map(user => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar isBordered src={user.profileImage} size="sm"/>
                {user.firstName}
              </TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="capitalize">{user.gender}</TableCell>
              <TableCell>
                <Chip variant="bordered" size="sm" {...getChipPropsByRole(user.role)}>
                  {user.role}
                </Chip>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};