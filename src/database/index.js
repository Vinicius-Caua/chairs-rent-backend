import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import User from "../app/models/User";
import Chair from "../app/models/Chair";
import Rent from "../app/models/Rent";
import databaseConfig from "../config/database";

const models = [User, Chair, Rent];

require('dotenv').config();

class Database {
  constructor() {
    this.connection = null;
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach(model => model.init(this.connection));
    models.forEach(model => {
      if (model.associate) model.associate(this.connection.models);
    });
  }
}

const database = new Database();
export const sequelize = database.connection;
