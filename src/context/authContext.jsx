import {useEffect, useState} from "react";

import { createContext } from "react";

import { STORAGE_KEYS, ROLES } from "../const";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    role: ""
  });

  const login = (role) => {
    const newAuthInfo = {
      ...authInfo,
      role: ROLES[role],
    };

    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newAuthInfo));

    setAuthInfo(newAuthInfo);
    setIsAuth(true);
  };

  const logout = () => {
    const newAuthInfo = {
      ...authInfo,
      role: ""
    };

    sessionStorage.removeItem(STORAGE_KEYS.USER);

    setAuthInfo(newAuthInfo);
    setIsAuth(false);
  };

  useEffect(() => {
    const userInfo = sessionStorage.getItem(STORAGE_KEYS.USER);

    if (!userInfo) return;

    const userInfoParsed = JSON.parse(userInfo);

    setAuthInfo(userInfoParsed);
    setIsAuth(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authInfo,
        isAuth,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};