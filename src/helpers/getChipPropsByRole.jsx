import { PencilSquareIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/solid";

import { ROLES } from "../const";

export const getChipPropsByRole = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return { color: "warning", startContent: <ShieldCheckIcon className="size-3.5" /> };
    case ROLES.EDITOR:
      return { color: "secondary", startContent: <PencilSquareIcon className="size-3.5" /> };
    case ROLES.VIEWER:
      return { color: "primary", startContent: <UserIcon className="size-3.5" /> };
  }
};