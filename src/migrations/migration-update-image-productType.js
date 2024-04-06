'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
            await queryInterface.changeColumn('producttypes', 'imageRoot', { type: Sequelize.STRING });
        },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('producttypes', 'imageRoot', { type: Sequelize.STRING });
        },
};