import {ROLES} from "../../const";

export const getUsers = async (limit) => {
  const res = await fetch(`https://randomuser.me/api/?results=${limit}`);

  if (!res.ok) {
    throw new Error("Error obtaining users, please try again.");
  }

  const { results } = await res.json();

  const rolesArray = Object.values(ROLES);

  return results.map(user => {
    const randomIndex = Math.floor(Math.random() * rolesArray.length);
    const randomRole = rolesArray[randomIndex];

    return {
      role: randomRole,
      ...user
    };
  });
};