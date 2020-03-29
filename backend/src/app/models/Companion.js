import Sequelize, { Model } from 'sequelize';

class Companion extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'companions',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.EventEmployee, {
      through: 'eventsEmployeesCompanions',
      foreignKey: 'idCompanion',
    });

    // this.belongsToMany(models.Event, {
    //   through: 'eventsEmployeesCompanions',
    //   foreignKey: 'idCompanion',
    // });
  }
}

export default Companion;
