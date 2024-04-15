'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
            User.belongsTo(models.Role, { foreignKey: 'roleId', targetKey: 'id', as: 'dataRole' })
            User.hasMany(models.Review, { foreignKey: 'userId', as: 'dataReviewUser' })
            User.hasMany(models.Feedback, { foreignKey: 'userId', as: 'dataFeedbackUser'})
            User.hasOne(models.Cart, { foreignKey: 'userId', as: 'dataUserCart'})

            // User.belongsToMany(models.Product, { through: models.Favourite, foreignKey: 'userId', as: 'dataProductFavourite'})
            User.hasMany(models.Favourite, { foreignKey: 'userId', as: 'dataUserProductFavourite'})
            User.hasMany(models.Order, { foreignKey: 'userId', as: 'dataOrder'})
        
        }
    }
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.STRING,
        roleId: DataTypes.STRING,
        avatar: DataTypes.STRING,
        token: DataTypes.STRING,
        typeLogin: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};