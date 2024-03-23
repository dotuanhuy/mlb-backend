'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CategoryDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            CategoryDetail.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'dataCategory' })
            CategoryDetail.hasMany(models.Product, { foreignKey: 'categoryDetailId', as: 'dataCategoryDetail' })
        }
    }
    CategoryDetail.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING(20),
        categoryId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'CategoryDetail',
    });
    return CategoryDetail;
};