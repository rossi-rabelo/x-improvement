import Sequelize, { Model } from 'sequelize';

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        maxCompanion: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'events',
      }
    );

    return this;
  }
}

export default Event;
