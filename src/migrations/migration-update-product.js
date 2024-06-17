'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Products', 'productTypeId', { type: Sequelize.INTEGER });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Products', 'productTypeId');
    },
};