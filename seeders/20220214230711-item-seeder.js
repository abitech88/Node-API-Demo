'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert('Items', [
      {
        name: 'orange',
        description: 'juicy fruit',
        price: '0.30',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'banana',
        description: 'sweet fruit',
        price: '0.10',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'pineapple',
        description: 'yummy fruit',
        price: '0.80',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
