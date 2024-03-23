'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Size extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Size.hasMany(models.SizeDetail, { foreignKey: 'sizeId', as: 'dataSize' })

            Size.belongsToMany(models.Product, { through: models.SizeDetail, foreignKey: 'sizeId', as: 'dataSizeDetail' })
        }
    }
    Size.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING(20)
    }, {
        sequelize,
        modelName: 'Size',
    });
    return Size;
};