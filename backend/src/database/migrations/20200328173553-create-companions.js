module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('companions', {
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
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('companions');
  },
};
