module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@landix.com.br',
          password:
            '$2a$08$JFcjo1Eruz6t81GbkiuWUeG/np.dAsWbGj5YhJc9hiQ3zsrFWADjK',
        },
        {
          email: 'gente@landix.com.br',
          password:
            '$2a$08$JFcjo1Eruz6t81GbkiuWUeG/np.dAsWbGj5YhJc9hiQ3zsrFWADjK',
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
