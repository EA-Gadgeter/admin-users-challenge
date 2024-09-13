import { useId } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

import { DocumentCheckIcon } from "@heroicons/react/24/solid";

import { GENDERS, ROLES } from "../../const";

export const EditUserFormModal = ({ isOpen, onOpenChange, onClose, onEditUser, userData }) => {
  const editUserFormModalId = useId();

  const onHandleSubmit = (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target).entries());
    // Hacemos esta union para conservar la imagen
    const finalData = {
      ...userData,
      ...formData,
      role: ROLES[formData.role],
      gender: GENDERS[formData.gender]
    };

    onEditUser(finalData);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Usuario
              </ModalHeader>

              <ModalBody>
                <form className="flex flex-col gap-3" onSubmit={onHandleSubmit} id={editUserFormModalId}>
                  <Input
                    placeholder="John"
                    label="Nombre"
                    name="firstName"
                    isRequired
                    defaultValue={userData.firstName}
                    validationBehavior="native"
                  />
                  <Input
                    placeholder="Doe"
                    label="Apellido"
                    name="lastName"
                    isRequired
                    defaultValue={userData.lastName}
                    validationBehavior="native"
                  />
                  <Input
                    placeholder="example@gmail.com"
                    label="Email"
                    type="email"
                    name="email"
                    isRequired
                    defaultValue={userData.email}
                    validationBehavior="native"
                  />
                  <Select
                    aria-label="Filtra por rol"
                    label="Rol"
                    placeholder="Selecciona un rol"
                    isRequired
                    name="role"
                    selectedKeys={[Object.keys(ROLES).find(key => ROLES[key] === userData.role)]}
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
                    selectedKeys={[Object.keys(GENDERS).find(key => GENDERS[key] === userData.gender)]}
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
                  <Input placeholder="Mier y Pesada 14, CDMX" label="Dirección" name="address" defaultValue={userData.address} />
                  <Input placeholder="777777777" label="Teléfono" type="tel" name="phoneNumber" defaultValue={userData.phoneNumber} />
                </form>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose} >
                  Cancelar
                </Button>
                <Button className="text-white" color="success" form={editUserFormModalId} type="submit" startContent={<DocumentCheckIcon className="size-6" />}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
