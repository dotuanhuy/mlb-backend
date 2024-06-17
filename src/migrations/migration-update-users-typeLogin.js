'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'typeLogin', { type: Sequelize.STRING, defaultValue: 'Web' });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Users', 'typeLogin');
    },
};