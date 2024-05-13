'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.addColumn('products', 'originalPrice', { type: Sequelize.FLOAT });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('products', 'originalPrice');
        },
};