'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'birthDate', { type: Sequelize.DATEONLY });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'birthDate');
    },
};