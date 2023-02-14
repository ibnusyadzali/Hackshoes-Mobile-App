'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const dataProducts = require("../database/products.json")
     dataProducts.forEach(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
       el.slug = el.name.toLowerCase().split(' ').join('-')
     })
 
     await queryInterface.bulkInsert('Products',dataProducts)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Products',{})
  }
};
