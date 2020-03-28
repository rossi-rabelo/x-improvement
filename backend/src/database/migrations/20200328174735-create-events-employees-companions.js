module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eventsEmployeesCompanions', {
      idEvent: {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
      },
      idEmployee: {
        type: Sequelize.STRING(32),
        allowNull: false,
        references: {
          model: 'employees',
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
