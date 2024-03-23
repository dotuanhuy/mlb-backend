'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Cart.belongsToMany(models.Product, { through: models.CartDetail, foreignKey: 'cartId', as: 'dataCartProduct' })
            Cart.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'dataUserCart'})
        }
    }
    Cart.init({
        userId: DataTypes.INTEGER,
        // productId: DataTypes.INTEGER,
        // quantity: DataTypes.INTEGER,
        // size:DataTypes.STRING,
        // status: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};