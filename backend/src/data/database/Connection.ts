import { Sequelize } from "sequelize";

export class Connection {
  private connection: Sequelize;
  constructor() {
    this.connection = new Sequelize();
  }

  public getConnection(): Sequelize {
    return this.connection;
  }
}
