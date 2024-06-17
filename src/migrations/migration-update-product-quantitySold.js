'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Products', 'quantitySold', {
            type: Sequelize.INTEGER,
            defaultValue: 0
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Products', 'quantitySold');
    },
};