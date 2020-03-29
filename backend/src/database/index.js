import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Event from '../app/models/Event';
import Employee from '../app/models/Employee';
import Companion from '../app/models/Companion';
import EventEmployee from '../app/models/EventEmployee';

const models = [User, Event, Employee, Companion, EventEmployee];

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
