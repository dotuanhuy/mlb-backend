'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'dataOrder'})
            Order.belongsToMany(models.Product, { through: models.OrderDetail, foreignKey: 'orderId', as: 'dataOrderProduct' })
            Order.hasOne(models.Payment, { foreignKey: 'orderId', as: 'dataPayment' })
        }
    }
    Order.init({
        userId: DataTypes.INTEGER,
        fullName: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        totalMoney: DataTypes.FLOAT,
        shippingMethod: DataTypes.STRING,
        orderStatus: DataTypes.STRING,
        isCancelled: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};