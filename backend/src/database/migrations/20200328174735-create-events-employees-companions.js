module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eventsEmployeesCompanions', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("REPLACE(UUID(),'-','')"),
      },
      idEventEmployee: {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: {
          model: 'eventsEmployees',
          key: 'id',
        },
      },
      idCompanion: {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: {
          model: 'companions',
          key: 'id',
        },
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('eventsEmployeesCompanions');
  },
};
