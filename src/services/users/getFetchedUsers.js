import {ROLES} from "../../const";

export const getFetchedUsers = async (limit) => {
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
      id: user.login.uuid,
      role: randomRole,
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      gender: user.gender,
      profileImage: user.picture.thumbnail,
      address: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}`,
      phoneNumber: user.phone
    };
  });
};