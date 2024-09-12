import { useState, useEffect } from "react";

import { getUsers } from "../../services/users";

const LIMIT_USERS = 50;

export const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers(LIMIT_USERS)
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
};