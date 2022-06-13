import { Sequelize } from "sequelize";

export default {
  //Mock info
  getConnection: () => {
    return new Sequelize("database", "username", "password", {
      host: "localhost",
      dialect: "sqlite",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      storage: "database.sqlite",
    });
  },
};
