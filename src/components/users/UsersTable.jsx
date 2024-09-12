import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Avatar } from "@nextui-org/react";

import { TABLE_KEYS } from "../../const";

export const UsersTable = ({ users, sortDescriptor, onSortChange }) => {

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
      <TableBody>
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
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
};