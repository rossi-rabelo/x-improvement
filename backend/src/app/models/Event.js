import Sequelize, { Model } from 'sequelize';

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        maxCompanion: Sequelize.INTEGER,
        description: Sequelize.STRING,
        place: Sequelize.STRING,
        image: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'events',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Employee, {
      through: 'eventsEmployees',
      foreignKey: 'idEvent',
    });

    // this.belongsToMany(models.Companion, {
    //   through: 'eventsEmployees',
    //   foreignKey: 'idEvent',
    // });
  }
}

export default Event;
