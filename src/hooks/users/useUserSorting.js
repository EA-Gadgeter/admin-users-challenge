import { useEffect, useState } from "react";

import { STORAGE_KEYS } from "../../const";

export const useUserSorting = () => {
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "",
    direction: "",
  });

  useEffect(() => {
    const userSorting = sessionStorage.getItem(STORAGE_KEYS.USERS_SORTING);

    if (!userSorting) return;

    setSortDescriptor(JSON.parse(userSorting));
  }, []);

  const onSortChange = (newSortDescriptor) => {
    setSortDescriptor(newSortDescriptor);
    sessionStorage.setItem(STORAGE_KEYS.USERS_SORTING, JSON.stringify(newSortDescriptor));
  };

  const sort = (usersToSort) => {
    return usersToSort.sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];

      let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  };

  return { sortDescriptor, onSortChange, sort };
};