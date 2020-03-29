import Sequelize, { Model } from 'sequelize';

class EventEmployee extends Model {
  static init(sequelize) {
    super.init(
      {
        idEvent: Sequelize.STRING,
        idEmployee: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'eventsEmployees',
      }
    );

    return this;
  }
}

export default EventEmployee;