import { useState, useMemo, useCallback, useEffect } from "react";

import { Pagination } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,  ModalFooter} from "@nextui-org/modal";

import { MagnifyingGlassIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

import { UsersTable } from "./users";
import { DarkModeSwitch } from "./DarkModeSwitch";

import { useGetUsers, useUserFilters, useUserSorting } from "../hooks/users";

import { ROLES, GENDERS } from "../const";
import { UserIcon } from "@heroicons/react/24/solid/index.js";

export function App() {
  const { users, error, loading, deleteUser } = useGetUsers();
  const { filters,
    onFilterByText, filterByText,
    onFilterByRole, filterByRole,
    onFilterByGender, filterByGender
  } = useUserFilters();
  const { sort, onSortChange, sortDescriptor } = useUserSorting();

  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    pageSize: 10,
    offset: 0,
  });

  // Primero ordenamos
  const sortedUsers = useMemo(() => {;
    return sort([...users]);
  }, [users, sortDescriptor]);

  // Luego filtramos
  const filteredUsers = useMemo(() => {
    let results = sortedUsers;
    if (filters.byText !== "") results = filterByText(results);
    if (filters.byRole !== "") results = filterByRole(results);
    if (filters.byGender !== "")  results = filterByGender(results);
    return results;
  }, [sortedUsers, filters]);

  // Y finalmente generamos la paginación a mostrar en la tabla
  // no es necesario agregar users en todos la memorización por cascada se recalcula
  const paginatedUsers = useMemo(() => {
    const start = paginationInfo.offset;
    const end = paginationInfo.pageSize * paginationInfo.currentPage;
    return filteredUsers.slice(start, end);
  }, [filteredUsers, paginationInfo]);

  const onPaginationChange = useCallback((newPage) => {
    const newOffset = (newPage - 1) * paginationInfo.pageSize;
    setPaginationInfo(prev => ({...prev, currentPage: newPage, offset: newOffset}));
  }, [paginationInfo.pageSize]);

  const changePageSizeChange = (newPageSize) => {
    setPaginationInfo({...paginationInfo, pageSize: newPageSize, currentPage: 1, offset: 0});
  };

  useEffect(() => {
    setPaginationInfo(prev => ({...prev, currentPage: 1, offset: 0}));
  }, [filteredUsers.length]);

  return (
    <>
      <header className="w-full flex justify-end p-5">
        <DarkModeSwitch />
      </header>

      <main className="p-5 min-h-dvh">
        <h1 className="text-2xl font-bold text-center mb-5">Admin Users</h1>

        <div className="mb-5">
          <p className="font-semibold mb-2">Filtros</p>

          <fieldset className="flex flex-col gap-2 md:flex-row">
            <Input
              className="md:flex-1"
              startContent={<MagnifyingGlassIcon className="size-6"/>}
              placeholder="Filtra por nombre, apellido o email"
              onValueChange={onFilterByText}
              value={filters.byText}
            />

            <Select
              aria-label="Filtra por rol"
              className="md:flex-1"
              startContent={<AcademicCapIcon className="size-6"/>}
              placeholder="Filtra por rol"
              onChange={onFilterByRole}
              selectedKeys={[Object.keys(ROLES).find(key => ROLES[key] === filters.byRole)]}
            >
              {
                Object.keys(ROLES).map(key => (
                  <SelectItem key={key}>
                    {ROLES[key]}
                  </SelectItem>
                ))
              }
            </Select>

            <Select
              aria-label="Filtra por género"
              className="md:flex-1"
              startContent={<UserIcon className="size-6"/>}
              placeholder="Filtra por género"
              onChange={onFilterByGender}
              selectedKeys={[Object.keys(GENDERS).find(key => GENDERS[key] === filters.byGender)]}
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
          </fieldset>
        </div>

        <div>

        </div>
        <UsersTable
          users={paginatedUsers}
          isLoadingInfo={loading}
          onSortChange={onSortChange}
          sortDescriptor={sortDescriptor}
          deleteUserFunc={deleteUser}
        />

        <div className="flex flex-col items-center md:items-start gap-1 mt-3">
          <span className="font-semibold text-sm">Elementos por página</span>
          <ButtonGroup variant="bordered">
            <Button
              className="font-semibold"
              size="sm"
              color={paginationInfo.pageSize === 10 ? "primary" : "default"}
              onPress={() => changePageSizeChange(10)}
            >
              10
            </Button>
            <Button
              className="font-semibold"
              size="sm"
              color={paginationInfo.pageSize === 20 ? "primary" : "default"}
              onPress={() => changePageSizeChange(20)}
            >
              20
            </Button>
            <Button
              className="font-semibold"
              size="sm"
              color={paginationInfo.pageSize === 50 ? "primary" : "default"}
              onPress={() => changePageSizeChange(50)}
            >
              50
            </Button>
          </ButtonGroup>
        </div>

        <Pagination
          showControls
          loop
          variant="bordered"
          total={Math.ceil(filteredUsers.length / paginationInfo.pageSize)}
          page={paginationInfo.currentPage}
          color="primary"
          className=" w-fit mx-auto mt-5"
          onChange={onPaginationChange}
        />
      </main>
    </>
  );
}
