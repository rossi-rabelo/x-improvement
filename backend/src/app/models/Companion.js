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
}

export default Companion;