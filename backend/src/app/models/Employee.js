import Sequelize, { Model } from 'sequelize';

class Employee extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'employees',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Event, {
      through: 'eventsEmployees',
      foreignKey: 'idEmployee',
    });

    // this.belongsToMany(models.EventEmployee, {
    //   through: 'eventsEmployees',
    //   foreignKey: 'idEmployee',
    // });

    this.belongsTo(models.EventEmployee, {
      foreignKey: 'id',
    });
  }
}

export default Employee;
