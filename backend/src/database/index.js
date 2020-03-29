import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/Users';
import Event from '../app/models/Events';
import Employee from '../app/models/Employees';
import EventEmployeeCompanion from '../app/models/EventEmployeeCompanion'
import EventEmployee from '../app/models/EventEmployee'
import Companion from '../app/models/Companion'

const models = [User, Event, Employee, EventEmployeeCompanion, EventEmployee, Companion];

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
