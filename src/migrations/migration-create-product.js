'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            code: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.FLOAT
            },
            categoryDetailId: {
                type: Sequelize.INTEGER
            },
            discountId: {
                type: Sequelize.INTEGER
            },
            image: {
                type: Sequelize.BLOB('long')
            },
            productionSite: {
                type: Sequelize.STRING
            },
            releaseDate: {
                type: Sequelize.DATE
            },
            brandId: {
                type: Sequelize.INTEGER
            },
            material: {
                type: Sequelize.STRING
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            logoId: {
                type: Sequelize.INTEGER
            },
            gender: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.TINYINT,
                defaultValue: 1
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Products');
    }
};