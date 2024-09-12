import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { Avatar } from "@nextui-org/react";

import { useGetUsers } from "../hooks/users";

export function App() {
  const { users, error, loading } = useGetUsers();

  return (
    <main className="p-5">
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
                  <Avatar isBordered src={user.picture.thumbnail} size="sm" />
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
    </main>
  );
}
