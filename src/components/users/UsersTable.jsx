import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Avatar } from "@nextui-org/react";

export const UsersTable = ({ users }) => {
  return (
    <Table aria-label="User Table">
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Apellido</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Género</TableColumn>
        <TableColumn>Role</TableColumn>
      </TableHeader>
      <TableBody>
        {
          users.map(user => (
            <TableRow key={user.login.uuid}>
              <TableCell className="flex items-center gap-3">
                <Avatar isBordered src={user.picture.thumbnail} size="sm"/>
                {`${user.name.title}. ${user.name.first}`}
              </TableCell>
              <TableCell>{`${user.name.last}`}</TableCell>
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