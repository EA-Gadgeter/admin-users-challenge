import { useState, useEffect, useCallback } from "react";

import { getFetchedUsers } from "../../services/users";

import { STORAGE_KEYS } from "../../const";

const LIMIT_USERS_FETCH = 50;

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteUser = useCallback((userId) => {
    setUsers(prevUsers => {
      const userIndex = prevUsers.findIndex(user => user.id === userId);
      const updatedUsers = prevUsers.toSpliced(userIndex, 1);

      sessionStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  }, [users]);

  useEffect(() => {
    // Verificamos si hay usuarios en storage
    const storagedUsers = sessionStorage.getItem(STORAGE_KEYS.USERS_LIST);

    // Si no hay nada hacemos el fetched y guardamos
    if (!storagedUsers) {
      getFetchedUsers(LIMIT_USERS_FETCH)
        .then(data => {
          sessionStorage.setItem(STORAGE_KEYS.USERS_LIST, JSON.stringify(data));
          setUsers(data);
        })
        .finally(() => setLoading(false));

      return;
    }

    // Si hay users, parseamos y mostramos
    const parsedUsers = JSON.parse(storagedUsers);
    setUsers(parsedUsers);
    setLoading(false);
  }, []);

  return { users, loading, error, deleteUser };
};