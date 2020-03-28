import Sequelize, { Model } from 'sequelize';

class Events extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        maxCompanion: Sequelize.INTEGER,
        description: Sequelize.STRING,
        place: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'events',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Employees, {
      through: 'eventsEmployees',
      foreignKey: 'idEmployee',
    });
  }
}

export default Events;
