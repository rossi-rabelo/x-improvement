module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
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
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      maxCompanion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('employees');
  },
};
