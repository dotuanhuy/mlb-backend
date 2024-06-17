'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('OrderDetails', 'price', { type: Sequelize.FLOAT });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('OrderDetails', 'price');
    },
};