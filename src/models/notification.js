'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Notification.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'dataNotification' })
        }
    }
    Notification.init({
        userId: DataTypes.INTEGER,
        typeId: DataTypes.INTEGER,
        content: DataTypes.STRING,
        typeText: DataTypes.STRING,
        isRead: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Notification',
    });
    return Notification;
};