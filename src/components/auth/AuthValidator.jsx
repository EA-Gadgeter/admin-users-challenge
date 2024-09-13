import { useContext, useEffect } from "react";

import { AuthContext } from "../../context/authContext";
import { useDarkModeStore } from "../../stores";

import { App } from "../App";
import { LoginPage } from "./LoginPage";

export const AuthValidator = () => {
  const {isAuth} = useContext(AuthContext);

  const darkMode = useDarkModeStore(state => state.darkMode);
  const toggleDarkMode = useDarkModeStore(state => state.toggleDarkMode);

  useEffect(() => {
    toggleDarkMode(darkMode);
  }, []);

  return (
    <>
      {
        !isAuth ? (
          <LoginPage />
        ) : (
          <App />
        )
      }
    </>
  );
};
