module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eventsEmployees', {
      idEvent: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'events',
          key: 'id',
        },
      },
      idEmployee: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'employees',
          key: 'id',
        },
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('eventsEmployees');
  },
};
