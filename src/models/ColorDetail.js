'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ColorDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ColorDetail.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'dataColorDetail' })
            ColorDetail.belongsTo(models.Color, { foreignKey: 'colorId', targetKey: 'id', as: 'dataColor' })
        }
    }
    ColorDetail.init({
        colorId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ColorDetail',
    });
    return ColorDetail;
};