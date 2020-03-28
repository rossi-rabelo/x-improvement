import Sequelize, { Model } from 'sequelize';

class Employees extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        maxCompanion: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'employees',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Events, {
      through: 'eventsEmployees',
      foreignKey: 'idEvent',
    });
  }
}

export default Employees;
