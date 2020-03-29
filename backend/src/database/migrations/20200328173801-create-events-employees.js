module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('eventsEmployees', {
      id: {
        type: Sequelize.STRING(32),
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("REPLACE(UUID(),'-','')"),
      },
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
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('eventsEmployees');
  },
};
