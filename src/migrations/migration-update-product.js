'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.addColumn('products', 'productTypeId', { type: Sequelize.INTEGER });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('products', 'productTypeId');
    },
};