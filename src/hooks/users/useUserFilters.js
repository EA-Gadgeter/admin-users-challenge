import {useEffect, useState} from "react";

import { GENDERS, ROLES, SESSION_STORAGE_KEYS } from "../../const";

export const useUserFilters = () => {
  const [filters, setFilters] = useState({
    byText: "",
    byRole: "",
    byGender: "",
  });

  useEffect(() => {
    const userFilters = sessionStorage.getItem(SESSION_STORAGE_KEYS.USERS_FILTERS);

    if (!userFilters) return;

    setFilters(JSON.parse(userFilters));
  }, []);

  const onFilterByText = (newText) => {
    const newFilters = {...filters, byText: newText};
    setFilters(newFilters);
    sessionStorage.setItem(SESSION_STORAGE_KEYS.USERS_FILTERS, JSON.stringify(newFilters));
  };

  const onFilterByRole = (event) => {
    const newRole = ROLES[event.target.value] ?? "";

    const newFilters = {...filters, byRole: newRole};
    setFilters(newFilters);
    sessionStorage.setItem(SESSION_STORAGE_KEYS.USERS_FILTERS, JSON.stringify(newFilters));
  };

  const onFilterByGender = (event) => {
    const newGender = GENDERS[event.target.value] ?? "";

    const newFilters = {...filters, byGender: newGender};
    setFilters(newFilters);
    sessionStorage.setItem(SESSION_STORAGE_KEYS.USERS_FILTERS, JSON.stringify(newFilters));
  };

  const filterByText = (usersToFilter) => {
    return usersToFilter.filter(user => {
      const lowerCaseName = user.firstName.toLowerCase();
      const lowerCaseLastName = user.lastName.toLowerCase();
      const lowerCaseEmail = user.email.toLowerCase();

      const lowerCaseSearch = filters.byText.trim().toLowerCase();

      return (
        lowerCaseName.includes(lowerCaseSearch) ||
        lowerCaseLastName.includes(lowerCaseSearch) ||
        lowerCaseEmail.includes(lowerCaseSearch)
      );
    });
  };

  const filterByRole = (usersToFilter) => {
    return usersToFilter.filter(user => user.role === filters.byRole);
  };

  const filterByGender = (usersToFilter) => {
    return usersToFilter.filter(user => user.gender === filters.byGender);
  };

  return {
    filters,
    onFilterByGender,
    onFilterByRole,
    onFilterByText,
    filterByText,
    filterByGender,
    filterByRole
  };
};