import Sequelize, { Model } from 'sequelize';

class Employee extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        maxCompanion: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'employees'
      }
    );

    return this;
  }
}

export default Employee;