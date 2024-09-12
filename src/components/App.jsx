import { useState } from "react";

import { Pagination } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { MagnifyingGlassIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

import { UsersTable } from "./users";

import { useGetUsers } from "../hooks/users";

import { ROLES, GENDERS } from "../const";
import {UserIcon} from "@heroicons/react/24/solid/index.js";

export function App() {
  const { users, error, loading } = useGetUsers();

  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    pageSize: 10,
    offset: 0,
  });

  const [filters, setFilters] = useState({
    byText: "",
    byRole: "",
    byGender: "",
  });

  const onFilterByText = (newText) => {
    setFilters({...filters, byText: newText});
  };

  const onFilterByRole = (event) => {
    const newRole = ROLES[event.target.value] ?? "";
    setFilters({...filters, byRole: newRole});
  };

  const onFilterByGender = (event) => {
    const newGender = GENDERS[event.target.value] ?? "";
    setFilters({...filters, byGender: newGender});
  };

  let filteredUsers = [...users];

  if (filters.byText !== "") {
    filteredUsers = filteredUsers.filter(user => {
      const lowerCaseName = `${user.name.title}. ${user.name.first}`.toLowerCase();
      const lowerCaseLastName = user.name.last.toLowerCase();
      const lowerCaseEmail = user.email.toLowerCase();

      const lowerCaseSearch = filters.byText.trim().toLowerCase();

      return (
        lowerCaseName.includes(lowerCaseSearch) ||
        lowerCaseLastName.includes(lowerCaseSearch) ||
        lowerCaseEmail.includes(lowerCaseSearch)
      );
    });
  }

  if (filters.byRole !== "") {
    filteredUsers = filteredUsers.filter(user => user.role === filters.byRole);
  }

  if (filters.byGender !== "") {
    filteredUsers = filteredUsers.filter(user => user.gender === filters.byGender);
  }

  const onPaginationChange = (newPage) => {
    const newOffset = (newPage - 1) * paginationInfo.pageSize;
    setPaginationInfo({...paginationInfo, currentPage: newPage, offset: newOffset});
  };

  const paginatedUsers = filteredUsers.slice(paginationInfo.offset, paginationInfo.pageSize * paginationInfo.currentPage);

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Admin Users</h1>

      <div className="flex flex-col gap-2 mb-5">
        <p className="font-semibold">Filtros</p>

        <Input
          startContent={<MagnifyingGlassIcon className="size-6" />}
          placeholder="Filtra por nombre, apellido o email"
          onValueChange={onFilterByText}
          value={filters.byText}
        />

        <Select
          startContent={<AcademicCapIcon className="size-6" />}
          placeholder="Filtra por rol"
          onChange={onFilterByRole}
        >
          {
            Object.keys(ROLES).map(key => (
              <SelectItem key={key}
              >
                {ROLES[key]}
              </SelectItem>
            ))
          }
        </Select>

        <Select
          startContent={<UserIcon className="size-6" />}
          placeholder="Filtra por género"
          onChange={onFilterByGender}
        >
          {
            Object.keys(GENDERS).map(key => (
              <SelectItem
                key={key}
                className="capitalize"
              >
                {GENDERS[key]}
              </SelectItem>
            ))
          }
        </Select>
      </div>
      <UsersTable users={paginatedUsers} />

      <Pagination
        showControls
        loop
        variant="bordered"
        total={filteredUsers.length / paginationInfo.pageSize}
        page={paginationInfo.currentPage}
        color="primary"
        className=" w-fit mx-auto mt-5"
        onChange={onPaginationChange}
      />
    </main>
  );
}
