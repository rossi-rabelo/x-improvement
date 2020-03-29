module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eventsEmployeesCompanions', {
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
