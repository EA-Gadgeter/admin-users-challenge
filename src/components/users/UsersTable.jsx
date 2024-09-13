import { useState, useContext } from "react";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

import { PencilSquareIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";

import { AuthContext } from "../../context/authContext";

import { EditUserFormModal } from "./EditUserFormModal";
import { DetailUserModal } from "./DetailUserModal";

import { getChipPropsByRole } from "../../helpers/getChipPropsByRole";

import { TABLE_KEYS, ROLES } from "../../const";

export const UsersTable = ({ users, sortDescriptor, onSortChange, isLoadingInfo, deleteUserFunc, onEditUser }) => {
  const { isOpen: isEditOpen, onOpenChange: onOpenChangeEdit, onClose: onCloseEdit, onOpen: onOpenEdit } = useDisclosure();
  const { isOpen: isDetailOpen, onOpenChange: onOpenChangeDetail, onClose: onCloseDetail, onOpen: onOpenDetail } = useDisclosure();

  const { authInfo } = useContext(AuthContext);

  const [selectedUserData, setSelectedUserData] = useState(null);

  const onEditUserInfo = (userData) => {
    setSelectedUserData(userData);
    onOpenEdit();
  };

  const onShowDetailUserInfo = (userData) => {
    setSelectedUserData(userData);
    onOpenDetail();
  };

  return (
    <>
      <EditUserFormModal
        isOpen={isEditOpen}
        onOpenChange={onOpenChangeEdit}
        onClose={onCloseEdit}
        userData={selectedUserData}
        onEditUser={onEditUser}
      />

      <DetailUserModal
        isOpen={isDetailOpen}
        userData={selectedUserData}
        onOpenChange={onOpenChangeDetail}
        onClose={onCloseDetail}
      />

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
                      <EyeIcon
                        className="size-6 text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => onShowDetailUserInfo(item)}
                      />
                    </Tooltip>
                    <Tooltip content={authInfo.role === ROLES.ADMIN ? "Editar usuario" : 'Solo un usuario "Admin" puede editar usuarios'}>
                      <PencilSquareIcon
                        className={`
                          size-6 text-default-400
                          ${authInfo.role === ROLES.ADMIN ? "cursor-pointer active:opacity-50" : "cursor-not-allowed opacity-35" }`
                        }
                        onClick={authInfo.role === ROLES.ADMIN ? () => onEditUserInfo(item) : () => {}}
                      />
                    </Tooltip>
                    <Tooltip color="danger" content={authInfo.role === ROLES.ADMIN ? "Editar usuario" : 'Solo un usuario "Admin" puede eliminar usuarios'}>
                      <TrashIcon
                        className={`
                          size-6 text-danger
                          ${authInfo.role === ROLES.ADMIN ? "cursor-pointer active:opacity-50" : "cursor-not-allowed opacity-35" }`
                        }
                        onClick={authInfo.role === ROLES.ADMIN  ? () => deleteUserFunc(item.id): () => {}}
                      />
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </>
  );
};