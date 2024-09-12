import { useContext } from "react";

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button"

import { AuthContext } from "../../context/authContext";

import { ROLES } from "../../const";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const { role } = Object.fromEntries(new FormData(event.target).entries());
    login(role);
  };

  return (
    <main className="h-dvh flex flex-col items-center justify-center p-5">
      <h1 className="text-2xl font-bold text-center">Admin Users</h1>

      <h3 className="text-lg font-medium text-slate-500 mb-5">Login</h3>

      <Card className="w-full max-w-xs" shadow="sm">
        <form onSubmit={onHandleSubmit}>
          <CardBody>
            <Select label="Selecciona un rol" name="role" isRequired>
              {
                Object.keys(ROLES).map(key => (
                  <SelectItem key={key}>
                    {ROLES[key]}
                  </SelectItem>
                ))
              }
            </Select>
          </CardBody>

          <CardFooter>
            <Button type="submit" color="primary" className="mx-auto font-semibold">
              Iniciar Sesión
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};