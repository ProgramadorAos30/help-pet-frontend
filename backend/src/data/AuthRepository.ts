import Connection from "./database/Connection";
import { PERMISSIONS } from "../utils";

const getConnection = () => {
  return Connection.getConnection();
};

const getUserByCredential = (username: string, password: string) => {
  return {
    user: "admin",
    email: "example@email.com",
    permissions: PERMISSIONS.ADMIN,
  };
};

export { getUserByCredential };
