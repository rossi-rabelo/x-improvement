module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'events',
      [
        {
          name: 'Landix 21 Anos',
          maxCompanion: '1',
          description:
            'Prepare-se para este evento super legal, cheio de coisas legais, bebidas legais e bandas legais. Vai ser extremamente legal.',
          place: 'Center Convention',
          image:
            'https://www.cidadaocultura.com.br/wp-content/uploads/2018/01/fundos_de_ecra_de_festas_4.jpg',
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('events', null, {});
  },
};
