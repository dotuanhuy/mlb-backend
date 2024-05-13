'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.addColumn('products', 'quantitySold', { 
                type: Sequelize.INTEGER,
                defaultValue: 0 
            });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('products', 'quantitySold');
        },
};