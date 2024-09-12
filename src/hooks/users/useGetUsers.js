import { useState, useEffect } from "react";

import { getFetchedUsers } from "../../services/users";

import { SESSION_STORAGE_KEYS } from "../../const";

const LIMIT_USERS_FETCH = 50;

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificamos si hay usuarios en storage
    const storagedUsers = sessionStorage.getItem(SESSION_STORAGE_KEYS.USERS_LIST);

    // Si no hay nada hacemos el fetched y guardamos
    if (!storagedUsers) {
      getFetchedUsers(LIMIT_USERS_FETCH)
        .then(data => {
          sessionStorage.setItem(SESSION_STORAGE_KEYS.USERS_LIST, JSON.stringify(data));

          setUsers(data);
          setLoading(false);
        });

      return;
    }

    // Si hay users, parseamos y mostramos
    const parsedUsers = JSON.parse(storagedUsers);
    setUsers(parsedUsers);
    setLoading(false);
  }, []);

  return { users, loading, error };
};