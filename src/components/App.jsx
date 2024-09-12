import { useState } from "react";

import { Pagination } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

import { UsersTable } from "./users";

import { useGetUsers } from "../hooks/users";


export function App() {
  const { users, error, loading } = useGetUsers();

  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    pageSize: 10,
    offset: 0,
  });

  const [filters, setFilters] = useState({
    byText: "",
    rol: ""
  });

  const onPaginationChange = (newPage) => {
    const newOffset = (newPage - 1) * paginationInfo.pageSize;
    setPaginationInfo({...paginationInfo, currentPage: newPage, offset: newOffset});
  };

  const paginatedUsers = users.slice(paginationInfo.offset, paginationInfo.pageSize * paginationInfo.currentPage);

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Admin Users</h1>

      <div className="flex flex-col gap-1 mb-5">
        <p className="font-semibold">Filtros</p>
        <Input  placeholder="Busca por nombre, apellido o email" />
      </div>

      <UsersTable users={paginatedUsers} />

      <Pagination
        showControls
        loop
        variant="bordered"
        total={users.length / paginationInfo.pageSize}
        page={paginationInfo.currentPage}
        color="primary"
        className=" w-fit mx-auto mt-5"
        onChange={onPaginationChange}
      />
    </main>
  );
}
