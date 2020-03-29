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

  static associate(models) {
    this.belongsToMany(models.Companion, {
      through: 'eventsEmployeesCompanions',
      foreignKey: 'idEventEmployee',
    });

    // this.belongsToMany(models.Companion, {
    //   through: 'eventsEmployees',
    //   foreignKey: 'idEvent',
    // });

    this.hasMany(models.Employee, {
      foreignKey: 'id',
    });
  }
}

export default EventEmployee;

