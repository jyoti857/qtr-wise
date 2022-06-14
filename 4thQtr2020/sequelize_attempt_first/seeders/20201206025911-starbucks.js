'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkInsert('Shops', [{
      name: 'starbucks', 
      createdAt: new Date(Date.now()), 
    }, {
      name: 'ccd',
      createdAt: new Date(Date.now())
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Shops', null, {});
  }
};
