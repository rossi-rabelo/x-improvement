import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/Users';
import Event from '../app/models/Events';
import Employee from '../app/models/Employees';

const models = [User, Event, Employee];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
