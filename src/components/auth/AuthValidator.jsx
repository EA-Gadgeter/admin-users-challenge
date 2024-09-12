import { useContext } from "react";

import { AuthContext } from "../../context/authContext";

import { App } from "../App";
import { LoginPage } from "./LoginPage";

export const AuthValidator = () => {
  const { isAuth } = useContext(AuthContext);

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
