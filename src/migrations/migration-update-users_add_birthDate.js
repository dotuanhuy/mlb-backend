'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'birthDate', { type: Sequelize.DATEONLY });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users', 'birthDate');
    },
};