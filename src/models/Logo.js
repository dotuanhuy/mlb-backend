'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Logo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Logo.hasMany(models.Product, { foreignKey: 'logoId', as: 'dataLogos' })
        }
    }
    Logo.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING(20),
        image: DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'Logo',
    });
    return Logo;
};