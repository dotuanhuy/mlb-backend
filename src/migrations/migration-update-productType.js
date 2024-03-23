'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.addColumn('ProductTypes', 'imageRoot', { type: Sequelize.BLOB('long') });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('ProductTypes', 'imageRoot');
        },
};