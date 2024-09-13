import { useId } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter, Chip,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

import { EnvelopeIcon, UserIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";

import {getChipPropsByRole} from "../../helpers/getChipPropsByRole.jsx";

export const DetailUserModal = ({ isOpen, onOpenChange, onClose, userData }) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Detalle de Usuario
              </ModalHeader>

              <ModalBody>
                <section>
                  <div className="flex items-start gap-3">
                    <Avatar isBordered src={userData.profileImage} size="lg" />
                    <div className="flex flex-col gap-0.5">
                      <h2 className="text-xl font-bold text-balance">{userData.firstName} {userData.lastName}</h2>
                      <Chip variant="bordered" size="sm" {...getChipPropsByRole(userData.role)}>
                        {userData.role}
                      </Chip>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 mt-5">
                    <span className="flex gap-2">
                      <EnvelopeIcon className="size-6"/>
                      {userData.email}
                    </span>

                    <span className="flex gap-2 capitalize">
                      <UserIcon className="size-6"/>
                      {userData.gender}
                    </span>

                    <span className="flex gap-2 capitalize">
                      <MapPinIcon className="size-6"/>
                      {userData.address || <span className="italic">Sin dirección</span>}
                    </span>

                    <span className="flex gap-2 capitalize">
                      <PhoneIcon className="size-6"/>
                      {userData.phoneNumber || <span className="italic">Sin teléfono</span>}
                    </span>
                  </div>
                </section>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
