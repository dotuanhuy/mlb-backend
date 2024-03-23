'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favorites extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Favorites.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'dataProductFavourite'})
            Favorites.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'dataUserProductFavourite'})
        }
    }
    Favorites.init({
        userId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Favourite',
    });
    return Favorites;
};