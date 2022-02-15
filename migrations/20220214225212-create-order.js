'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      addressID: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Addresses',
            //schema: 'schema'
          },
          key: 'id'
        },
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      taxRate:{
        type: Sequelize.FLOAT
      },
      subTotal:{
        type: Sequelize.FLOAT
      },
      total:{
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};