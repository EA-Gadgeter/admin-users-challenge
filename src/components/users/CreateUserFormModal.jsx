import { useId, useContext } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

import { DocumentCheckIcon, UserPlusIcon } from "@heroicons/react/24/solid";

import { AuthContext } from "../../context/authContext";

import { GENDERS, ROLES } from "../../const";

export const CreateUserFormModal = ({ onSaveUser }) => {
  const usersFormModalId = useId();

  const { authInfo } = useContext(AuthContext);

  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

  const onHandleSubmit = (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target).entries());
    data.role = ROLES[data.role];
    data.gender = GENDERS[data.gender];
    onSaveUser(data);
    onClose();
  };

  return (
    <>
      {
        authInfo.role === ROLES.ADMIN ? (
          <Button
            className="w-full font-semibold text-white"
            color="success"
            onPress={onOpen}
            endContent={<UserPlusIcon className="size-6" />}
          >
            Agregar Usuario
          </Button>
        ) : (
          <Tooltip color="warning" content='Solo un usuario "Admin" puede crear usuarios'>
            <Button
              className="w-full font-semibold text-white"
              color="warning"
              endContent={<UserPlusIcon className="size-6" />}
            >
              Agregar Usuario
            </Button>
          </Tooltip>
        )
      }

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Agregar Usuario
              </ModalHeader>

              <ModalBody>
                <form className="flex flex-col gap-3" onSubmit={onHandleSubmit} id={usersFormModalId}>
                  <Input
                    placeholder="John"
                    label="Nombre"
                    name="firstName"
                    isRequired
                    validationBehavior="native"
                  />
                  <Input
                    placeholder="Doe"
                    label="Apellido"
                    name="lastName"
                    isRequired
                    validationBehavior="native"
                  />
                  <Input
                    placeholder="example@gmail.com"
                    label="Email"
                    type="email"
                    name="email"
                    isRequired
                    validationBehavior="native"
                  />
                  <Select
                    aria-label="Filtra por rol"
                    label="Rol"
                    placeholder="Selecciona un rol"
                    isRequired
                    name="role"
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
                    label="Género"
                    placeholder="Selecciona el género"
                    isRequired
                    name="gender"
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
                  <Input placeholder="Mier y Pesada 14, CDMX" label="Dirección" name="address"  />
                  <Input placeholder="777777777" label="Teléfono" type="tel" name="phoneNumber"  />
                </form>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose} >
                  Cancelar
                </Button>
                <Button className="text-white" color="success" form={usersFormModalId} type="submit" startContent={<DocumentCheckIcon className="size-6" />}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
