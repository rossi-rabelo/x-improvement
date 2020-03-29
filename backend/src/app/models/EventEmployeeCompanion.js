import Sequelize, { Model } from 'sequelize';

class EventEmployeeCompanion extends Model {
  static init(sequelize) {
    super.init(
      {
        idEventEmployee: Sequelize.STRING,
        idCompanion: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'eventsEmployeesCompanions'
      }
    );

    return this;
  }
}

export default EventEmployeeCompanion;