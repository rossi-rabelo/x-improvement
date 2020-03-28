module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("REPLACE(UUID(),'-','')"),
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      maxCompanion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('events');
  },
};
